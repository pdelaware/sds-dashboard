# Salesforce Global SDS Library

A modern, web-based Safety Data Sheet (SDS) management platform for Salesforce Workplace Services, enabling global workforce to access critical safety information instantly.

## 🌐 Features

- **Global Document Library**: Searchable, filterable SDS documents across 9+ offices
- **Intelligent Upload**: Drag-and-drop upload with AI-powered metadata extraction
- **Lightning Design System**: Salesforce-branded UI with SLDS components
- **Multi-Office Support**: Amsterdam, Atlanta, Boston, Chicago, Dallas, Irvine, NY, SF, Toronto
- **Role-Based Access**: Admin, Regional Coordinator, Facilities Editor, Viewer roles
- **Compliance Tracking**: Automated expiration alerts (90/60/30 days)
- **Analytics Dashboard**: Document stats, office distribution, expiring documents
- **Google Cloud Integration**: Firebase Auth, Firestore, Cloud Storage
- **Mobile Responsive**: Progressive Web App (PWA) with offline capabilities

## 🏗️ Architecture

### Tech Stack

**Frontend**:
- React 18 with React Router v6
- Salesforce Lightning Design System (SLDS)
- Firebase SDK (Auth, Firestore, Storage)
- Axios for API calls
- React-PDF for document viewing

**Backend**:
- Node.js with Express.js
- Firebase Admin SDK
- Google Cloud Firestore (database)
- Google Cloud Storage (file storage)
- JWT authentication via Firebase Auth

**Infrastructure**:
- Google Cloud Platform
- Firebase Hosting (frontend)
- Cloud Run or Cloud Functions (backend API)
- Cloud Storage (documents)
- Firestore (metadata)

## 📦 Project Structure

```
sds-dashboard/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Auth/         # Login, authentication
│   │   │   ├── Layout/       # Header, Sidebar, navigation
│   │   │   ├── Dashboard/    # Dashboard widgets
│   │   │   ├── Documents/    # Document library, detail, upload
│   │   │   ├── Analytics/    # Analytics dashboard
│   │   │   └── Settings/     # User settings
│   │   ├── context/          # React Context (Auth)
│   │   ├── config/           # Firebase config
│   │   ├── services/         # API service layer
│   │   ├── utils/            # Utility functions
│   │   ├── App.js            # Main app component
│   │   └── index.js          # Entry point
│   ├── package.json
│   └── .env.example          # Environment variables template
│
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   │   ├── documents.js  # Document CRUD + upload
│   │   │   ├── offices.js    # Office management
│   │   │   ├── users.js      # User management
│   │   │   ├── categories.js # Category management
│   │   │   ├── search.js     # Search functionality
│   │   │   └── analytics.js  # Analytics endpoints
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.js       # JWT verification, role check
│   │   │   └── errorHandler.js # Error handling
│   │   ├── config/           # Configuration
│   │   │   └── firebase.js   # Firebase Admin SDK setup
│   │   ├── utils/            # Utility functions
│   │   │   └── seedDatabase.js # Database seeding script
│   │   └── server.js         # Express server
│   ├── package.json
│   └── .env.example          # Environment variables template
│
├── public/docs/              # Sample SDS documents (PDF)
├── SDS_Dashboard_Requirements_Global.md  # Full requirements doc
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Google Cloud Platform account
- Firebase project created
- Salesforce Google Workspace account

### 1. Clone Repository

```bash
cd ~/sds-dashboard
```

### 2. Set Up Google Cloud / Firebase

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project: "sds-dashboard-prod"
3. Enable Google Authentication:
   - Authentication → Sign-in method → Google → Enable
   - Add authorized domain: `salesforce.com`
4. Create Firestore Database:
   - Firestore Database → Create database → Start in production mode
   - Location: `us-central1` (or appropriate region)
5. Create Storage Bucket:
   - Storage → Get started
   - Security rules: Start in production mode
6. Get Firebase Config:
   - Project Settings → General → Your apps → Web app
   - Copy configuration object

#### Download Service Account Key (Backend)
1. Project Settings → Service accounts
2. Generate new private key
3. Download JSON file
4. Save as `backend/serviceAccountKey.json` (DO NOT commit to git!)

### 3. Configure Environment Variables

#### Backend Configuration

```bash
cd backend
cp .env.example .env
# Edit .env with your values:
```

```env
PORT=5000
NODE_ENV=development

GOOGLE_CLOUD_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json

FRONTEND_URL=http://localhost:3000

API_VERSION=v1
MAX_FILE_SIZE=52428800
ALLOWED_FILE_TYPES=application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

#### Frontend Configuration

```bash
cd ../frontend
cp .env.example .env
# Edit .env with your Firebase config:
```

```env
REACT_APP_API_URL=http://localhost:5000/api/v1

REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 4. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 5. Seed Database

```bash
cd backend
node src/utils/seedDatabase.js
```

This will create:
- 9 offices (Amsterdam, Atlanta, Boston, Chicago, Dallas, Irvine, NY, SF, Toronto)
- 17 categories (Cleaning Agents, Detergents, Sanitizers, etc.)
- 5 sample documents
- 1 admin user

### 6. Start Development Servers

#### Backend (Terminal 1)
```bash
cd backend
npm run dev
```

Server runs on `http://localhost:5000`

#### Frontend (Terminal 2)
```bash
cd frontend
npm start
```

App runs on `http://localhost:3000`

### 7. Access Application

1. Open browser: `http://localhost:3000`
2. Click "Sign in with Google"
3. Use your `@salesforce.com` Google account
4. First login creates user profile with "viewer" role
5. To grant admin access, update user role in Firestore manually

## 📊 API Endpoints

### Authentication
All endpoints require `Authorization: Bearer <firebase-id-token>` header

### Documents
- `GET /api/v1/documents` - List documents (with filters: office, category, status, search)
- `GET /api/v1/documents/:id` - Get document details
- `POST /api/v1/documents` - Upload document (Admin/Coordinator/Editor)
- `PUT /api/v1/documents/:id` - Update document metadata
- `DELETE /api/v1/documents/:id` - Delete document (Admin only)
- `GET /api/v1/documents/:id/download` - Get download URL

### Offices
- `GET /api/v1/offices` - List all offices
- `GET /api/v1/offices/:id` - Get office details
- `GET /api/v1/offices/:id/documents` - Get documents for office
- `POST /api/v1/offices` - Create office (Admin only)

### Users
- `GET /api/v1/users/me` - Get current user profile
- `GET /api/v1/users` - List all users (Admin/Coordinator)
- `PUT /api/v1/users/:id` - Update user role/permissions (Admin)

### Categories
- `GET /api/v1/categories` - List all categories

### Search
- `GET /api/v1/search?q=keyword` - Global search

### Analytics
- `GET /api/v1/analytics/overview` - Dashboard KPIs
- `GET /api/v1/analytics/documents-by-office` - Document counts per office
- `GET /api/v1/analytics/expiring` - List expiring documents

## 🔐 User Roles & Permissions

### Admin (H&S Manager)
- Full access to all features
- Upload, edit, delete any document
- Manage users and permissions
- View all analytics
- Manage offices and categories

### Regional Coordinator (Safety Leads)
- Manage documents for assigned region(s)/office(s)
- Upload and edit documents
- View analytics for assigned offices
- Cannot delete documents or manage users

### Facilities Editor (On-Site Teams)
- Upload documents for assigned office(s)
- Edit own uploaded documents
- View and download all documents
- No analytics access

### Viewer (All Employees)
- Browse, search, view, and download documents
- No upload or edit permissions
- No analytics access

## 📱 Current Data (from Spreadsheet)

### Offices (9 locations)
1. **Amsterdam** - Edge Stadium (Netherlands, EMEA)
2. **Atlanta** - Atlanta Tower (USA, Americas)
3. **Boston** (USA, Americas)
4. **Chicago** (USA, Americas)
5. **Dallas** (USA, Americas)
6. **Irvine** (USA, Americas)
7. **New York** (USA, Americas)
8. **San Francisco** (USA, Americas)
9. **Toronto** (Canada, Americas)

### Document Categories (17)
- Cleaning Agents & Detergents
- Sanitizers & Disinfectants
- Floor Care Products
- Kitchen & Hospitality Supplies
- Metal Polishes & Degreasers
- Restroom Cleaners
- Aerosols & Specialty Products
- Common Goods (hand sanitizers)
- All Purpose Cleaners
- Janitorial Services Products
- HVAC & Building Systems
- Laboratory Chemicals
- Maintenance Products
- Delimers
- Polishing Products
- Presoak Products

## 🚢 Deployment

### Frontend (Firebase Hosting)
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

### Backend (Google Cloud Run)
```bash
cd backend
gcloud run deploy sds-dashboard-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

Or use Cloud Functions for serverless deployment.

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Next Steps

### Phase 1 - MVP (Weeks 1-4)
- ✅ Project structure setup
- ✅ Backend API with all endpoints
- ✅ Firebase/Google Cloud configuration
- ✅ Database schema and seed data
- ✅ React frontend skeleton with auth
- ⏳ Complete all frontend components (Dashboard, Library, Upload, Detail)
- ⏳ PDF viewer integration
- ⏳ Mobile responsive design
- ⏳ Testing and bug fixes

### Phase 2 - Enhancement (Weeks 5-8)
- OCR integration (Cloud Vision API) for metadata extraction
- Thumbnail generation for PDFs
- Advanced search with Algolia
- Email notifications for expiring documents
- Audit log export (CSV/PDF)
- User management UI (Admin)
- Office management UI (Admin)

### Phase 3 - Migration (Weeks 9-12)
- Bulk document upload script
- Migration from current spreadsheet
- Data validation and cleanup
- User training materials
- Documentation
- Production deployment
- Launch!

## 📞 Support

**Project Sponsor**: pdelaware@salesforce.com  
**Documentation**: See `SDS_Dashboard_Requirements_Global.md` for complete requirements

## 📜 License

Internal Salesforce project - Proprietary

---

**Built with ❤️ for Salesforce Workplace Services**

*Building Trust Through Safety Excellence Worldwide* 🌐
