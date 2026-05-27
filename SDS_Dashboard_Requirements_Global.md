# Salesforce Global SDS Library - Project Requirements

**🌐 Building Trust Through Safety Excellence Worldwide**

---

## Executive Summary

Create a modern, globally-accessible Safety Data Sheet (SDS) management platform for Salesforce Workplace Services, enabling our global workforce to access critical safety information instantly. This cloud-based solution will consolidate chemical safety data across all Salesforce offices worldwide, ensuring regulatory compliance, employee safety, and operational excellence.

**Platform Vision**: Transform workplace chemical safety management through intelligent automation, real-time compliance tracking, and seamless global access aligned with Salesforce's core values of Trust, Customer Success, Innovation, and Equality.

---

## Current State Analysis

### Existing SDS Library Overview
Based on the current spreadsheet system, Salesforce manages SDS documents across multiple global offices including:

**Current Office Locations**:
- 🇳🇱 **Amsterdam** (Edge Stadium)
- 🇺🇸 **Atlanta** (Atlanta Tower)
- 🇺🇸 **Boston** 
- 🇺🇸 **Chicago**
- 🇺🇸 **Dallas**
- 🇺🇸 **Irvine**
- 🇺🇸 **New York**
- 🇺🇸 **San Francisco** (Multiple towers)
- 🇨🇦 **Toronto**
- Additional global locations (scalable architecture)

**Current Document Categories** (extracted from existing library):
- Cleaning Agents & Detergents
- Sanitizers & Disinfectants
- Floor Care Products
- Kitchen & Hospitality Supplies
- Janitorial Services Products
- Metal Polishes & Degreasers
- Restroom Cleaners
- Aerosols & Specialty Products
- Common Goods (hand sanitizers, etc.)
- Laboratory Chemicals
- Maintenance Products
- HVAC & Building Systems

**Current Structure per Office**:
- Office Name (e.g., "Atlanta Tower", "Edge Stadium")
- Specific Location (e.g., "Ohana Floor Kitchen", "Janitorial closet")
- Product Category
- Product Name/SDS Filename

### Pain Points to Address
1. **Accessibility**: Spreadsheet requires manual navigation, limited search capability
2. **Versioning**: No automated tracking of document updates or expirations
3. **Compliance Risk**: Manual monitoring of expiration dates across hundreds of products
4. **Global Scalability**: Difficult to add new offices or standardize across regions
5. **Mobile Access**: Limited field access for facilities teams
6. **Audit Trail**: No automated logging of document access or changes
7. **Multi-language**: Current system English-only, not suitable for global workforce

---

## Business Context

### Organization & Stakeholders
- **Department**: Salesforce Workplace Services - Global Health & Safety
- **Primary Sponsor**: H&S Manager (pdelaware@salesforce.com)
- **Geographic Scope**: Global (currently 9+ offices, expanding)
- **Primary Users**: 
  - H&S Managers and Regional Safety Coordinators (10-15 users)
  - Facilities Management Teams (50+ users)
  - All Salesforce Employees (60,000+ potential users worldwide)
- **Regulatory Framework**: 
  - US: OSHA Hazard Communication Standard (HCS 2012)
  - EU: REACH regulations, CLP (Classification, Labelling and Packaging)
  - Canada: WHMIS 2015
  - Global: GHS (Globally Harmonized System) Rev. 7

### Strategic Alignment
This project aligns with Salesforce's core values:
- **🛡️ Trust**: Ensuring employee safety through accessible, accurate chemical safety data
- **👥 Customer Success**: Supporting internal customers (employees, facilities teams)
- **💡 Innovation**: Leveraging AI/ML for intelligent document management
- **🌍 Equality**: Equal access to safety information for all employees globally
- **🌱 Sustainability**: Digital transformation reducing paper-based processes

---

## Core Requirements

### 1. Global Document Library

#### Browse & Search Experience
**Salesforce Lightning Design System (SLDS) Inspired Interface**

- **Hero Search Bar** (Lightning-style global search)
  - Prominent placement at top of every page
  - Real-time search suggestions (typeahead)
  - Search across: product names, chemicals, manufacturers, CAS numbers, categories, office locations
  - Search results highlighting with snippets
  - Recent searches saved per user
  - Voice search capability (accessibility feature)

- **Smart Filtering System**
  - **Location Filter**: Multi-select dropdown with office/region grouping
    - Americas: Atlanta, Boston, Chicago, Dallas, Irvine, New York, San Francisco, Toronto
    - EMEA: Amsterdam (expandable for future EU offices)
    - APAC: (prepared for future expansion)
  - **Category Filter**: Based on existing categories (Cleaning Agents, Sanitizers, Floor Care, etc.)
  - **Hazard Class Filter**: GHS pictogram selection (Flammable, Corrosive, Toxic, etc.)
  - **Status Filter**: Active, Expiring Soon, Expired, Archived
  - **Date Range Filter**: Upload date, revision date, expiration date
  - **Manufacturer Filter**: Auto-populated from existing documents

- **Document Display Options**
  - **Grid View**: Card-based layout with thumbnails (Salesforce card component style)
  - **List View**: Dense table view with sortable columns (Lightning Datatable)
  - **Map View**: Interactive global office map showing document counts per location
  - Sort by: Alphabetical, Date (newest/oldest), Relevance, Hazard Level, Office

- **Document Cards** (Grid View)
  - Product name (headline)
  - Manufacturer (subheading)
  - Hazard pictograms (visual icons)
  - Office location badges
  - Category tag
  - Status indicator (green: current, yellow: expiring, red: expired)
  - Last updated date
  - Quick actions: View, Download, Share Link

#### Document Metadata Schema
**Enhanced from current spreadsheet structure**

**Core Fields**:
- Product/Chemical Name (required)
- Manufacturer (required)
- Document Language (EN, ES, FR, NL, etc.)
- Document Type (SDS, TDS - Technical Data Sheet, PIS - Product Information Sheet)

**Location Data**:
- Office(s) where used (multi-select)
- Specific locations within office (e.g., "Ohana Floor Kitchen")
- Building/Tower (for multi-building campuses)
- Floor/Department (optional)

**Regulatory Data**:
- CAS Number (Chemical Abstracts Service)
- UN Number (transport classification)
- Hazard Classification (GHS categories array)
- Signal Word (Danger, Warning)
- Hazard Statements (H-codes: H302, H315, etc.)
- Precautionary Statements (P-codes)
- Pictograms (array of GHS symbols)

**Document Lifecycle**:
- Upload Date & Uploader
- Document Revision Date (from SDS)
- Document Expiration Date (auto-calculated: revision date + 3 years)
- Review Date (internal review schedule)
- Version Number
- Supersedes Document ID (for replacements)
- Document Status (Active, Expired, Archived, Under Review)

**Usage & Classification**:
- Primary Category (from existing list)
- Sub-categories/Tags (free-form, auto-suggest)
- Use Case Description
- Application Area (Kitchen, Janitorial, HVAC, Lab, etc.)
- Inventory Status (In-Use, Discontinued, Pending)

**Compliance Tracking**:
- Regulatory Regions (US/OSHA, EU/REACH, Canada/WHMIS)
- Last Compliance Review Date
- Next Compliance Review Date
- Compliance Status (Compliant, Review Required, Non-Compliant)
- Reviewer Notes (internal)

#### Document Viewing Experience
- **In-Browser PDF Viewer** (Google Drive Viewer or PDF.js)
  - Zoom, rotate, full-screen capabilities
  - Page navigation with thumbnails
  - Text search within document
  - Annotation support (admin/editor only)
  - Print option
  - Accessibility: Screen reader compatible
  
- **Mobile-Responsive Design**
  - Touch-optimized controls
  - Pinch-to-zoom
  - Swipe navigation
  - Offline download for field access
  
- **Version History Panel**
  - Timeline view of all document versions
  - Compare versions side-by-side
  - Rollback capability (admin only)
  - Change summary notes

- **Related Documents Section**
  - Same chemical, different manufacturers
  - Same manufacturer, related products
  - Documents for same office location
  - Recently viewed documents

### 2. Intelligent Upload System

#### Upload Interface (Salesforce Lightning Experience)
**Drag-and-Drop Cloud Uploader**

- **Lightning File Upload Component**
  - Drag-and-drop zone with Salesforce cloud icon animation
  - Multi-file selection (bulk upload)
  - Upload queue with progress bars per file
  - Pause/resume capability for large files
  - Supported formats: PDF (primary), DOC/DOCX (auto-convert to PDF)
  - File size limit: 50MB per document (configurable)
  - Virus scanning on upload (Google Cloud Security Scanner)

#### AI-Powered Metadata Extraction
**Leveraging Google Cloud AI**

- **Automatic OCR & Data Extraction** (Cloud Vision API + Document AI)
  - Product/Chemical Name
  - Manufacturer Name & Address
  - Revision Date
  - CAS Number
  - UN Number
  - Hazard Classifications (GHS codes)
  - Signal Words
  - H-codes & P-codes
  - Pictograms (image recognition)
  - Language detection

- **Smart Auto-Population**
  - Pre-fill form fields with extracted data
  - Confidence scoring per field (High, Medium, Low)
  - Manual override for all fields
  - Validation warnings for low-confidence extractions
  - Suggested categories based on product name (ML model)

#### Upload Workflow
**Step 1: File Selection & Upload**
- Select files or drag-and-drop
- Automatic virus scan
- Upload to staging area

**Step 2: AI Processing (Background)**
- OCR text extraction
- Metadata extraction
- Thumbnail generation
- Duplicate detection (flag similar documents)

**Step 3: Metadata Review & Enhancement**
- Review auto-populated fields (highlighted by confidence level)
- Add/edit office locations (multi-select with office search)
- Add specific locations within offices (e.g., "Janitorial closet")
- Select categories and tags
- Set review dates (optional override of auto-calculation)
- Add internal notes

**Step 4: Validation & Submission**
- Required field validation (product name, manufacturer, office, category)
- Duplicate check warning (suggest merging or versioning)
- Compliance check (flag missing hazard info for certain categories)
- Submit for approval (if workflow enabled) or publish immediately

**Step 5: Notification**
- Upload confirmation email to uploader
- Notification to relevant regional coordinators
- Slack/Teams notification (if integrated)

#### Approval Workflow (Optional, Configurable)
- New uploads enter "Pending Review" queue
- Assigned reviewer notified
- Reviewer dashboard shows pending items
- Approve, Request Changes, or Reject actions
- Version comparison if replacing existing document
- Comments thread for reviewer-uploader communication

### 3. User Management & Permissions

#### Authentication
**Salesforce Single Sign-On (SSO) Integration**

- **Google Workspace SSO** (Salesforce corporate accounts)
  - Seamless @salesforce.com email login
  - No separate credentials needed
  - Multi-factor authentication (MFA) enforced
  - Session management aligned with Salesforce policies

- **Salesforce Identity Integration** (future phase)
  - Integrate with Salesforce Employee Directory
  - Auto-populate user profiles (name, title, office, department)
  - Leverage existing org hierarchy for permissions

#### User Roles & Permissions
**Role-Based Access Control (RBAC)**

**1. Global Admin (H&S Manager)**
- Full system access
- User management (create, edit, delete users)
- Upload, edit, delete any document
- Manage office locations and categories
- View all analytics and reports
- Configure system settings (expiration rules, notification templates)
- Audit log access
- Typical users: 1-2 (H&S Manager, Backup Admin)

**2. Regional Coordinator (Safety Leads)**
- Manage documents for assigned region(s)/office(s)
- Upload and edit documents for their offices
- Approve uploads (if workflow enabled) for their region
- View analytics for their assigned offices
- Cannot delete published documents (request admin)
- Cannot manage users or system settings
- Typical users: 8-10 (one per major office/region)

**3. Facilities Editor (On-Site Teams)**
- Upload documents for specific office location(s)
- Edit documents they uploaded
- View all documents (global read access)
- Download documents
- Cannot delete documents
- No analytics access
- Typical users: 30-50 (facilities managers, building coordinators)

**4. Viewer (All Employees)**
- Browse and search all documents
- View and download documents
- No upload or edit permissions
- No analytics access
- Access audit trail of their own downloads (compliance)
- Typical users: 60,000+ (all Salesforce employees)

**5. Guest/Vendor (External, Optional)**
- Limited view access to specific documents
- Temporary time-bound access
- Watermarked downloads
- Full audit trail
- Typical users: Contractors, cleaning service providers

#### Access Control Features
- **Office-Based Permissions**: Editors/Coordinators assigned to specific offices
- **Document-Level Permissions**: Optional restricted documents (lab chemicals, sensitive)
- **IP Whitelisting**: Optional restriction to Salesforce network/VPN
- **Session Management**: 
  - Auto-timeout after 30 minutes inactivity
  - "Remember me" option (extends to 7 days, secure token)
- **Audit Logging**: 
  - Every action logged (view, download, upload, edit, delete, search)
  - User ID, timestamp, IP address, action type, document ID
  - Exportable audit reports (CSV, PDF)
  - Retention: 7 years (compliance requirement)

### 4. Salesforce-Branded UI/UX Design

#### Design System: Lightning Design System (SLDS)
**Official Salesforce Design Language**

- **Color Palette**
  - **Primary**: Salesforce Blue (#0176D3)
  - **Secondary**: Salesforce Cloud Blue (#1B96FF)
  - **Success**: Green (#4BCA81) - for compliant/current documents
  - **Warning**: Orange (#FE9339) - for expiring soon
  - **Error**: Red (#EA001E) - for expired/non-compliant
  - **Neutral**: Gray scale (Salesforce neutrals)
  - **Background**: White (#FFFFFF) with light gray (#F3F2F2) panels

- **Typography**
  - **Primary Font**: Salesforce Sans (official corporate font)
  - **Headings**: Salesforce Sans Bold
  - **Body**: Salesforce Sans Regular
  - **Code/Data**: SF Mono (monospace)
  - **Font Sizes**: SLDS type scale (12px, 14px, 16px, 18px, 20px, 24px, 32px)

- **Components** (SLDS-Based)
  - Lightning Cards for document display
  - Lightning Datatables for list views
  - Lightning Buttons (brand, neutral, destructive)
  - Lightning Badges for categories and status
  - Lightning Pills for office locations
  - Lightning Icons (SLDS icon library)
  - Lightning Modals for document viewer
  - Lightning Path for upload workflow stages
  - Lightning Progress Indicators
  - Lightning Combobox for smart search/filters

#### Navigation Structure
**Salesforce App Experience Model**

**Global Header**
- Salesforce Logo (links to homepage)
- App Name: "Global SDS Library"
- Global Search Bar (prominent, full-width)
- Notification Bell (expiration alerts, upload confirmations)
- User Avatar & Profile Menu
  - My Profile
  - My Uploads
  - Settings
  - Help & Documentation
  - Logout

**Side Navigation** (Collapsible)
- 🏠 **Dashboard** (home icon)
- 📚 **Document Library** (database icon)
- ⬆️ **Upload** (upload icon) - Editors/Admins only
- 📊 **Analytics** (chart icon) - Coordinators/Admins only
- 🔔 **Alerts** (bell icon) - Expiring documents
- 🌍 **Office Locations** (globe icon) - Manage offices (Admin only)
- ⚙️ **Settings** (gear icon) - Admin only
- ❓ **Help** (question icon)

**Breadcrumb Navigation**
- Always visible below header
- Example: Home > Document Library > Cleaning Agents > Document Detail

#### Key Page Layouts

**1. Dashboard (Home Page)**
- **Hero Section**
  - Welcome message: "Welcome back, [Name]" 
  - Quick stats cards: Total Documents, Expiring Soon, Recently Added, Your Uploads
  - Global search bar (large, center)
  
- **At-a-Glance Widgets** (Lightning Cards)
  - 🚨 **Expiring Soon** (next 90 days) - List with countdown badges
  - 📍 **Your Office(s)** - Quick filter to user's assigned offices
  - 📤 **Recent Uploads** (last 30 days) - Timeline view
  - 🔍 **Most Viewed** - Popular documents this month
  - 🌍 **Global Map** - Interactive office map with document counts
  
- **Quick Actions Panel**
  - Upload New Document (button - Editors/Admins)
  - Search by Category (dropdown)
  - View All Documents (button)
  - Download Audit Report (button - Admins)

**2. Document Library Page**
- **Filter Panel** (Left Sidebar - Collapsible)
  - Office Location (tree view: Region > Office)
  - Category (checkboxes)
  - Hazard Class (GHS pictogram selectors)
  - Status (Active, Expiring, Expired)
  - Date Range (date picker)
  - Manufacturer (autocomplete)
  
- **Main Content Area**
  - Sort & View Controls (top-right): Grid/List toggle, Sort dropdown
  - Results Count & Pagination
  - Document Cards/Rows
  - Load More / Infinite Scroll option

**3. Document Detail Page**
- **Left Panel** (Metadata)
  - Product Name (headline)
  - Manufacturer
  - Office Locations (badges)
  - Category tags
  - Hazard Information (pictograms, signal word, H-codes)
  - Dates (Uploaded, Revised, Expires)
  - Status badge
  - Actions: Download, Share, Print, Edit (permissions), Delete (admin)
  
- **Center Panel** (Document Viewer)
  - PDF viewer with controls
  - Full-screen option
  
- **Right Panel** (Collapsible)
  - Version History (timeline)
  - Related Documents (cards)
  - Activity Log (recent views/downloads)

**4. Upload Page**
- **Multi-Step Path Indicator** (Lightning Path)
  - Step 1: Upload Files
  - Step 2: Review Metadata
  - Step 3: Assign Locations
  - Step 4: Confirm & Submit
  
- **Drag-and-Drop Zone** (centered, large)
  - Cloud upload animation
  - File list with progress bars
  
- **Metadata Form** (Step 2)
  - AI-extracted fields highlighted
  - Confidence indicators (icons)
  - Manual override fields
  - Help text for each field

**5. Analytics Dashboard** (Coordinators/Admins)
- **KPI Cards** (top row)
  - Total Documents
  - Documents by Status (donut chart)
  - Average Document Age
  - Compliance Rate
  
- **Charts** (Lightning Charts library)
  - Documents per Office (bar chart)
  - Upload Activity (line chart, last 12 months)
  - Category Distribution (pie chart)
  - Most Viewed Documents (horizontal bar chart)
  - Expiration Timeline (gantt-style view)
  
- **Data Tables**
  - Top Uploaders (user, count)
  - Top Downloaded Documents (title, download count)
  - Missing SDS Report (office, missing categories)

#### Mobile Experience (Progressive Web App)
- **Mobile-First Design**
  - Touch-optimized buttons (min 44x44px)
  - Swipe gestures (document navigation, sidebar toggle)
  - Bottom navigation bar (primary actions)
  - Thumb-friendly action zones
  
- **Offline Capabilities** (PWA)
  - Cache recently viewed documents
  - Offline search of cached documents
  - Queue uploads when offline (sync when online)
  - Offline indicator banner
  
- **Mobile-Specific Features**
  - **Camera Integration**: Scan chemical label barcode/text to search
  - **Location Services**: Auto-filter by nearest Salesforce office
  - **Push Notifications**: Expiration alerts, upload confirmations
  - **Share Sheet**: Share document links via native share

#### Accessibility (WCAG 2.1 AA Compliance)
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: ARIA labels, semantic HTML
- **Color Contrast**: WCAG AA minimum contrast ratios
- **Focus Indicators**: Clear visual focus states
- **Text Resizing**: Support up to 200% zoom
- **Alternative Text**: All icons and images have descriptive alt text
- **Language Support**: HTML lang attribute, multi-language UI
- **Error Handling**: Clear, descriptive error messages
- **Forms**: Proper labels, error states, help text

### 5. Google Cloud Architecture

#### Infrastructure Design
**Scalable, Secure, Global**

**Google Cloud Platform Services**:

**1. Compute & Hosting**
- **Frontend**: 
  - **Firebase Hosting** (primary) - CDN-backed, auto-SSL, instant deploys
  - OR **Google Cloud Run** (containerized React app) - more control, regional deployment
  - Global CDN: Cloud CDN for static assets (images, CSS, JS)
  
- **Backend API**:
  - **Google Cloud Run** (preferred) - Auto-scaling, pay-per-use, containerized
  - Language: Node.js (Express) or Python (FastAPI)
  - OR **Cloud Functions** (Gen 2) for microservices architecture
  - Regions: us-central1 (primary), europe-west1 (secondary for EU data residency)

**2. Data Storage**
- **Document Storage**: **Google Cloud Storage**
  - Bucket structure: 
    ```
    /sds-library-prod/
      /americas/
        /atlanta/
          /cleaning-agents/
          /sanitizers/
        /san-francisco/
      /emea/
        /amsterdam/
      /apac/
      /archived/ (expired documents, 30-year retention)
    ```
  - Storage Class: Standard (active docs), Nearline (1-year old), Coldline (archived)
  - Lifecycle Rules: Auto-transition based on age, soft-delete retention (30 days)
  - Versioning: Enabled (retain all document versions)
  - Access: Signed URLs (temporary, expiring links for downloads)
  
- **Database**: **Google Cloud Firestore** (preferred) or **Cloud SQL PostgreSQL**
  - **Firestore Advantages**: 
    - Real-time updates (live dashboard)
    - Offline support (mobile PWA)
    - Auto-scaling
    - Better for global multi-region
  - **Cloud SQL Advantages**:
    - Complex relational queries
    - Full SQL support
    - Better for large-scale analytics
  - **Recommendation**: Firestore for primary app, Cloud SQL for analytics warehouse

**3. AI & Machine Learning**
- **Cloud Vision API**: OCR and text extraction from SDS PDFs
- **Document AI**: Specialized SDS document parsing (train custom processor)
- **Cloud Natural Language API**: 
  - Auto-categorization of documents
  - Hazard classification extraction
  - Language detection
- **Cloud Translation API**: Future multi-language support
- **Vertex AI**: Custom ML models for duplicate detection, hazard prediction

**4. Security & Identity**
- **Google Cloud Identity Platform** / **Firebase Auth**
  - SAML 2.0 integration with Salesforce Google Workspace
  - Session management, token refresh
  - MFA enforcement
  
- **Secret Manager**: Store API keys, database credentials securely
- **Cloud Key Management Service (KMS)**: Encryption key management
- **Cloud Security Scanner**: Vulnerability scanning
- **Cloud Armor**: DDoS protection, WAF (Web Application Firewall)

**5. Monitoring & Operations**
- **Cloud Logging**: Centralized application logs, 7-year retention
- **Cloud Monitoring**: 
  - Uptime checks (99.9% SLA target)
  - Performance metrics (latency, error rates)
  - Custom dashboards (SDS-specific metrics)
  - Alerting (PagerDuty/Slack integration)
  
- **Cloud Trace**: Distributed tracing for API performance
- **Error Reporting**: Automatic error grouping and alerts

**6. Data Processing & Workflows**
- **Cloud Functions** (Event-Driven):
  - `onUpload`: Triggered on new document → OCR, metadata extraction, thumbnail
  - `onExpiringSoon`: Daily cron → check expiring documents → send alerts
  - `onDocumentView`: Log access for audit trail
  
- **Cloud Scheduler**: Cron jobs
  - Daily: Check expiring documents
  - Weekly: Generate compliance reports
  - Monthly: Archive old versions to Coldline storage
  
- **Cloud Tasks**: Async job queue
  - Bulk uploads
  - PDF processing
  - Email notifications

**7. Networking**
- **Cloud Load Balancer**: Global load balancing, HTTPS termination
- **Cloud CDN**: Cache static assets globally
- **Cloud VPN** / **Cloud Interconnect**: Private connectivity to Salesforce network (optional)
- **Private Service Connect**: Secure connection between Cloud Run and Firestore

#### Data Architecture

**Firestore Collections Schema**:

```
/documents/{documentId}
  - id: string (auto-generated)
  - productName: string
  - manufacturer: string
  - casNumber: string
  - language: string (ISO 639-1)
  - documentType: string (SDS, TDS, PIS)
  - fileUrl: string (Cloud Storage signed URL)
  - fileStoragePath: string
  - fileSize: number (bytes)
  - thumbnailUrl: string
  - uploadDate: timestamp
  - uploadedBy: string (user ID)
  - revisionDate: timestamp (from SDS)
  - expirationDate: timestamp (auto-calculated)
  - reviewDate: timestamp (internal)
  - status: string (active, expiring, expired, archived)
  - version: number
  - supersedesDocumentId: string (reference to previous version)
  - offices: array<string> (office IDs)
  - specificLocations: array<string> (e.g., "Ohana Floor Kitchen")
  - category: string (primary category)
  - tags: array<string> (sub-categories)
  - hazardClassifications: array<string> (GHS codes)
  - pictograms: array<string> (GHS pictogram codes)
  - signalWord: string (Danger, Warning)
  - hCodes: array<string> (Hazard codes)
  - pCodes: array<string> (Precautionary codes)
  - regulatoryRegions: array<string> (OSHA, REACH, WHMIS)
  - complianceStatus: string
  - complianceLastReviewed: timestamp
  - viewCount: number
  - downloadCount: number
  - searchKeywords: array<string> (for full-text search)
  - metadata: map<string, any> (flexible future fields)
  - createdAt: timestamp
  - updatedAt: timestamp
  - isActive: boolean (soft delete flag)

/offices/{officeId}
  - id: string
  - name: string (e.g., "Atlanta Tower")
  - region: string (Americas, EMEA, APAC)
  - country: string
  - city: string
  - address: string
  - timezone: string
  - coordinates: geopoint (for map view)
  - documentCount: number (cached)
  - isActive: boolean

/users/{userId}
  - id: string (matches Salesforce email)
  - email: string
  - name: string
  - role: string (admin, regional_coordinator, facilities_editor, viewer)
  - assignedOffices: array<string> (office IDs)
  - department: string
  - title: string
  - profilePhotoUrl: string
  - lastLogin: timestamp
  - notificationPreferences: map<string, boolean>
  - createdAt: timestamp

/auditLog/{logId}
  - id: string (auto-generated)
  - userId: string
  - action: string (view, download, upload, edit, delete, search)
  - documentId: string (nullable for search actions)
  - timestamp: timestamp
  - ipAddress: string
  - userAgent: string
  - details: map<string, any> (action-specific metadata)

/notifications/{notificationId}
  - id: string
  - userId: string
  - type: string (expiring_document, upload_confirmation, approval_required)
  - title: string
  - message: string
  - documentId: string (nullable)
  - isRead: boolean
  - createdAt: timestamp
  - expiresAt: timestamp

/categories/{categoryId}
  - id: string
  - name: string
  - description: string
  - icon: string (SLDS icon name)
  - documentCount: number
  - parentCategory: string (nullable, for subcategories)

/complianceReports/{reportId}
  - id: string
  - reportType: string (expiring_documents, missing_sds, compliance_status)
  - generatedBy: string (user ID)
  - generatedAt: timestamp
  - parameters: map<string, any> (filters used)
  - results: array<map> (report data)
  - exportUrl: string (PDF/CSV download link)
```

**Indexing Strategy** (Firestore composite indexes):
- `(status, expirationDate)` - for expiring documents queries
- `(offices, category, status)` - for filtered library views
- `(uploadedBy, uploadDate DESC)` - for user's upload history
- `(searchKeywords, status)` - for full-text search (or use Algolia)

**Alternative: Algolia for Advanced Search**
- Sync Firestore documents to Algolia index
- Instant search with typo tolerance
- Faceted search (filters)
- Relevance ranking
- Multi-language search

#### API Design

**RESTful API Endpoints**:

**Documents**
- `GET /api/v1/documents` - List documents (with filters, pagination)
  - Query params: `office`, `category`, `status`, `search`, `page`, `limit`, `sort`
- `GET /api/v1/documents/:id` - Get document details
- `POST /api/v1/documents` - Upload new document (multipart/form-data)
- `PUT /api/v1/documents/:id` - Update document metadata
- `DELETE /api/v1/documents/:id` - Soft delete document (admin only)
- `GET /api/v1/documents/:id/download` - Get signed download URL
- `GET /api/v1/documents/:id/versions` - Get version history
- `POST /api/v1/documents/:id/approve` - Approve pending document (coordinator/admin)

**Offices**
- `GET /api/v1/offices` - List all offices
- `GET /api/v1/offices/:id` - Get office details
- `POST /api/v1/offices` - Create office (admin only)
- `PUT /api/v1/offices/:id` - Update office (admin only)
- `GET /api/v1/offices/:id/documents` - Get documents for office

**Users**
- `GET /api/v1/users` - List users (admin/coordinator)
- `GET /api/v1/users/:id` - Get user profile
- `PUT /api/v1/users/:id` - Update user (admin only)
- `GET /api/v1/users/:id/uploads` - Get user's upload history
- `GET /api/v1/users/:id/notifications` - Get user notifications
- `PUT /api/v1/users/:id/notifications/:notificationId` - Mark notification as read

**Analytics**
- `GET /api/v1/analytics/overview` - Dashboard KPIs
- `GET /api/v1/analytics/documents-by-office` - Document counts per office
- `GET /api/v1/analytics/upload-activity` - Upload timeline data
- `GET /api/v1/analytics/top-viewed` - Most viewed documents
- `GET /api/v1/analytics/expiring` - Expiring documents report

**Search**
- `GET /api/v1/search` - Global search (documents, offices, categories)
  - Query param: `q` (search term)
- `GET /api/v1/search/suggest` - Search autocomplete suggestions

**Audit**
- `GET /api/v1/audit-log` - Get audit log (admin only)
  - Query params: `userId`, `action`, `startDate`, `endDate`, `page`, `limit`
- `POST /api/v1/audit-log/export` - Export audit log (CSV/PDF)

**Categories**
- `GET /api/v1/categories` - List all categories
- `GET /api/v1/categories/:id/documents` - Documents in category

**API Security**:
- **Authentication**: Bearer token (Firebase ID token) in `Authorization` header
- **Rate Limiting**: 
  - Viewers: 1000 requests/hour
  - Editors: 5000 requests/hour
  - Admins: 10000 requests/hour
- **Request Validation**: JSON schema validation for POST/PUT
- **CORS**: Restrict to Salesforce domains
- **API Versioning**: `/v1/` prefix, maintain backwards compatibility

### 6. Compliance & Regulatory Features

#### Expiration Management
**Proactive Compliance Tracking**

- **Automated Expiration Calculation**
  - Default: SDS expiration = Revision Date + 3 years (OSHA standard)
  - Configurable per regulatory region (REACH: 5 years, WHMIS: 3 years)
  - Manual override for specific documents
  - Internal review cycle (optional, separate from expiration)

- **Expiration Alerts System**
  - **90-Day Alert** (Yellow Warning):
    - Email to document uploader
    - Email to regional coordinator for that office
    - Notification in dashboard "Expiring Soon" widget
    - Document badge: "Expiring in 90 days"
  - **60-Day Alert** (Orange Warning):
    - Repeat email notifications
    - Escalation to Global Admin
    - Slack/Teams alert (if integrated)
  - **30-Day Alert** (Red Warning):
    - Daily email reminders
    - Dashboard banner alert
    - Document badge: "Expiring in 30 days - Action Required"
  - **Expired** (Red Error):
    - Document status changed to "Expired"
    - Prominent red badge on document
    - Removed from default library view (requires filter toggle)
    - Cannot be used for new office assignments
    - Notification to all users who recently viewed/downloaded

- **Expiration Dashboard** (Coordinators/Admins)
  - Visual timeline (gantt chart) of expiring documents
  - Sortable by expiration date, office, category
  - Bulk actions: Request updates from manufacturers
  - Export expiring documents report (Excel/PDF)

#### Multi-Regulatory Support
**Global Compliance Framework**

- **Regulatory Region Tags** (per document)
  - 🇺🇸 **OSHA (US)**: HCS 2012 standard
  - 🇪🇺 **REACH (EU)**: CLP Regulation (EC) No 1272/2008
  - 🇨🇦 **WHMIS 2015 (Canada)**: Hazardous Products Regulations (HPR)
  - 🌍 **GHS (Global)**: Rev. 7 alignment
  - Future: 🇬🇧 UK REACH, 🇦🇺 Australia, 🇯🇵 Japan, 🇨🇳 China

- **Region-Specific Validation**
  - US (OSHA): Require 16-section SDS format
  - EU (REACH): Validate registration numbers for substances
  - Canada (WHMIS): Supplier identifier, WHMIS classification
  - Warn if document doesn't meet region's requirements

- **Compliance Status Tracking**
  - Per-document compliance status:
    - ✅ **Compliant**: Meets all requirements for assigned regions
    - ⚠️ **Review Required**: Missing info or approaching expiration
    - ❌ **Non-Compliant**: Missing critical data or expired
  - Compliance dashboard showing % compliance per office/region
  - Automatic quarterly compliance reports

#### Audit Trail & Reporting
**Complete Activity Logging**

- **Logged Actions**:
  - Document views (user, timestamp, document, duration)
  - Downloads (user, timestamp, document, IP address)
  - Uploads (uploader, timestamp, document, metadata changes)
  - Edits (editor, timestamp, fields changed, old vs new values)
  - Deletions (admin, timestamp, document, reason)
  - Searches (user, timestamp, search term, results count)
  - Login/Logout (user, timestamp, IP, user agent)
  - Permission changes (admin, timestamp, user affected, old vs new role)

- **Audit Log Features**:
  - Real-time logging (no batch delays)
  - Immutable log entries (append-only)
  - Tamper-evident (checksums, signed entries)
  - 7-year retention (OSHA requirement)
  - Full-text search within audit log
  - Export to CSV, PDF, JSON

- **Compliance Reports** (Scheduled & On-Demand)
  - **Monthly SDS Inventory Report**: All active documents per office
  - **Quarterly Compliance Report**: % compliant, expiring, expired, missing
  - **Annual Audit Report**: Full activity summary, user stats, document lifecycle
  - **Ad-Hoc Reports**:
    - Documents per office
    - Documents by category
    - User activity summary
    - Missing SDS report (chemicals in use without SDS)
    - Duplicate documents report

- **Data Retention Policy**
  - **Active Documents**: Indefinite (as long as chemical in use)
  - **Expired Documents**: 30 years after discontinuation (OSHA requirement)
  - **Audit Logs**: 7 years
  - **User Data**: While employed + 1 year after departure

### 7. Notification & Communication System

#### Email Notifications
**Automated & Personalized**

- **Notification Types**:
  1. **Upload Confirmation**: Document successfully uploaded
  2. **Approval Request**: New document pending your review
  3. **Approval Granted**: Your uploaded document was approved
  4. **Approval Rejected**: Your upload needs revision (with comments)
  5. **Expiration Warnings**: 90/60/30-day alerts
  6. **Document Expired**: SDS you manage has expired
  7. **New Document Available**: New SDS added for your office
  8. **Document Updated**: SDS you viewed was updated (new version)
  9. **Access Granted**: You've been given access/permissions
  10. **System Maintenance**: Scheduled downtime alerts

- **Email Design**:
  - Salesforce-branded email templates
  - Responsive HTML (mobile-friendly)
  - Clear call-to-action buttons
  - Unsubscribe options (per notification type)
  - Plain-text alternative (accessibility)

- **Notification Preferences** (User Settings)
  - Toggle on/off per notification type
  - Frequency: Real-time, Daily Digest, Weekly Summary
  - Delivery method: Email, In-App, Both
  - Office-specific subscriptions (only get alerts for your offices)

#### In-App Notifications
**Real-Time Dashboard Alerts**

- **Notification Bell** (Header)
  - Badge count (unread notifications)
  - Dropdown list of recent notifications
  - Mark as read, dismiss, or view document
  - Real-time updates (Firestore listeners)

- **Dashboard Alerts**
  - Banner alerts for critical issues (e.g., multiple expired documents)
  - Dismissible, per-user tracking
  - Persistent until action taken

#### Integration Options (Future Phase)
- **Slack Integration**:
  - Post expiration alerts to `#health-safety` channel
  - Bot commands: `/sds search [product]`, `/sds expiring`
  - Direct message notifications to document owners
  
- **Microsoft Teams Integration**:
  - Similar to Slack, for offices using Teams
  - Adaptive cards for rich notifications
  
- **SMS Alerts** (Critical Only):
  - Emergency notifications (e.g., recalled chemicals)
  - Opt-in only, for critical admins

### 8. Multi-Language & Global Features

#### Language Support
**Inclusive Design for Global Workforce**

- **UI Language Options** (Phase 1: MVP)
  - 🇺🇸 **English** (default)
  - 🇪🇸 **Spanish** (US/Latin America)
  - 🇳🇱 **Dutch** (Netherlands)
  - 🇫🇷 **French** (Canada, future EU expansion)
  
- **UI Language Options** (Phase 2: Expansion)
  - 🇩🇪 German, 🇮🇹 Italian, 🇯🇵 Japanese, 🇨🇳 Simplified Chinese, 🇰🇷 Korean
  
- **Language Switching**
  - User profile setting (persistent)
  - Header language selector (dropdown)
  - Auto-detect from browser locale (first visit)
  - Applies to all UI text, emails, reports

- **Document Language Metadata**
  - Each SDS tagged with language (EN, ES, NL, FR, etc.)
  - Filter documents by language
  - Show language badge on document cards
  - Support multi-language versions of same SDS (linked)

#### Localization Features
- **Date/Time Formats**: Locale-specific (MM/DD/YYYY vs DD/MM/YYYY)
- **Number Formats**: Commas vs periods for decimals
- **Currency**: Display Google Cloud costs in user's local currency (future)
- **Timezone Support**: 
  - All dates stored in UTC
  - Display in user's office timezone or browser timezone (preference)
  - Timezone indicators on timestamps

#### Regional Data Residency (Advanced)
- **EU Data Residency** (GDPR Compliance)
  - Option to store EU office documents in `europe-west1` region
  - EU-specific Firestore instance
  - Separate Cloud Storage bucket in EU
  - API routes to correct regional backend
  - User data for EU employees stored in EU

- **Data Sovereignty**
  - Canada: Store Toronto data in `northamerica-northeast1` (Montreal)
  - Future: APAC regional data storage
  - Cross-region search aggregation (with privacy controls)

### 9. Performance & Scalability

#### Performance Targets
- **Page Load Time**: < 2 seconds (desktop), < 3 seconds (mobile 4G)
- **Search Response**: < 1 second (95th percentile)
- **Document Upload**: 
  - Small files (<5MB): < 5 seconds total (upload + processing)
  - Large files (25-50MB): < 30 seconds, with progress indicator
- **PDF Viewer Load**: < 2 seconds (first page render)
- **API Latency**: < 200ms (median), < 500ms (95th percentile)

#### Optimization Strategies
- **Frontend**:
  - Code splitting (lazy load routes)
  - Tree shaking (remove unused code)
  - Image optimization (WebP, lazy loading)
  - CDN caching (static assets: 1 year TTL)
  - Service worker (PWA offline cache)
  - Virtual scrolling (large document lists)
  
- **Backend**:
  - Database query optimization (indexes)
  - Caching layer (Redis/Memorystore for frequent queries)
  - API response caching (5-minute TTL for list views)
  - Cloud CDN for API responses (GET only)
  - Background processing (async uploads, OCR)
  - Batch operations (bulk uploads via Cloud Tasks queue)
  
- **Database**:
  - Firestore: Denormalize for read performance (documentCount per office)
  - Composite indexes for common queries
  - Pagination (limit 50 results per page, cursor-based)
  - Aggregation queries (use Firestore COUNT aggregations)
  
- **Storage**:
  - Cloud Storage signed URLs (avoid backend proxy)
  - Thumbnail generation (200x200px previews)
  - PDF compression (reduce file size without quality loss)
  - Lazy loading images (documents list)

#### Scalability Plan
- **Current Scale** (MVP - Year 1)
  - Documents: 1,000-2,000
  - Users: 100-500 active monthly
  - Offices: 10-15
  - Storage: 50-100 GB
  
- **Growth Scale** (Year 2-3)
  - Documents: 10,000+
  - Users: 1,000+ active monthly
  - Offices: 30+ (global expansion)
  - Storage: 500 GB - 1 TB
  
- **Auto-Scaling Configuration**:
  - Cloud Run: 0-1000 instances, scale based on CPU/memory
  - Firestore: Auto-scaling (managed)
  - Cloud Storage: Unlimited (pay-per-use)
  - Cloud CDN: Global auto-scaling

#### Monitoring & Alerting
- **Uptime Monitoring**:
  - Target: 99.9% uptime (< 8.7 hours downtime/year)
  - Health check endpoints: `/api/health`, `/api/status`
  - Uptime checks every 1 minute (Cloud Monitoring)
  - Alerts: PagerDuty for admins, Slack for team
  
- **Performance Monitoring**:
  - Real User Monitoring (RUM): Track actual user page load times
  - Synthetic monitoring: Automated tests from multiple regions
  - Cloud Trace: Distributed tracing for slow API calls
  - Alerts: Latency > 2s (P95), Error rate > 1%
  
- **Business Metrics**:
  - Documents uploaded per day
  - Search queries per day
  - Active users per day/week/month
  - Top documents (views, downloads)
  - Expiring documents trend

### 10. Security & Privacy

#### Data Protection
- **Encryption**:
  - **At Rest**: Google Cloud Storage default encryption (AES-256)
  - **In Transit**: HTTPS/TLS 1.3 (enforced)
  - **Database**: Firestore/Cloud SQL encryption at rest
  - **Backups**: Encrypted backups
  
- **Secrets Management**:
  - API keys, credentials in Secret Manager (never in code)
  - Automatic secret rotation (90-day cycle)
  - Least-privilege access to secrets
  
- **Data Anonymization**:
  - Audit log exports: Option to anonymize user IDs
  - Analytics: Aggregate data only, no PII in reports

#### Application Security
- **Input Validation**:
  - Server-side validation for all API inputs
  - File upload scanning (virus/malware detection)
  - SQL injection prevention (parameterized queries, Firestore safe by default)
  - XSS prevention (sanitize user inputs, CSP headers)
  
- **Authentication & Authorization**:
  - MFA enforced (via Salesforce SSO)
  - Role-based access control (RBAC)
  - Principle of least privilege
  - Session timeout (30 minutes)
  - JWT token expiration (1 hour, refresh token flow)
  
- **API Security**:
  - Rate limiting (prevent abuse)
  - CORS restrictions (Salesforce domains only)
  - API key rotation
  - Request signing (HMAC validation for critical operations)
  
- **DDoS Protection**:
  - Google Cloud Armor (WAF)
  - Rate limiting per IP
  - Challenge for suspicious traffic (CAPTCHA)

#### Vulnerability Management
- **Dependency Scanning**:
  - Automated npm/pip dependency checks (Snyk, Dependabot)
  - Monthly security patches
  - Zero critical vulnerabilities policy
  
- **Code Security**:
  - Static analysis (ESLint, Bandit)
  - Secret scanning (prevent commits with API keys)
  - Code review for all changes (required before merge)
  
- **Penetration Testing**:
  - Annual third-party security audit
  - Quarterly internal penetration tests
  - Bug bounty program (optional, for serious vulnerabilities)

#### Privacy Compliance
- **GDPR (EU)**:
  - Data processing agreement (DPA)
  - User consent for non-essential cookies
  - Right to access (user can export their data)
  - Right to erasure (user can request data deletion)
  - Data portability (export in machine-readable format)
  
- **CCPA (California)**:
  - Privacy policy disclosure
  - Opt-out of data sale (N/A - we don't sell data)
  - Right to know what data we collect
  
- **SOC 2 Type II** (Future):
  - Salesforce standard for third-party apps
  - Annual SOC 2 audit
  - Secure development lifecycle (SDLC)

### 11. Migration & Deployment

#### Data Migration Plan
**Migrating Current Spreadsheet to New System**

**Phase 1: Preparation (Week 1)**
- Export current SDS Library spreadsheet to CSV (one file per office sheet)
- Clean data: Remove duplicates, normalize product names, fill missing data
- Organize physical SDS files into folder structure matching offices
- Assign document owners (uploaders) for each office

**Phase 2: Office Setup (Week 1)**
- Create all office records in new system:
  - Amsterdam, Atlanta, Boston, Chicago, Dallas, Irvine, New York, San Francisco, Toronto
- Define categories (map from existing "Category" column)
- Create user accounts (admins, regional coordinators, editors)
- Configure permissions per user

**Phase 3: Bulk Document Upload (Week 2-3)**
- **Automated Migration Script**:
  - Input: CSV + PDF files in folder structure
  - For each row in CSV:
    1. Match PDF file by Product Name
    2. Upload PDF to Cloud Storage (correct office folder)
    3. Run OCR/metadata extraction
    4. Create Firestore document record
    5. Map spreadsheet fields to database schema:
       - Office → offices array
       - Location → specificLocations array
       - Category → category + tags
       - Product Name → productName + file reference
    6. Assign default uploader (regional coordinator)
    7. Set uploadDate to migration date
    8. Flag as "migrated" (metadata field)
  - Error handling: Log failed uploads for manual review
  - Progress tracking: Real-time dashboard showing migration progress
  
- **Manual Review Queue**:
  - Documents with low OCR confidence
  - Missing PDFs (only spreadsheet entry)
  - Duplicate product names
  - Unclear office mapping

**Phase 4: Validation (Week 3-4)**
- **Data Quality Checks**:
  - Verify all documents uploaded (compare counts)
  - Check metadata accuracy (spot-check 10% sample)
  - Validate file accessibility (test downloads)
  - Confirm office assignments correct
  
- **User Acceptance Testing (UAT)**:
  - Regional coordinators test their office documents
  - Facilities teams test search and download
  - Admins test analytics and reporting
  - Mobile testing (iOS, Android)

**Phase 5: Training & Rollout (Week 4)**
- **Training Materials**:
  - Video tutorials (5-10 minutes each):
    - How to Search for an SDS
    - How to Upload a New SDS
    - How to Manage Expiring Documents
  - Quick reference guides (PDF, 1-pagers)
  - FAQ document
  - Live Q&A sessions (Zoom, per region)
  
- **Soft Launch**:
  - Enable access for Regional Coordinators first (1 week early)
  - Fix any issues before full rollout
  - Gather feedback, make adjustments
  
- **Full Launch**:
  - Enable Viewer access for all employees
  - Announcement email (with tutorial link)
  - Slack/Teams announcement
  - Ohana post (Salesforce internal community)
  - Decommission old spreadsheet (read-only archive)

#### Deployment Strategy

**CI/CD Pipeline** (Google Cloud Build)
- **Source Control**: git.soma.salesforce.com
- **Branches**:
  - `main`: Production
  - `staging`: Pre-production testing
  - `develop`: Active development
  
- **Automated Build Process**:
  1. Code commit → Trigger Cloud Build
  2. Run tests (unit, integration)
  3. Run linters (ESLint, Prettier)
  4. Build Docker container (backend) or bundle React app (frontend)
  5. Push to Artifact Registry
  6. Deploy to Cloud Run (staging environment)
  7. Run smoke tests
  8. If tests pass, tag as release candidate
  
- **Deployment to Production**:
  - Manual approval required (admin/tech lead)
  - Blue-green deployment (zero downtime)
  - Health checks before traffic switch
  - Automatic rollback on errors
  - Deployment notifications (Slack)

**Environments**:
- **Development**: `dev.sds-library.internal.salesforce.com`
  - Branch: `develop`
  - Database: Firestore dev instance
  - Storage: `sds-library-dev` bucket
  - For active development, may be unstable
  
- **Staging**: `staging.sds-library.internal.salesforce.com`
  - Branch: `staging`
  - Database: Firestore staging (copy of prod structure)
  - Storage: `sds-library-staging` bucket
  - UAT, pre-release testing
  - Refresh data from prod monthly
  
- **Production**: `sds-library.salesforce.com` (or internal domain)
  - Branch: `main`
  - Database: Firestore prod instance
  - Storage: `sds-library-prod` bucket
  - 99.9% uptime SLA

**Database Migrations**:
- Firestore schema changes via migration scripts
- Versioned migrations (track applied migrations)
- Test migrations in staging first
- Backup before migration
- Rollback plan for each migration

**Backup & Disaster Recovery**:
- **Automated Daily Backups**:
  - Firestore: Export to Cloud Storage daily (midnight UTC)
  - Cloud Storage: Object versioning enabled
  - Retention: 30 days daily, 12 months monthly
  
- **Disaster Recovery Plan**:
  - Recovery Time Objective (RTO): < 4 hours
  - Recovery Point Objective (RPO): < 24 hours (daily backup)
  - Documented restore procedures
  - Quarterly DR drills

### 12. Future Enhancements (Roadmap)

#### Phase 2 Features (3-6 months post-launch)
- **QR Code System**:
  - Generate QR code for each SDS
  - Print labels for chemical containers
  - Scan QR with mobile to view SDS instantly
  - Track scans (which containers accessed when)
  
- **Chemical Inventory Integration**:
  - Track quantities of chemicals on-site
  - Link SDS to inventory records
  - Alerts when inventory reaches reorder threshold
  - Automatic SDS check when adding new chemical to inventory
  
- **Advanced Analytics**:
  - Predictive expiration (ML model predicts delays in manufacturer updates)
  - Usage analytics (which products used most per office)
  - Cost tracking (chemical spend per office, if inventory integrated)
  - Hazard heat map (offices with most high-hazard chemicals)

#### Phase 3 Features (6-12 months post-launch)
- **Training Module Integration**:
  - Link SDS to required safety training courses
  - Track who completed training for each hazard class
  - Require training completion before accessing high-hazard SDS
  - Certification management
  
- **Incident Reporting Integration**:
  - Link SDS to incident reports (if chemical-related injury)
  - Pre-fill incident forms with chemical data
  - Trend analysis (correlate incidents with chemical usage)
  
- **Mobile App** (Native iOS/Android):
  - Faster than PWA
  - Barcode scanner for chemical labels
  - Offline mode with document sync
  - Push notifications
  - Camera search (take photo of label → find SDS)

#### Phase 4 Features (12+ months post-launch)
- **AI-Powered Hazard Recommendations**:
  - Analyze SDS hazard data
  - Recommend safer chemical alternatives
  - Suggest PPE (Personal Protective Equipment) based on hazards
  - Auto-generate safety protocols per chemical
  
- **Vendor Portal**:
  - External portal for chemical suppliers/manufacturers
  - Vendors upload updated SDS directly
  - Automatic notification to relevant offices
  - Vendor performance tracking (timeliness of updates)
  
- **Integration with Salesforce Core Platform**:
  - Sync with Salesforce Employee Directory (real-time)
  - Use Salesforce Chatter for collaboration
  - Salesforce Reports & Dashboards for analytics
  - Salesforce Mobile app integration
  
- **AR (Augmented Reality) Features**:
  - Point phone at chemical label → overlay safety info
  - AR training simulations for hazard response
  - Virtual tours of chemical storage areas

---

## Success Metrics & KPIs

### Launch Metrics (First 90 Days)
- ✅ **Migration Completion**: 100% of current SDS documents migrated (target: 1,500-2,000 docs)
- ✅ **User Adoption**: 80% of employees access system at least once
- ✅ **Active Users**: 200+ unique users per month
- ✅ **Search Performance**: <1 second average response time
- ✅ **Uptime**: 99.5% uptime (grace period for optimization)
- ✅ **User Satisfaction**: 4.0+ / 5.0 rating (post-launch survey)

### Ongoing Metrics (Monthly/Quarterly)
- **Compliance**:
  - 📊 % of documents compliant (target: 95%+)
  - 📊 Zero expired documents in active circulation (target: 0)
  - 📊 Average time to update expiring documents (target: <30 days before expiration)
  
- **Usage**:
  - 📊 Monthly active users (target: grow 10% per quarter)
  - 📊 Documents viewed per month
  - 📊 Documents downloaded per month
  - 📊 Average search time to find document (target: <30 seconds)
  
- **Performance**:
  - 📊 Page load time (target: <2 seconds, P95)
  - 📊 API latency (target: <200ms median)
  - 📊 Uptime (target: 99.9%)
  
- **Efficiency**:
  - 📊 Time saved vs. spreadsheet system (estimated 70% reduction in search time)
  - 📊 Documents uploaded per month (track growth)
  - 📊 % of uploads requiring manual correction (target: <10% as OCR improves)

### Business Impact (Annual)
- 💰 **Cost Avoidance**: Prevent compliance fines (OSHA fines: $7,000-$70,000 per violation)
- 💰 **Time Savings**: Reduce admin time by 50% (H&S team)
- 💰 **Risk Reduction**: Zero chemical-related incidents due to missing SDS
- 💰 **Scalability**: Support 2x document growth and 3x office expansion with no additional headcount

---

## Budget & Resources

### Google Cloud Platform Costs (Monthly Estimates)

**Storage & Hosting**:
- Cloud Storage (Standard): 100 GB × $0.02 = **$2**
- Cloud Storage (Nearline, archived): 200 GB × $0.01 = **$2**
- Firebase Hosting or Cloud Run (frontend): **$10-20**
- Cloud Run (backend API): 1M requests × $0.40/M = **$10-30** (scales with usage)

**Database**:
- Firestore: Estimated **$30-50**/month (based on 2K docs, 10K reads/day, 500 writes/day)
  - Document reads: $0.06 per 100K
  - Document writes: $0.18 per 100K
  - Storage: $0.18/GB
- Alternative Cloud SQL (PostgreSQL): **$50-100**/month (db-f1-micro instance)

**AI & Processing**:
- Cloud Vision API (OCR): 100 pages/month × $1.50/1,000 = **$1-5** (ongoing, migration spike)
- Document AI (custom processor): **$10-30** (if trained custom model)
- Cloud Functions (event-driven): Minimal (**<$5**, within free tier)

**Networking & Security**:
- Cloud Load Balancer: **$18/month** base + $0.008/GB egress
- Cloud CDN: 100 GB egress × $0.08 = **$8**
- Cloud Armor (WAF): **$5** base + $1 per policy rule

**Monitoring & Operations**:
- Cloud Logging: 10 GB/month × $0.50 = **$5**
- Cloud Monitoring: Within free tier (**$0**)

**Total Estimated Monthly Cost**:
- **MVP (Year 1)**: **$100-150/month** (low usage)
- **Growth (Year 2)**: **$200-300/month** (2-3x usage)
- **Mature (Year 3+)**: **$300-500/month** (10K+ docs, 1K+ active users)

**Note**: Actual costs scale with usage (storage, API calls, bandwidth). Costs are pay-per-use, so lower usage = lower cost.

### Development Resources

**Internal Team (Preferred)**:
- 1 × Frontend Developer (React/Vue, Lightning Design System)
- 1 × Backend Developer (Node.js/Python, Google Cloud expertise)
- 1 × DevOps/Cloud Engineer (Google Cloud Platform, CI/CD)
- 1 × Product Manager (H&S domain knowledge, requirements)
- 0.5 × UX/UI Designer (Salesforce brand guidelines, SLDS)
- 0.5 × QA Engineer (testing, UAT coordination)

**External Vendors (Alternative)**:
- Salesforce-preferred cloud development partner
- Fixed-price contract for MVP (12-week delivery)
- Estimated cost: $100K-150K (full development, includes migration)
- Ongoing support/maintenance: $2K-5K/month

**Hybrid Approach** (Recommended):
- Internal product management and design
- External development team for speed
- Internal cloud team for infrastructure and security review
- Estimated cost: $80K-120K (shared ownership)

---

## Timeline & Milestones

### Development Timeline (12 Weeks)

**Week 1-2: Discovery & Planning**
- ✅ Stakeholder interviews (regional coordinators)
- ✅ Finalize requirements (review this document)
- ✅ UX/UI design mockups (high-fidelity)
- ✅ Google Cloud project setup (prod, staging, dev)
- ✅ Database schema design
- ✅ API design documentation
- ✅ Project repository setup (git.soma.salesforce.com)
- Milestone: **Design Approval**

**Week 3-4: Backend Development (Sprint 1)**
- ✅ Set up Cloud Run backend (Node.js/Python)
- ✅ Firestore database implementation
- ✅ Cloud Storage integration
- ✅ Authentication (Firebase Auth + Google SSO)
- ✅ Core API endpoints (documents CRUD, offices, users)
- ✅ File upload handling
- ✅ Basic tests (unit tests for API)
- Milestone: **API v1 Complete**

**Week 5-6: Frontend Development (Sprint 2)**
- ✅ React/Vue app scaffolding (Lightning Design System)
- ✅ Dashboard page (home, widgets)
- ✅ Document library (list, grid, filters)
- ✅ Search functionality (integration with backend)
- ✅ Document detail page (viewer, metadata)
- ✅ Upload page (drag-and-drop, form)
- ✅ User authentication flow (login, profile)
- ✅ Responsive design (mobile, tablet)
- Milestone: **Frontend v1 Complete**

**Week 7: AI Integration & Processing (Sprint 3)**
- ✅ Cloud Vision API integration (OCR)
- ✅ Metadata extraction logic
- ✅ Auto-population workflow
- ✅ Thumbnail generation
- ✅ Duplicate detection algorithm
- ✅ Background processing (Cloud Functions/Tasks)
- Milestone: **Intelligent Upload Complete**

**Week 8: User Management & Permissions (Sprint 4)**
- ✅ Role-based access control (RBAC)
- ✅ User management UI (admin)
- ✅ Office assignment logic
- ✅ Permission enforcement (backend + frontend)
- ✅ Approval workflow (optional, if required)
- ✅ Notification system (email integration)
- Milestone: **Security & Permissions Complete**

**Week 9: Analytics & Reporting (Sprint 5)**
- ✅ Analytics dashboard (admin view)
- ✅ Compliance reports (expiring documents)
- ✅ Audit log UI (searchable, exportable)
- ✅ Charts & visualizations (Lightning Charts)
- ✅ Export functionality (CSV, PDF)
- ✅ Scheduled reports (Cloud Scheduler)
- Milestone: **Analytics Complete**

**Week 10: Testing & QA (Sprint 6)**
- ✅ Unit tests (backend, 80% coverage target)
- ✅ Integration tests (API endpoints)
- ✅ Frontend tests (React Testing Library / Cypress)
- ✅ Security testing (OWASP top 10 checks)
- ✅ Performance testing (load tests, 500 concurrent users)
- ✅ Accessibility testing (WCAG 2.1 AA)
- ✅ Cross-browser testing (Chrome, Firefox, Safari, Edge)
- ✅ Mobile testing (iOS Safari, Android Chrome)
- ✅ Bug fixes
- Milestone: **Testing Complete, Release Candidate**

**Week 11: Data Migration & UAT**
- ✅ Run migration script (spreadsheet → new system)
- ✅ Data validation (spot-checks, counts)
- ✅ User Acceptance Testing (regional coordinators)
- ✅ Feedback collection and fixes
- ✅ Training materials finalized (videos, guides)
- ✅ Production deployment dry-run (staging environment)
- Milestone: **Migration Complete, Ready for Launch**

**Week 12: Launch & Training**
- ✅ Production deployment (with rollback plan)
- ✅ Smoke tests (post-deployment)
- ✅ Soft launch (Regional Coordinators access)
- ✅ Training sessions (live Zoom, recorded)
- ✅ Full rollout (all employees)
- ✅ Launch announcement (email, Slack, Ohana)
- ✅ Decommission old spreadsheet (archive)
- ✅ Post-launch monitoring (24/7 for first week)
- Milestone: **🎉 LIVE IN PRODUCTION**

**Week 13-14: Post-Launch Support**
- ✅ Monitor usage and performance
- ✅ Collect user feedback (survey)
- ✅ Address bugs and issues (priority fixes)
- ✅ Office hours (live support sessions)
- ✅ Iterate based on feedback
- Milestone: **Stable Operations**

---

## Stakeholders & Contacts

### Project Team
- **Executive Sponsor**: VP, Workplace Services (TBD)
- **Product Owner**: H&S Manager - pdelaware@salesforce.com
- **Project Manager**: TBD (Workplace Services PMO)
- **Technical Lead**: TBD (Engineering)
- **UX/UI Designer**: TBD (Design team)

### Regional Coordinators (Stakeholders)
- **Americas**:
  - Atlanta: [Coordinator Name] <email>
  - San Francisco: [Coordinator Name] <email>
  - New York: [Coordinator Name] <email>
  - Toronto: [Coordinator Name] <email>
  - Dallas, Chicago, Irvine, Boston: [Coordinator Names] <emails>
  
- **EMEA**:
  - Amsterdam: [Coordinator Name] <email>
  - Future EU offices: TBD

### Support Channels
- **Technical Issues**: Create ticket in Salesforce IT portal
- **Product Feedback**: Email sds-feedback@salesforce.com (alias to be created)
- **Training Requests**: Slack #sds-library-help (channel to be created)
- **Emergency (critical safety issue)**: Page on-call H&S manager

---

## Risks & Mitigation

### Technical Risks
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| OCR accuracy low for non-English SDS | Medium | Medium | Manual review queue, train custom Document AI model |
| Google Cloud cost overruns | Medium | Low | Set budget alerts, optimize queries, use Coldline storage |
| Migration data quality issues | High | Medium | Thorough data cleaning, manual review of errors, pilot migration |
| Performance degradation at scale | Medium | Low | Load testing, caching strategy, auto-scaling |
| Security vulnerability | High | Low | Penetration testing, code reviews, vulnerability scanning |

### Operational Risks
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Low user adoption | High | Medium | Training, champions per office, make system easier than spreadsheet |
| Incomplete SDS documents (missing hazard info) | Medium | Medium | Validation checks, warnings, compliance reports |
| Manufacturer delays in updating SDS | Medium | High | Early alerts (90 days), direct manufacturer outreach |
| Office coordinators turnover | Medium | Medium | Document processes, cross-train backup coordinators |

### Regulatory Risks
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Non-compliance with OSHA/REACH/WHMIS | High | Low | Built-in compliance checks, regular audits, legal review |
| Data privacy violations (GDPR/CCPA) | High | Low | Privacy by design, DPA with Google, regular privacy audits |
| Audit finds missing/expired SDS | Medium | Medium | Proactive expiration tracking, compliance dashboard |

---

## Governance & Maintenance

### Ongoing Responsibilities
- **H&S Manager (Product Owner)**: 
  - Overall system ownership
  - Quarterly review of compliance metrics
  - Approval of new features
  - Budget management
  
- **Regional Coordinators**:
  - Ensure documents for their offices are current
  - Upload new SDS within 30 days of chemical onboarding
  - Review and approve pending uploads (if workflow enabled)
  - Quarterly audit of their office's SDS inventory
  
- **IT/Cloud Team**:
  - Infrastructure maintenance
  - Performance monitoring
  - Security patching
  - Quarterly DR drills
  
- **Development Team** (Post-Launch Support):
  - Bug fixes (SLA: Critical <24h, High <1 week, Medium <1 month)
  - Feature enhancements (quarterly releases)
  - Dependency updates (monthly)
  - User support escalations

### Change Management Process
1. **Feature Request**: User submits via feedback form or Slack
2. **Triage**: Product Owner reviews, prioritizes (P0-P3)
3. **Design**: UX review for UI changes, technical design doc
4. **Approval**: Stakeholder sign-off (for major changes)
5. **Development**: Sprint planning, implementation
6. **Testing**: QA cycle, UAT with stakeholders
7. **Deployment**: Staging → Production, release notes
8. **Communication**: Announce changes to users (email, Slack)

### Review Cadence
- **Weekly**: Development team standups (during active development)
- **Monthly**: Product Owner + Regional Coordinators sync (review metrics, feedback)
- **Quarterly**: Executive review (budget, roadmap, KPIs)
- **Annually**: Security audit, compliance audit, vendor review (Google Cloud costs)

---

## Appendix

### Glossary
- **SDS (Safety Data Sheet)**: Document providing info on chemical hazards, handling, emergency procedures (formerly MSDS)
- **GHS (Globally Harmonized System)**: International standard for chemical classification and labeling
- **OSHA (Occupational Safety and Health Administration)**: US federal agency regulating workplace safety
- **REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals)**: EU chemical safety regulation
- **WHMIS (Workplace Hazardous Materials Information System)**: Canada's chemical safety program
- **CAS Number**: Unique identifier for chemical substances
- **H-Code**: Hazard statement code (e.g., H302 = Harmful if swallowed)
- **P-Code**: Precautionary statement code (e.g., P264 = Wash hands thoroughly after handling)
- **PWA (Progressive Web App)**: Web app that works offline, installable like native app

### Reference Documents
- OSHA HCS 2012: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200
- GHS Rev. 7: https://unece.org/transport/standards/transport/dangerous-goods/ghs-rev7-2017
- REACH Regulation: https://echa.europa.eu/regulations/reach
- Lightning Design System: https://www.lightningdesignsystem.com/
- Google Cloud Platform: https://cloud.google.com/docs

### Related Projects
- Salesforce Workplace Services Portal (internal)
- Incident Reporting System (integration opportunity)
- Facilities Management System (integration opportunity)
- Employee Directory (Salesforce Identity integration)

---

## Approval & Sign-Off

**Document Version**: 1.0  
**Last Updated**: 2026-05-27  
**Next Review**: 2026-06-15 (post-stakeholder review)

**Prepared By**:  
H&S Manager (pdelaware@salesforce.com)

**Reviewed By**: (Pending)
- [ ] VP, Workplace Services  
- [ ] Regional Coordinators (9 offices)  
- [ ] IT Security Team  
- [ ] Legal (Privacy/Compliance)  
- [ ] Engineering Lead

**Approved By**: (Pending)
- [ ] Executive Sponsor  
- [ ] Finance (Budget Approval)  
- [ ] Procurement (Vendor/GCP Approval)

---

**🌐 Let's Build the Future of Global Workplace Safety at Salesforce!**

*Questions? Contact: pdelaware@salesforce.com*
