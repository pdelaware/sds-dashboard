const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

/**
 * GET /api/v1/search
 * Global search across documents
 */
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const { q, limit = 20 } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Search query is required'
      });
    }

    const searchTerm = q.toLowerCase();

    // Search in documents
    const snapshot = await db.collection('documents')
      .where('isActive', '==', true)
      .get();

    const results = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(doc =>
        doc.searchKeywords?.some(kw => kw.includes(searchTerm)) ||
        doc.productName?.toLowerCase().includes(searchTerm) ||
        doc.manufacturer?.toLowerCase().includes(searchTerm) ||
        doc.casNumber?.toLowerCase().includes(searchTerm)
      )
      .slice(0, parseInt(limit));

    res.json({
      query: q,
      results,
      total: results.length
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
