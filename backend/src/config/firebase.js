const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin SDK
let firebaseApp;

const initializeFirebase = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    // Check if running in production or development
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Development: Use service account key file
      const serviceAccount = require(`../../${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
      });
    } else {
      // Production: Use application default credentials
      firebaseApp = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
      });
    }

    console.log('✅ Firebase Admin SDK initialized successfully');
    return firebaseApp;
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    throw error;
  }
};

// Initialize Firebase
initializeFirebase();

// Export Firestore and Storage instances
const db = admin.firestore();
const bucket = admin.storage().bucket();
const auth = admin.auth();

module.exports = {
  admin,
  db,
  bucket,
  auth
};
