const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken, checkRole } = require('../middleware/auth');

/**
 * GET /api/v1/offices
 * List all offices
 */
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const snapshot = await db.collection('offices')
      .where('isActive', '==', true)
      .orderBy('name', 'asc')
      .get();

    const offices = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({ offices });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/offices/:id
 * Get office by ID
 */
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('offices').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Office not found'
      });
    }

    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/offices/:id/documents
 * Get documents for specific office
 */
router.get('/:id/documents', verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const snapshot = await db.collection('documents')
      .where('offices', 'array-contains', id)
      .where('isActive', '==', true)
      .orderBy('uploadDate', 'desc')
      .get();

    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

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
 * POST /api/v1/offices
 * Create new office (admin only)
 */
router.post('/', verifyToken, checkRole(['admin']), async (req, res, next) => {
  try {
    const {
      name,
      region,
      country,
      city,
      address,
      timezone
    } = req.body;

    if (!name || !region || !country || !city) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Missing required fields: name, region, country, city'
      });
    }

    const officeData = {
      name,
      region,
      country,
      city,
      address: address || '',
      timezone: timezone || 'UTC',
      documentCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('offices').add(officeData);

    res.status(201).json({
      message: 'Office created successfully',
      office: {
        id: docRef.id,
        ...officeData
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
