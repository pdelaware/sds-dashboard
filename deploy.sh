#!/bin/bash

# SDS Dashboard Quick Deploy Script
# This script will deploy both frontend and backend to production

set -e  # Exit on error

echo "🚀 SDS Dashboard Deployment Script"
echo "==================================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
    echo "✅ Firebase CLI installed"
    echo ""
fi

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "⚠️  Google Cloud SDK not found."
    echo "Please install from: https://cloud.google.com/sdk/docs/install"
    echo "Then run this script again."
    exit 1
fi

# Login to Firebase (if needed)
echo "🔐 Checking Firebase authentication..."
if ! firebase projects:list &> /dev/null; then
    echo "Please login to Firebase:"
    firebase login
fi

echo "✅ Firebase authenticated"
echo ""

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "❌ backend/.env not found!"
    echo "Please copy backend/.env.example to backend/.env and configure it."
    exit 1
fi

if [ ! -f "frontend/.env" ]; then
    echo "❌ frontend/.env not found!"
    echo "Please copy frontend/.env.example to frontend/.env and configure it."
    exit 1
fi

echo "✅ Environment files found"
echo ""

# Step 1: Seed database (if needed)
read -p "Do you want to seed the database? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    cd backend
    node src/utils/seedDatabase.js
    cd ..
    echo "✅ Database seeded"
    echo ""
fi

# Step 2: Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..
echo "✅ Frontend built"
echo ""

# Step 3: Deploy frontend to Firebase Hosting
echo "🚀 Deploying frontend to Firebase Hosting..."
firebase deploy --only hosting
echo "✅ Frontend deployed"
echo ""

# Step 4: Deploy backend to Cloud Run
echo "🚀 Deploying backend to Cloud Run..."
read -p "Enter your Google Cloud project ID (e.g., sds-dashboard-prod): " PROJECT_ID
read -p "Enter your Firebase Storage bucket (e.g., sds-dashboard-prod.appspot.com): " STORAGE_BUCKET
read -p "Enter your region (e.g., us-central1): " REGION

gcloud run deploy sds-dashboard-api \
  --source ./backend \
  --platform managed \
  --region $REGION \
  --project $PROJECT_ID \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,GOOGLE_CLOUD_PROJECT_ID=$PROJECT_ID,FIREBASE_STORAGE_BUCKET=$STORAGE_BUCKET,API_VERSION=v1,MAX_FILE_SIZE=52428800

echo ""
echo "✅ Backend deployed"
echo ""

# Get the backend URL
BACKEND_URL=$(gcloud run services describe sds-dashboard-api --region $REGION --format 'value(status.url)')
echo "📝 Your backend URL: $BACKEND_URL/api/v1"
echo ""

# Get the frontend URL
FRONTEND_URL=$(firebase hosting:channel:list | grep "live" | awk '{print $2}')
echo "📝 Your frontend URL: $FRONTEND_URL"
echo ""

echo "==================================="
echo "✅ Deployment Complete!"
echo "==================================="
echo ""
echo "Next Steps:"
echo "1. Update frontend/.env with your backend URL:"
echo "   REACT_APP_API_URL=$BACKEND_URL/api/v1"
echo ""
echo "2. Rebuild and redeploy frontend:"
echo "   cd frontend && npm run build && cd .. && firebase deploy --only hosting"
echo ""
echo "3. Open your app: $FRONTEND_URL"
echo ""
echo "4. Login with your @salesforce.com Google account"
echo ""
echo "5. Grant yourself admin access in Firestore:"
echo "   - Go to Firebase Console → Firestore Database"
echo "   - Find your user in 'users' collection"
echo "   - Change 'role' to 'admin'"
echo ""
echo "🎉 Enjoy your SDS Dashboard!"
