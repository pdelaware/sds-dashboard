# 🚀 Deploy SDS Dashboard to GitHub (10 Minutes)

## Your Link Will Be:
```
https://pdelaware.github.io/sds-dashboard
```

---

## Step 1: Create GitHub Repository (3 min)

### Option A: Via GitHub Website (Easiest)
1. Go to https://github.com/new
2. Repository name: `sds-dashboard`
3. Description: `Salesforce Global SDS Library`
4. Visibility: **Private** (recommended for internal Salesforce project)
5. **Don't** initialize with README (we have our own)
6. Click **"Create repository"**

### Option B: Via GitHub CLI
```bash
# Install GitHub CLI if needed
brew install gh

# Login
gh auth login

# Create repository
gh repo create sds-dashboard --private --source=. --remote=origin --push
```

---

## Step 2: Push Your Code to GitHub (2 min)

```bash
cd ~/sds-dashboard

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sds-dashboard.git

# Push code
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

---

## Step 3: Configure GitHub Secrets (3 min)

You need to add your Firebase config as GitHub Secrets so the deployment can access them.

### Via GitHub Website:
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **"New repository secret"**

Add these secrets one by one:

| Secret Name | Value (from your frontend/.env) |
|-------------|--------------------------------|
| `REACT_APP_API_URL` | Your backend URL or `http://localhost:5000/api/v1` |
| `REACT_APP_FIREBASE_API_KEY` | Your Firebase API key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Your Firebase auth domain |
| `REACT_APP_FIREBASE_PROJECT_ID` | Your Firebase project ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Your Firebase storage bucket |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase messaging sender ID |
| `REACT_APP_FIREBASE_APP_ID` | Your Firebase app ID |

---

## Step 4: Enable GitHub Pages (1 min)

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

---

## Step 5: Install Dependencies & Deploy (1 min)

```bash
cd ~/sds-dashboard/frontend

# Install gh-pages package
npm install

# Deploy to GitHub Pages
npm run deploy
```

This will:
- Build your frontend
- Create a `gh-pages` branch
- Push built files to GitHub Pages
- Your site will be live in 1-2 minutes!

---

## ✅ Your Live Link

After deployment completes, your app will be accessible at:

```
https://pdelaware.github.io/sds-dashboard
```

**OR** (if using your own username):
```
https://YOUR_USERNAME.github.io/sds-dashboard
```

---

## 🔧 Backend Deployment Options

GitHub Pages only hosts the frontend (static files). Your backend needs to be hosted separately.

### Option 1: Use Google Cloud Run (Recommended)
```bash
cd ~/sds-dashboard/backend

gcloud run deploy sds-dashboard-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

Then update the GitHub secret `REACT_APP_API_URL` with your Cloud Run URL.

### Option 2: Use Heroku (Free Tier)
```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku login

# Create app
cd ~/sds-dashboard/backend
heroku create sds-dashboard-api

# Deploy
git subtree push --prefix backend heroku main
```

### Option 3: Run Backend Locally (Testing Only)
```bash
cd ~/sds-dashboard/backend
npm run dev
```

Keep this running and use `http://localhost:5000/api/v1` as your API URL.

---

## 🔄 Update Your Deployed Site

Anytime you make changes:

```bash
cd ~/sds-dashboard/frontend
npm run deploy
```

Or just push to main branch - GitHub Actions will auto-deploy:
```bash
git add .
git commit -m "Update app"
git push origin main
```

---

## 📱 Custom Domain (Optional)

Want to use `sds.salesforce.com` instead?

1. Go to GitHub repo → Settings → Pages
2. Add custom domain: `sds.salesforce.com`
3. Configure DNS (CNAME record pointing to `pdelaware.github.io`)
4. Enable HTTPS (automatic)

---

## 🔐 Access Control

Since this is internal Salesforce project:

### Option 1: Private Repository
- Repository is already private
- Only invited collaborators can see code
- App is still public once deployed

### Option 2: Add Authentication Guard
The app already has Google SSO that restricts to @salesforce.com emails!

### Option 3: Use GitHub Enterprise
If Salesforce has GitHub Enterprise, use that for better control.

---

## 🐛 Troubleshooting

### "404 Not Found" after deployment
- Wait 2-3 minutes for GitHub Pages to build
- Check Settings → Pages shows the URL
- Verify `gh-pages` branch exists

### "Failed to load" or API errors
- Check your API URL in GitHub Secrets
- Make sure backend is running (Cloud Run or local)
- Check browser console for CORS errors

### Build fails in GitHub Actions
- Check Actions tab for error logs
- Verify all secrets are set correctly
- Make sure frontend/package.json is valid

### Authentication not working
- Verify Firebase config secrets are correct
- Check Firebase Console → Authentication → Settings → Authorized domains
- Add `pdelaware.github.io` to authorized domains

---

## 💰 Cost

- **GitHub Pages**: FREE (for public repos)
- **GitHub Private Repo**: FREE (included with GitHub account)
- **Backend (Cloud Run)**: ~$10-20/month
- **Backend (Heroku Free Tier)**: FREE (with limitations)

Total: **$0-20/month**

---

## 🎉 Success!

Your SDS Dashboard is now live on GitHub Pages!

**Frontend**: https://pdelaware.github.io/sds-dashboard  
**Backend**: Deploy separately (see options above)

Share the link with your team! 🚀

---

## Quick Commands Reference

```bash
# Deploy frontend to GitHub Pages
cd ~/sds-dashboard/frontend && npm run deploy

# Push code updates
cd ~/sds-dashboard
git add .
git commit -m "Update"
git push origin main

# Deploy backend to Cloud Run
cd ~/sds-dashboard/backend
gcloud run deploy sds-dashboard-api --source . --region us-central1

# Run backend locally
cd ~/sds-dashboard/backend && npm run dev
```
