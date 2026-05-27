# SDS Upload Setup Instructions

## Step 1: Deploy the Google Apps Script

1. **Open your SDS spreadsheet:**
   - Go to: https://docs.google.com/spreadsheets/d/1sa4tztMErbdJR8e4gsl6V_2KWXY56AmqWVJQOyuz8vc/edit

2. **Open Apps Script:**
   - Click **Extensions** → **Apps Script**

3. **Replace the code:**
   - Delete any existing code in `Code.gs`
   - Copy the code from `google-apps-script/Code.gs` in this repo
   - Paste it into the Apps Script editor

4. **Deploy as Web App:**
   - Click **Deploy** → **New deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose **Web app**
   - Fill in:
     - **Description:** `SDS Upload API`
     - **Execute as:** `Me (your-email@salesforce.com)`
     - **Who has access:** `Anyone` (Salesforce employees will be able to access)
   - Click **Deploy**

5. **Copy the Web App URL:**
   - You'll see a URL like: `https://script.google.com/macros/s/ABC.../exec`
   - **COPY THIS URL** - you'll need it in Step 2

6. **Grant permissions:**
   - Click **Authorize access**
   - Choose your Salesforce Google account
   - Click **Advanced** → **Go to SDS Upload API (unsafe)**
   - Click **Allow**

## Step 2: Update the Upload Page

1. **Edit `upload.html`:**
   - Find line 283: `const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL you copied

2. **Example:**
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```

## Step 3: Deploy to GitHub Pages

Run these commands:

```bash
# Copy upload page to gh-pages
git checkout gh-pages
cp upload.html .
git add upload.html
git commit -m "Add functional upload page"
git push origin gh-pages

# Also add to main branch
git checkout main
git add upload.html google-apps-script/Code.gs UPLOAD_SETUP.md
git commit -m "Add upload functionality with Google Sheets integration"
git push origin main
git push soma main
```

## Step 4: Test the Upload

1. Go to: https://pdelaware.github.io/sds-dashboard/upload.html
2. OR: https://git.soma.salesforce.com/pages/pdelaware/sds-dashboard/upload.html

3. Fill out the form:
   - **Office:** Select any office
   - **Location:** e.g., "Janitorial closet"
   - **Category:** Select from dropdown
   - **Product Name:** e.g., "Test Product SDS"
   - Click **Submit**

4. Verify in the spreadsheet:
   - Go back to your Google Sheet
   - Find the tab for the office you selected
   - Your new entry should appear at the bottom

## How It Works

1. User fills out the form on `upload.html`
2. JavaScript sends the data to your Google Apps Script Web App
3. Apps Script appends a new row to the correct office tab in the spreadsheet
4. If the office tab doesn't exist, it creates it automatically
5. Success message appears, form clears

## Troubleshooting

**"Error: Failed to fetch"**
- Make sure you deployed the Apps Script as a Web App
- Check that "Who has access" is set to "Anyone"

**"Script not found"**
- Verify the SCRIPT_URL in upload.html matches your deployment URL exactly
- Make sure the URL ends with `/exec` not `/dev`

**Data not appearing in spreadsheet**
- Check the Apps Script execution logs: Apps Script editor → Executions
- Verify you authorized the script to access your spreadsheet

**Office tab not found**
- The script auto-creates tabs for new offices
- Make sure the office name in the form matches the spreadsheet tab names exactly
