const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken, checkRole } = require('../middleware/auth');

/**
 * GET /api/v1/analytics/overview
 * Dashboard KPIs
 */
router.get('/overview', verifyToken, checkRole(['admin', 'regional_coordinator']), async (req, res, next) => {
  try {
    // Get total documents count
    const documentsSnapshot = await db.collection('documents')
      .where('isActive', '==', true)
      .get();

    const documents = documentsSnapshot.docs.map(doc => doc.data());
    const totalDocuments = documents.length;

    // Count by status
    const now = new Date();
    const activeCount = documents.filter(doc => doc.status === 'active').length;
    const expiringCount = documents.filter(doc => {
      const expirationDate = doc.expirationDate?.toDate();
      const daysUntilExpiration = expirationDate ? Math.ceil((expirationDate - now) / (1000 * 60 * 60 * 24)) : null;
      return daysUntilExpiration && daysUntilExpiration > 0 && daysUntilExpiration <= 90;
    }).length;
    const expiredCount = documents.filter(doc => {
      const expirationDate = doc.expirationDate?.toDate();
      return expirationDate && expirationDate < now;
    }).length;

    // Get office count
    const officesSnapshot = await db.collection('offices')
      .where('isActive', '==', true)
      .get();
    const totalOffices = officesSnapshot.size;

    // Calculate compliance rate
    const complianceRate = totalDocuments > 0
      ? Math.round((activeCount / totalDocuments) * 100)
      : 100;

    res.json({
      overview: {
        totalDocuments,
        totalOffices,
        activeDocuments: activeCount,
        expiringDocuments: expiringCount,
        expiredDocuments: expiredCount,
        complianceRate
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/analytics/documents-by-office
 * Document counts per office
 */
router.get('/documents-by-office', verifyToken, checkRole(['admin', 'regional_coordinator']), async (req, res, next) => {
  try {
    const documentsSnapshot = await db.collection('documents')
      .where('isActive', '==', true)
      .get();

    const officesSnapshot = await db.collection('offices')
      .where('isActive', '==', true)
      .get();

    const offices = officesSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name
    }));

    const officeCounts = {};
    offices.forEach(office => {
      officeCounts[office.name] = 0;
    });

    documentsSnapshot.docs.forEach(doc => {
      const docData = doc.data();
      if (docData.offices && Array.isArray(docData.offices)) {
        docData.offices.forEach(officeId => {
          const office = offices.find(o => o.id === officeId);
          if (office) {
            officeCounts[office.name] = (officeCounts[office.name] || 0) + 1;
          }
        });
      }
    });

    const data = Object.keys(officeCounts).map(name => ({
      office: name,
      count: officeCounts[name]
    }));

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/analytics/expiring
 * List of expiring documents
 */
router.get('/expiring', verifyToken, checkRole(['admin', 'regional_coordinator']), async (req, res, next) => {
  try {
    const { days = 90 } = req.query;

    const snapshot = await db.collection('documents')
      .where('isActive', '==', true)
      .get();

    const now = new Date();
    const expiringDocs = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(doc => {
        const expirationDate = doc.expirationDate?.toDate();
        if (!expirationDate) return false;

        const daysUntilExpiration = Math.ceil((expirationDate - now) / (1000 * 60 * 60 * 24));
        return daysUntilExpiration > 0 && daysUntilExpiration <= parseInt(days);
      })
      .sort((a, b) => {
        const dateA = a.expirationDate?.toDate();
        const dateB = b.expirationDate?.toDate();
        return dateA - dateB;
      });

    res.json({
      documents: expiringDocs,
      total: expiringDocs.length
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
