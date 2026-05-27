const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken, checkRole } = require('../middleware/auth');

/**
 * GET /api/v1/users/me
 * Get current user profile
 */
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      // Create user if doesn't exist
      const userData = {
        email: req.user.email,
        name: req.user.name,
        role: 'viewer',
        assignedOffices: [],
        createdAt: new Date(),
        lastLogin: new Date()
      };

      await db.collection('users').doc(req.user.uid).set(userData);

      return res.json({
        id: req.user.uid,
        ...userData
      });
    }

    // Update last login
    await db.collection('users').doc(req.user.uid).update({
      lastLogin: new Date()
    });

    res.json({
      id: userDoc.id,
      ...userDoc.data()
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/users
 * List all users (admin/coordinator only)
 */
router.get('/', verifyToken, checkRole(['admin', 'regional_coordinator']), async (req, res, next) => {
  try {
    const snapshot = await db.collection('users').get();

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({ users });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/v1/users/:id
 * Update user (admin only)
 */
router.put('/:id', verifyToken, checkRole(['admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, assignedOffices } = req.body;

    const updates = {};
    if (role) updates.role = role;
    if (assignedOffices) updates.assignedOffices = assignedOffices;
    updates.updatedAt = new Date();

    await db.collection('users').doc(id).update(updates);

    res.json({
      message: 'User updated successfully',
      updates
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
