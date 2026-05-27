const express = require('express');
const router = express.Router();
const multer = require('multer');
const { db, bucket } = require('../config/firebase');
const { verifyToken, checkRole } = require('../middleware/auth');

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 52428800 // 50MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'application/pdf').split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOC/DOCX files are allowed.'));
    }
  }
});

/**
 * GET /api/v1/documents
 * List all documents with filtering and pagination
 */
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const {
      office,
      category,
      status,
      search,
      page = 1,
      limit = 50,
      sort = 'uploadDate',
      order = 'desc'
    } = req.query;

    let query = db.collection('documents').where('isActive', '==', true);

    // Apply filters
    if (office) {
      query = query.where('offices', 'array-contains', office);
    }

    if (category) {
      query = query.where('category', '==', category);
    }

    if (status) {
      query = query.where('status', '==', status);
    }

    // Apply sorting
    query = query.orderBy(sort, order);

    // Execute query
    const snapshot = await query.get();

    let documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Client-side search (for simplicity - consider Algolia for production)
    if (search) {
      const searchLower = search.toLowerCase();
      documents = documents.filter(doc =>
        doc.productName?.toLowerCase().includes(searchLower) ||
        doc.manufacturer?.toLowerCase().includes(searchLower) ||
        doc.casNumber?.toLowerCase().includes(searchLower) ||
        doc.searchKeywords?.some(kw => kw.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedDocs = documents.slice(startIndex, endIndex);

    res.json({
      documents: paginatedDocs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: documents.length,
        totalPages: Math.ceil(documents.length / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/documents/:id
 * Get document by ID
 */
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const docRef = db.collection('documents').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Document not found'
      });
    }

    // Increment view count
    await docRef.update({
      viewCount: (doc.data().viewCount || 0) + 1
    });

    // Log audit trail
    await db.collection('auditLog').add({
      userId: req.user.uid,
      action: 'view',
      documentId: id,
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/documents
 * Upload new document
 */
router.post('/', verifyToken, checkRole(['admin', 'regional_coordinator', 'facilities_editor']), upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'No file uploaded'
      });
    }

    const {
      productName,
      manufacturer,
      offices,
      specificLocations,
      category,
      tags,
      casNumber,
      language = 'EN',
      revisionDate,
      notes
    } = req.body;

    // Validate required fields
    if (!productName || !manufacturer || !offices || !category) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Missing required fields: productName, manufacturer, offices, category'
      });
    }

    // Parse offices array
    const officesArray = typeof offices === 'string' ? JSON.parse(offices) : offices;
    const locationsArray = specificLocations ? (typeof specificLocations === 'string' ? JSON.parse(specificLocations) : specificLocations) : [];
    const tagsArray = tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : [];

    // Upload file to Cloud Storage
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const officeFolder = officesArray[0] || 'global';
    const filePath = `sds-library/${officeFolder}/${category}/${fileName}`;

    const file = bucket.file(filePath);
    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          uploadedBy: req.user.uid,
          originalName: req.file.originalname
        }
      }
    });

    // Generate signed URL (valid for 7 days)
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000
    });

    // Calculate expiration date (3 years from revision date or now)
    const revisionTimestamp = revisionDate ? new Date(revisionDate) : new Date();
    const expirationTimestamp = new Date(revisionTimestamp);
    expirationTimestamp.setFullYear(expirationTimestamp.getFullYear() + 3);

    // Create document record
    const docData = {
      productName,
      manufacturer,
      casNumber: casNumber || null,
      language,
      documentType: 'SDS',
      fileUrl: url,
      fileStoragePath: filePath,
      fileSize: req.file.size,
      uploadDate: new Date(),
      uploadedBy: req.user.uid,
      revisionDate: revisionTimestamp,
      expirationDate: expirationTimestamp,
      status: 'active',
      version: 1,
      offices: officesArray,
      specificLocations: locationsArray,
      category,
      tags: tagsArray,
      viewCount: 0,
      downloadCount: 0,
      searchKeywords: [
        productName.toLowerCase(),
        manufacturer.toLowerCase(),
        category.toLowerCase(),
        ...tagsArray.map(t => t.toLowerCase()),
        ...(casNumber ? [casNumber.toLowerCase()] : [])
      ],
      notes: notes || '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('documents').add(docData);

    // Log audit trail
    await db.collection('auditLog').add({
      userId: req.user.uid,
      action: 'upload',
      documentId: docRef.id,
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      details: {
        productName,
        offices: officesArray
      }
    });

    res.status(201).json({
      message: 'Document uploaded successfully',
      document: {
        id: docRef.id,
        ...docData
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/v1/documents/:id
 * Update document metadata
 */
router.put('/:id', verifyToken, checkRole(['admin', 'regional_coordinator', 'facilities_editor']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const docRef = db.collection('documents').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Document not found'
      });
    }

    // Only allow updating certain fields
    const allowedUpdates = [
      'productName',
      'manufacturer',
      'casNumber',
      'offices',
      'specificLocations',
      'category',
      'tags',
      'notes',
      'revisionDate',
      'status'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Update search keywords if relevant fields changed
    if (updates.productName || updates.manufacturer || updates.category || updates.tags) {
      const docData = doc.data();
      updates.searchKeywords = [
        (updates.productName || docData.productName).toLowerCase(),
        (updates.manufacturer || docData.manufacturer).toLowerCase(),
        (updates.category || docData.category).toLowerCase(),
        ...(updates.tags || docData.tags || []).map(t => t.toLowerCase())
      ];
    }

    updates.updatedAt = new Date();

    await docRef.update(updates);

    // Log audit trail
    await db.collection('auditLog').add({
      userId: req.user.uid,
      action: 'edit',
      documentId: id,
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      details: updates
    });

    res.json({
      message: 'Document updated successfully',
      updates
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/v1/documents/:id
 * Soft delete document
 */
router.delete('/:id', verifyToken, checkRole(['admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const docRef = db.collection('documents').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Document not found'
      });
    }

    // Soft delete
    await docRef.update({
      isActive: false,
      deletedAt: new Date(),
      deletedBy: req.user.uid
    });

    // Log audit trail
    await db.collection('auditLog').add({
      userId: req.user.uid,
      action: 'delete',
      documentId: id,
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    res.json({
      message: 'Document deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/documents/:id/download
 * Get download URL for document
 */
router.get('/:id/download', verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const docRef = db.collection('documents').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Document not found'
      });
    }

    const docData = doc.data();

    // Generate fresh signed URL
    const file = bucket.file(docData.fileStoragePath);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000 // 15 minutes
    });

    // Increment download count
    await docRef.update({
      downloadCount: (docData.downloadCount || 0) + 1
    });

    // Log audit trail
    await db.collection('auditLog').add({
      userId: req.user.uid,
      action: 'download',
      documentId: id,
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    res.json({
      downloadUrl: url,
      expiresIn: 900 // seconds
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
