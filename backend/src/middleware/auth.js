const { auth } = require('../config/firebase');

/**
 * Middleware to verify Firebase ID token
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided'
      });
    }

    const token = authHeader.split('Bearer ')[1];

    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(token);

    // Attach user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to check user role
 */
const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'User not authenticated'
        });
      }

      const { db } = require('../config/firebase');
      const userDoc = await db.collection('users').doc(req.user.uid).get();

      if (!userDoc.exists) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'User not found in database'
        });
      }

      const userData = userDoc.data();
      req.user.role = userData.role;
      req.user.assignedOffices = userData.assignedOffices || [];

      if (!allowedRoles.includes(userData.role)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Insufficient permissions'
        });
      }

      next();
    } catch (error) {
      console.error('Role check error:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error checking user role'
      });
    }
  };
};

module.exports = {
  verifyToken,
  checkRole
};
