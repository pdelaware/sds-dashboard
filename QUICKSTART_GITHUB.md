# 🚀 QUICKSTART: Deploy to GitHub Pages (5 Commands)

## Your Link Will Be:
```
https://YOUR_USERNAME.github.io/sds-dashboard
```

---

## 5-Step Deploy (10 Minutes Total)

### Step 1: Create GitHub Repository (2 min)

Go to https://github.com/new and create a repository named `sds-dashboard`

### Step 2: Push Your Code (1 min)

```bash
cd ~/sds-dashboard

# Add your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/sds-dashboard.git

# Push code
git push -u origin main
```

### Step 3: Add Firebase Secrets (3 min)

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**

Click **"New repository secret"** and add these 7 secrets:

```
REACT_APP_API_URL = http://localhost:5000/api/v1
REACT_APP_FIREBASE_API_KEY = (from your Firebase Console)
REACT_APP_FIREBASE_AUTH_DOMAIN = (from your Firebase Console)
REACT_APP_FIREBASE_PROJECT_ID = (from your Firebase Console)
REACT_APP_FIREBASE_STORAGE_BUCKET = (from your Firebase Console)
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = (from your Firebase Console)
REACT_APP_FIREBASE_APP_ID = (from your Firebase Console)
```

Get these values from: https://console.firebase.google.com → Your Project → Settings → General

### Step 4: Enable GitHub Pages (2 min)

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**: Select branch `gh-pages` and folder `/ (root)`
3. Click **Save**

### Step 5: Deploy (2 min)

```bash
cd ~/sds-dashboard/frontend

# Install dependencies
npm install

# Deploy!
npm run deploy
```

---

## ✅ That's It!

Your app will be live at:
```
https://YOUR_USERNAME.github.io/sds-dashboard
```

Wait 2-3 minutes after deployment, then open the link!

---

## 🔧 Next: Deploy Backend

Your frontend is live, but you need a backend too.

### Option A: Google Cloud Run (Recommended)
```bash
cd ~/sds-dashboard/backend
gcloud run deploy sds-dashboard-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

Then update GitHub secret `REACT_APP_API_URL` with the Cloud Run URL and redeploy.

### Option B: Run Backend Locally (Testing)
```bash
cd ~/sds-dashboard/backend
npm run dev
```

Keep this running while testing the app.

---

## 🔄 Update Your App

After making changes:

```bash
cd ~/sds-dashboard/frontend
npm run deploy
```

Or just push to GitHub - it auto-deploys:
```bash
git add .
git commit -m "Update"
git push
```

---

## 🎯 Your URLs

**Frontend**: `https://YOUR_USERNAME.github.io/sds-dashboard`  
**Backend**: Deploy separately (see above)

---

**That's it! 5 commands and you're live!** 🚀

Full details: See `GITHUB_DEPLOY.md`
