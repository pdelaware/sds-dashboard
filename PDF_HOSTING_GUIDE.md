# PDF Hosting Setup Guide

## 🎯 Overview

The SDS Dashboard includes a full PDF viewer (`library.html`) that can display Safety Data Sheets from any cloud storage provider. This guide shows you how to set it up.

## 📋 Prerequisites

You need:
1. SDS PDF files
2. Cloud storage account (Google Drive, AWS S3, or Azure Blob Storage)
3. Public URLs for each PDF

## 🚀 Option 1: Google Drive (Easiest)

### Step 1: Upload PDFs to Google Drive

1. Go to https://drive.google.com
2. Create a folder structure:
   ```
   SDS Library/
   ├── San Francisco/
   │   ├── EcoLab_All_Purpose_Cleaner.pdf
   │   ├── Clorox_Disinfectant_Spray.pdf
   │   └── ...
   ├── Amsterdam/
   │   ├── CSU_Universele_Ontkalker.pdf
   │   └── ...
   └── Atlanta/
       └── ...
   ```

### Step 2: Make PDFs Publicly Accessible

For each PDF:
1. Right-click → **Share**
2. Click **Change to anyone with the link**
3. Set permission to **Viewer**
4. Copy the share link

### Step 3: Convert Google Drive Links

Google Drive link format:
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

Convert to direct download format:
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

### Step 4: Update library.html

Edit `library.html` and update the `sampleDocuments` object (around line 395):

```javascript
const sampleDocuments = {
    'San Francisco': [
        { 
            name: 'EcoLab All Purpose Cleaner', 
            category: 'All Purpose Cleaner', 
            location: 'Janitorial Closet', 
            url: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE'
        },
        // ... more documents
    ],
    // ... more offices
};
```

## 🌐 Option 2: AWS S3 (Recommended for Production)

### Step 1: Create S3 Bucket

```bash
aws s3 mb s3://sds-library-pdfs
```

### Step 2: Upload PDFs

```bash
aws s3 cp pdfs/ s3://sds-library-pdfs/ --recursive
```

### Step 3: Configure Public Access

Create bucket policy (`bucket-policy.json`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::sds-library-pdfs/*"
    }
  ]
}
```

Apply policy:
```bash
aws s3api put-bucket-policy --bucket sds-library-pdfs --policy file://bucket-policy.json
```

### Step 4: Get PDF URLs

URLs will be:
```
https://sds-library-pdfs.s3.amazonaws.com/san-francisco/ecolab-cleaner.pdf
```

Update `library.html` with these URLs.

## ☁️ Option 3: Azure Blob Storage

### Step 1: Create Storage Account

```bash
az storage account create \
  --name sdslibrarystorage \
  --resource-group sds-dashboard \
  --location westus \
  --sku Standard_LRS
```

### Step 2: Create Container

```bash
az storage container create \
  --name pdfs \
  --account-name sdslibrarystorage \
  --public-access blob
```

### Step 3: Upload PDFs

```bash
az storage blob upload-batch \
  --destination pdfs \
  --source ./pdfs \
  --account-name sdslibrarystorage
```

### Step 4: Get PDF URLs

URLs will be:
```
https://sdslibrarystorage.blob.core.windows.net/pdfs/san-francisco/ecolab-cleaner.pdf
```

## 📝 Updating Document Data

### From Google Sheets (Recommended)

Instead of hardcoding URLs in JavaScript, fetch them from your Google Sheet:

1. Add a "PDF URL" column to your spreadsheet
2. Create a Google Apps Script to serve the data as JSON:

```javascript
function doGet() {
  const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
  const sheets = ss.getSheets();
  const data = {};
  
  sheets.forEach(sheet => {
    const sheetName = sheet.getName();
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    const documents = [];
    
    for (let i = 1; i < rows.length; i++) {
      const doc = {};
      headers.forEach((header, j) => {
        doc[header] = rows[i][j];
      });
      documents.push(doc);
    }
    
    data[sheetName] = documents;
  });
  
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy as Web App
4. Update `library.html` to fetch from this endpoint:

```javascript
async function loadDocuments() {
    const response = await fetch('YOUR_APPS_SCRIPT_WEB_APP_URL');
    const allDocuments = await response.json();
    currentDocuments = allDocuments[office] || [];
    renderDocuments();
}
```

## 🔒 Security Considerations

### For Internal Use Only

If PDFs contain sensitive data:

1. **Don't use public URLs**
2. **Use authenticated storage:**
   - AWS S3 with presigned URLs
   - Azure Blob with SAS tokens
   - Google Drive with OAuth

### Example: S3 Presigned URLs

Update the Apps Script to generate presigned URLs:

```javascript
// This requires AWS SDK setup
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

function generatePresignedUrl(key) {
  return s3.getSignedUrl('getObject', {
    Bucket: 'sds-library-pdfs',
    Key: key,
    Expires: 3600 // 1 hour
  });
}
```

## 🧪 Testing

1. Open the library page:
   - https://pdelaware.github.io/sds-dashboard/library.html?office=San%20Francisco

2. Click a document from the list

3. PDF should load in the viewer

## 🎨 Current Pages

- **Main Dashboard:** https://pdelaware.github.io/sds-dashboard/
- **All Locations:** https://pdelaware.github.io/sds-dashboard/locations.html
- **Library Viewer:** https://pdelaware.github.io/sds-dashboard/library.html?office=San%20Francisco
- **Analytics:** https://pdelaware.github.io/sds-dashboard/analytics.html
- **Upload:** https://pdelaware.github.io/sds-dashboard/upload.html

## 📊 Integration with Upload Form

When users upload via `upload.html`:

1. File is saved to Google Sheets (metadata)
2. **Also upload the PDF** to your chosen storage
3. Get the public URL
4. Add URL to the spreadsheet in a "PDF URL" column
5. Library viewer will fetch and display it

You can enhance the Google Apps Script from `UPLOAD_SETUP.md` to handle file uploads:

```javascript
function doPost(e) {
  // ... existing metadata code ...
  
  // Handle file upload
  const blob = e.parameter.pdfFile;
  const folder = DriveApp.getFolderById('YOUR_FOLDER_ID');
  const file = folder.createFile(blob);
  const fileUrl = file.getUrl();
  
  // Add URL to spreadsheet
  sheet.appendRow([
    data.office,
    data.location,
    data.category,
    data.productName,
    fileUrl  // Add PDF URL column
  ]);
}
```

## 🔄 Next Steps

1. Choose your storage provider (Google Drive for simplicity)
2. Upload 5-10 sample PDFs
3. Update `library.html` with real URLs
4. Test the viewer
5. Scale to all documents
6. Set up automated sync from Google Sheets
