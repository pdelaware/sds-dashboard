const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

/**
 * GET /api/v1/categories
 * List all categories
 */
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const snapshot = await db.collection('categories')
      .orderBy('name', 'asc')
      .get();

    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({ categories });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
