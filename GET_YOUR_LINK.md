# 🔗 GET YOUR ACCESS LINK (15 Minutes)

## Your SDS Dashboard is 100% Complete and Ready to Deploy!

---

## 🚀 Quick Deploy (Choose One Option)

### Option A: Automated Script (Easiest)

```bash
cd ~/sds-dashboard
./deploy.sh
```

The script will walk you through everything and give you your URL at the end!

---

### Option B: Manual Step-by-Step

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
firebase login
```

2. **Build Frontend**
```bash
cd ~/sds-dashboard/frontend
npm run build
```

3. **Deploy Frontend**
```bash
cd ~/sds-dashboard
firebase init  # Select Firestore, Hosting, Storage, Functions
firebase deploy --only hosting
```

You'll get: `https://sds-dashboard-prod.web.app`

4. **Deploy Backend**
```bash
cd ~/sds-dashboard/backend
gcloud run deploy sds-dashboard-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

You'll get: `https://sds-dashboard-api-[hash].run.app`

5. **Update Frontend with Backend URL**

Edit `frontend/.env`:
```
REACT_APP_API_URL=https://sds-dashboard-api-[your-hash].run.app/api/v1
```

Rebuild and redeploy:
```bash
cd frontend && npm run build && cd .. && firebase deploy --only hosting
```

---

### Option C: Run Locally First

```bash
# Terminal 1: Backend
cd ~/sds-dashboard/backend
npm install
node src/utils/seedDatabase.js  # Seed data
npm run dev

# Terminal 2: Frontend  
cd ~/sds-dashboard/frontend
npm install
npm start
```

Open: http://localhost:3000

---

## ✅ After Deployment

### 1. Open Your URL
Your frontend will be at: `https://sds-dashboard-prod.web.app`

### 2. Login
Click "Sign in with Google" → Use your @salesforce.com account

### 3. Grant Admin Access
- Go to [Firebase Console](https://console.firebase.google.com/)
- Open Firestore Database
- Find your user in `users` collection
- Edit: Change `role` to `admin`
- Refresh the app

### 4. Start Using!
- Upload SDS documents
- Search the library
- View dashboard analytics
- Manage compliance

---

## 📋 Prerequisites

Before deploying, make sure you have:

1. ✅ Firebase project created
2. ✅ `.env` files configured (backend/.env and frontend/.env)
3. ✅ Service account key downloaded (backend/serviceAccountKey.json)

If you haven't done these, follow: **GETTING_STARTED.md**

---

## 🎯 Your URLs

After deployment, you'll have:

**Frontend (Public URL)**: `https://sds-dashboard-prod.web.app`  
**Backend (API URL)**: `https://sds-dashboard-api-[hash]-uc.a.run.app`

Share the frontend URL with your team!

---

## 💰 Cost

**Monthly**: $10-50 depending on usage  
**Free tier**: Available for low traffic  

---

## 📞 Need Help?

Check the documentation:
- **GETTING_STARTED.md** - Initial setup (30 min)
- **DEPLOYMENT.md** - Detailed deploy guide (15 min)
- **FINAL_SUMMARY.md** - Complete project summary
- **README.md** - Full project documentation

---

## 🎉 That's It!

Run the deploy script and in 15 minutes you'll have your access link!

```bash
cd ~/sds-dashboard
./deploy.sh
```

**Your team will be able to access the SDS library from anywhere!** 🌐
