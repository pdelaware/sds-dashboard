# 🚀 Deployment Guide - SDS Dashboard

## Quick Deploy (15 minutes to live URL)

This guide will get your SDS Dashboard live on the internet with a public URL.

---

## Prerequisites

- ✅ Firebase project created (from GETTING_STARTED.md)
- ✅ Backend and Frontend code ready (already in ~/sds-dashboard)
- ✅ Google Cloud SDK installed (we'll do this)

---

## Step 1: Install Firebase CLI (2 min)

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login
```

Follow the browser prompts to authenticate with your Google account.

---

## Step 2: Initialize Firebase in Your Project (3 min)

```bash
cd ~/sds-dashboard

# Initialize Firebase
firebase init
```

**Interactive Setup:**

1. **Which Firebase features do you want to set up?**
   - Select: `Firestore`, `Functions`, `Hosting`, `Storage`
   - Use arrow keys + spacebar to select, then Enter

2. **Select a default Firebase project**
   - Choose: `Use an existing project`
   - Select your project: `sds-dashboard-prod`

3. **Firestore Setup**
   - Firestore rules file: `firestore.rules` (default)
   - Firestore indexes file: `firestore.indexes.json` (default)

4. **Functions Setup**
   - Language: `JavaScript`
   - ESLint: `No`
   - Install dependencies: `Yes`

5. **Hosting Setup**
   - Public directory: `frontend/build`
   - Single-page app: `Yes`
   - Set up automatic builds with GitHub: `No`
   - Overwrite index.html: `No`

6. **Storage Setup**
   - Storage rules file: `storage.rules` (default)

---

## Step 3: Configure Firestore Security Rules (2 min)

Edit `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }

    // Helper function to check user role
    function hasRole(role) {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }

    // Documents collection
    match /documents/{document} {
      allow read: if isAuthenticated();
      allow create: if hasRole('admin') || hasRole('regional_coordinator') || hasRole('facilities_editor');
      allow update: if hasRole('admin') || hasRole('regional_coordinator');
      allow delete: if hasRole('admin');
    }

    // Offices collection
    match /offices/{office} {
      allow read: if isAuthenticated();
      allow write: if hasRole('admin');
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if hasRole('admin') || request.auth.uid == userId;
    }

    // Categories collection
    match /categories/{category} {
      allow read: if isAuthenticated();
      allow write: if hasRole('admin');
    }

    // Audit log
    match /auditLog/{log} {
      allow read: if hasRole('admin');
      allow create: if isAuthenticated();
    }
  }
}
```

---

## Step 4: Configure Storage Security Rules (1 min)

Edit `storage.rules`:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /sds-library/{allPaths=**} {
      // Allow authenticated users to read
      allow read: if request.auth != null;
      
      // Allow admin, coordinator, and editor to write
      allow write: if request.auth != null && 
                     (request.auth.token.role == 'admin' ||
                      request.auth.token.role == 'regional_coordinator' ||
                      request.auth.token.role == 'facilities_editor');
    }
  }
}
```

---

## Step 5: Build Frontend (2 min)

```bash
cd ~/sds-dashboard/frontend

# Make sure .env is configured (from GETTING_STARTED.md)
# Check that REACT_APP_FIREBASE_* variables are set

# Build for production
npm run build
```

This creates an optimized production build in `frontend/build/`.

---

## Step 6: Deploy Frontend to Firebase Hosting (2 min)

```bash
cd ~/sds-dashboard

# Deploy frontend
firebase deploy --only hosting
```

Expected output:
```
✔  Deploy complete!

Hosting URL: https://sds-dashboard-prod.web.app
```

**🎉 Your frontend is now live!** But the backend needs to be deployed too.

---

## Step 7: Deploy Backend to Google Cloud Run (5 min)

### Option A: Using Google Cloud Console (Recommended - Easier)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `sds-dashboard-prod`
3. Navigate to **Cloud Run**
4. Click **"CREATE SERVICE"**

**Service Configuration:**
- **Container image**: We'll build from source
- Click **"SET UP CONTINUOUS DEPLOYMENT"** → Skip for now
- **Service name**: `sds-dashboard-api`
- **Region**: `us-central1` (or nearest to you)
- **Authentication**: Allow unauthenticated invocations (we handle auth in code)

**Container Configuration:**
- **CPU allocation**: CPU is only allocated during request processing
- **Memory**: 512 MiB
- **Request timeout**: 300 seconds
- **Maximum concurrent requests**: 80

**Environment Variables** (Click "CONTAINER, VARIABLES & SECRETS" tab):
- `NODE_ENV` = `production`
- `GOOGLE_CLOUD_PROJECT_ID` = `sds-dashboard-prod`
- `FIREBASE_STORAGE_BUCKET` = `sds-dashboard-prod.appspot.com`
- `FRONTEND_URL` = `https://sds-dashboard-prod.web.app`
- `API_VERSION` = `v1`
- `MAX_FILE_SIZE` = `52428800`
- `ALLOWED_FILE_TYPES` = `application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`

**Source Code:**
- Upload your `backend/` folder as a ZIP
- OR connect to your git repository (git.soma.salesforce.com)

**Deploy!**

After deployment, you'll get a URL like:
```
https://sds-dashboard-api-[hash]-uc.a.run.app
```

### Option B: Using gcloud CLI

```bash
# Install Google Cloud SDK (if not installed)
# Visit: https://cloud.google.com/sdk/docs/install

cd ~/sds-dashboard/backend

# Create Dockerfile (if not exists)
cat > Dockerfile <<'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
EOF

# Create .dockerignore
cat > .dockerignore <<'EOF'
node_modules
serviceAccountKey.json
.env
EOF

# Deploy to Cloud Run
gcloud run deploy sds-dashboard-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,GOOGLE_CLOUD_PROJECT_ID=sds-dashboard-prod,FIREBASE_STORAGE_BUCKET=sds-dashboard-prod.appspot.com,API_VERSION=v1
```

---

## Step 8: Update Frontend with Backend URL (2 min)

After backend is deployed, you have your API URL. Update frontend:

1. Edit `frontend/.env`:
```env
REACT_APP_API_URL=https://sds-dashboard-api-[your-hash]-uc.a.run.app/api/v1
```

2. Rebuild and redeploy frontend:
```bash
cd ~/sds-dashboard/frontend
npm run build
cd ..
firebase deploy --only hosting
```

---

## Step 9: Test Your Live Application

### Your URLs:
- **Frontend**: `https://sds-dashboard-prod.web.app`
- **Backend**: `https://sds-dashboard-api-[hash]-uc.a.run.app`

### Test Steps:

1. **Open Frontend URL** in browser
2. **Click "Sign in with Google"**
3. **Login with @salesforce.com account**
4. **You should see the Dashboard!**

If login works but data doesn't load:
- Check that backend URL is correct in frontend `.env`
- Check backend logs in Cloud Run console
- Verify Firestore has data (run seed script if needed)

---

## Step 10: Grant Yourself Admin Access

After first login, grant yourself admin role:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project → **Firestore Database**
3. Find collection: `users`
4. Find your user document (by your email)
5. Edit document:
   - `role`: change to `admin`
   - `assignedOffices`: add all office IDs from `offices` collection
6. Save
7. Refresh the web app

Now you'll have full admin access!

---

## ✅ You're Live!

Your application is now deployed and accessible at:

```
https://sds-dashboard-prod.web.app
```

### Share with your team:
1. Send them the URL
2. They login with @salesforce.com accounts
3. You assign them roles via Firestore or (later) via Settings page

---

## 🔧 Ongoing Maintenance

### Update Backend
```bash
cd ~/sds-dashboard/backend
gcloud run deploy sds-dashboard-api \
  --source . \
  --region us-central1
```

### Update Frontend
```bash
cd ~/sds-dashboard/frontend
npm run build
firebase deploy --only hosting
```

### View Logs
- **Backend**: Cloud Run console → your service → Logs tab
- **Frontend**: Browser DevTools console

### Monitor Costs
- Firebase Console → Usage & Billing
- Google Cloud Console → Billing

**Estimated costs**: $10-50/month for small usage

---

## 🎯 Custom Domain (Optional)

To use your own domain (e.g., `sds.salesforce.com`):

1. Firebase Console → Hosting → Add custom domain
2. Follow DNS configuration instructions
3. SSL certificate auto-provisioned
4. Takes 24-48 hours to propagate

---

## 🐛 Troubleshooting

### "Failed to fetch" errors
- Check backend URL in frontend `.env`
- Verify CORS settings in backend allow frontend URL
- Check Cloud Run service is running

### Authentication not working
- Verify Firebase config in frontend `.env`
- Check authorized domains in Firebase Console

### Database errors
- Run seed script: `node backend/src/utils/seedDatabase.js`
- Check Firestore rules allow authenticated access

### File upload fails
- Check Storage rules
- Verify Storage bucket name in backend `.env`
- Check file size limits

---

## 📞 Need Help?

**Check logs:**
```bash
# Backend logs
gcloud run services logs read sds-dashboard-api --region us-central1

# Frontend hosting logs
firebase hosting:channel:open live
```

**Debug mode:**
```bash
# Run backend locally
cd backend
npm run dev

# Run frontend locally
cd frontend
npm start
```

---

## 🎉 Success!

You now have a fully deployed SDS Dashboard accessible worldwide!

**Your Access URL**: `https://sds-dashboard-prod.web.app`

Share with your team and start uploading those SDS documents! 🚀
