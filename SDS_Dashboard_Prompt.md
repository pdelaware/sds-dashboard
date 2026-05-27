<!-- g-docs:doc_id=1cyY9KETYF3mLPoM7GVHUtFaFdQ7DDf-sJJhAKcnRm-Q -->
**Google Doc:** https://docs.google.com/document/d/1cyY9KETYF3mLPoM7GVHUtFaFdQ7DDf-sJJhAKcnRm-Q/edit

# SDS Global Dashboard - Project Prompt

## Project Overview
Build a web-based Safety Data Sheet (SDS) management dashboard for Salesforce Health & Safety operations across 9 offices in the United States and Canada. The system will serve as a centralized library for storing, accessing, and managing SDS documents for all global locations.

## Business Context
- **Organization**: Salesforce Health & Safety Department
- **Geographic Scope**: 9 offices across US/Canada
- **Primary User**: H&S Manager and regional safety coordinators
- **Purpose**: Centralized compliance document management with multi-location access

## Core Requirements

### 1. Document Library & Access
- **Browse & Search**
  - Display all SDS documents in a searchable, filterable grid/table view
  - Filter by: office location, chemical name, product category, hazard class, date uploaded, expiration date
  - Search functionality: full-text search across document names, chemical names, manufacturers, CAS numbers
  - Sort by: name (A-Z), date uploaded (newest/oldest), office location, hazard level
  - Thumbnail previews for PDF documents
  
- **Document Metadata**
  - Chemical/product name
  - Manufacturer
  - Office location(s) where used
  - Upload date and uploaded by user
  - Revision date
  - Expiration/review date (regulatory requirement: typically 3 years)
  - Hazard classification (GHS categories)
  - CAS number (Chemical Abstracts Service registry number)
  - Document version number
  - Tags/categories (e.g., "cleaning supplies", "lab chemicals", "maintenance")

- **Document Viewing**
  - In-browser PDF viewer (no download required for quick reference)
  - Download option for offline access
  - Version history (track document revisions)
  - Mobile-responsive viewing for field access

### 2. Document Upload System
- **Upload Interface**
  - Drag-and-drop file upload
  - Bulk upload capability (multiple files at once)
  - Supported formats: PDF (primary), DOC/DOCX (convert to PDF on upload)
  - File size limit: 25MB per document (configurable)
  
- **Upload Workflow**
  - Form fields for metadata entry:
    - Chemical/product name (required)
    - Manufacturer (required)
    - Office location(s) - multi-select checkbox (required)
    - Revision date (auto-extract from PDF if possible, manual override)
    - Expiration date (auto-calculate 3 years from revision, manual override)
    - Hazard categories (multi-select)
    - CAS number (optional)
    - Tags/categories (multi-select with auto-suggest)
    - Notes (optional)
  
  - **Auto-population**: OCR/text extraction to pre-fill fields from uploaded PDF
  - **Validation**: Check for duplicate documents (same chemical name + manufacturer)
  - **Approval workflow** (optional): New uploads go to "pending review" queue before appearing in main library
  - Upload progress indicator with success/error messages

### 3. User Management & Permissions
- **Authentication**
  - Google Workspace SSO (Single Sign-On via Salesforce Google accounts)
  - No separate username/password needed
  
- **User Roles**
  - **Admin** (H&S Manager): Full access - upload, edit, delete, manage users, view analytics
  - **Editor** (Regional Safety Coordinators): Upload and edit documents for their assigned offices
  - **Viewer** (All employees): Browse, search, view, and download documents
  
- **Access Control**
  - Office-based permissions: Editors can only manage documents for their assigned office(s)
  - Audit log: Track who uploaded, edited, viewed, or downloaded documents (timestamp + user)

### 4. Google Cloud Integration
- **Storage Backend**: Google Cloud Storage buckets
  - Bucket structure: `/sds-library/{office-name}/{category}/{filename}`
  - Lifecycle rules: Archive documents older than 5 years to Coldline storage
  - Versioning enabled (retain previous document versions)
  
- **Database**: Google Cloud Firestore or Cloud SQL (PostgreSQL)
  - Store document metadata and user information
  - Fast query performance for search/filter operations
  
- **Authentication**: Google Cloud Identity Platform / Firebase Auth
  - Integrate with Google Workspace for SSO
  
- **Hosting Options**:
  - **Frontend**: Firebase Hosting or Google Cloud Run
  - **Backend API**: Google Cloud Functions or Cloud Run (Node.js/Python)
  
- **Additional Services**:
  - Cloud Vision API: OCR for extracting text from SDS PDFs
  - Cloud Natural Language API: Auto-categorization of documents
  - Cloud Logging: Application and access logs
  - Cloud Monitoring: Uptime checks and performance metrics

### 5. Compliance & Notifications
- **Expiration Tracking**
  - Dashboard widget: "Expiring Soon" - highlight SDS documents expiring within 90 days
  - Automated email alerts: 90-day, 60-day, 30-day warnings to admins and relevant editors
  - Red flag indicators on expired documents (past expiration date)
  
- **Regulatory Compliance**
  - OSHA Hazard Communication Standard (HCS) compliance
  - GHS (Globally Harmonized System) alignment
  - Document retention policy: Maintain SDS for minimum 30 years after chemical discontinued (OSHA requirement)
  
- **Audit Trail**
  - Complete activity log (view, download, upload, edit, delete actions)
  - Exportable audit reports (CSV/PDF)
  - Retain logs for 7 years

### 6. Dashboard Features
- **Main Dashboard View (Landing Page)**
  - Total documents count (by office, by category)
  - Recent uploads (last 30 days)
  - Expiring documents widget (next 90 days)
  - Quick search bar (prominent placement)
  - Office location filters (visual pills/chips)
  
- **Analytics Page (Admin only)**
  - Documents per office (bar chart)
  - Upload activity over time (line graph)
  - Most-viewed documents (top 20)
  - Most-downloaded documents (top 20)
  - User activity summary (uploads, views per user)
  - Missing/outdated documents report
  
- **My Uploads (Editor role)**
  - Personal upload history
  - Pending approvals (if approval workflow enabled)
  - Documents assigned to user's office(s)

### 7. Technical Architecture
- **Frontend**
  - Framework: React.js or Vue.js
  - UI Library: Material-UI (Google Material Design) or Tailwind CSS
  - State Management: Redux or Zustand
  - Responsive design: Mobile-first approach
  - Progressive Web App (PWA) capabilities for offline access
  
- **Backend API**
  - REST API or GraphQL
  - Language: Node.js (Express) or Python (Flask/FastAPI)
  - API endpoints:
    - `GET /documents` - List all documents (with filters/search params)
    - `GET /documents/:id` - Get single document details
    - `POST /documents` - Upload new document
    - `PUT /documents/:id` - Update document metadata
    - `DELETE /documents/:id` - Delete document (soft delete)
    - `GET /offices` - List all offices
    - `GET /users` - List users (admin only)
    - `GET /analytics` - Dashboard analytics data
    - `GET /audit-log` - Audit trail export
  
- **Database Schema**
  - **documents** table: id, name, manufacturer, cas_number, file_url, file_size, upload_date, revision_date, expiration_date, hazard_classes (array), tags (array), uploaded_by_user_id, version, is_active
  - **offices** table: id, name, location, region
  - **document_offices** (join table): document_id, office_id
  - **users** table: id, email, name, role, assigned_offices (array)
  - **audit_log** table: id, user_id, document_id, action_type, timestamp, ip_address, details
  
- **File Processing Pipeline**
  - Cloud Function triggered on upload:
    1. Validate file (format, size)
    2. Run OCR (Cloud Vision API)
    3. Extract metadata (chemical name, revision date, hazard info)
    4. Generate thumbnail
    5. Store file in Cloud Storage
    6. Create database record
    7. Send confirmation notification

### 8. UI/UX Design Specifications
- **Color Scheme**
  - Primary: Salesforce blue (#0176D3) or H&S safety colors (orange/yellow for warnings)
  - Accent: Green for safe/compliant, red for expired/missing, yellow for warnings
  
- **Navigation**
  - Top navigation bar: Logo, Search, Office filter, User profile menu
  - Sidebar: Dashboard, Library, Upload, Analytics, My Uploads, Settings
  - Breadcrumb navigation
  
- **Key Pages**
  - **Home/Dashboard**: Overview widgets and quick actions
  - **Library**: Main document grid/table with filters
  - **Document Detail**: Full metadata, view/download, version history
  - **Upload**: Upload form with metadata fields
  - **Analytics**: Charts and reports (admin only)
  - **Settings**: User management, office management, notification preferences

### 9. Security Requirements
- **Data Protection**
  - Encryption at rest (Google Cloud Storage encryption)
  - Encryption in transit (HTTPS/TLS)
  - Regular security scans and vulnerability assessments
  
- **Access Control**
  - IP whitelisting option (restrict access to Salesforce network)
  - Session timeout (30 minutes inactivity)
  - Role-based access control (RBAC)
  
- **Backup & Recovery**
  - Daily automated backups of database and files
  - Point-in-time recovery capability
  - Backup retention: 30 days
  - Disaster recovery plan documentation

### 10. Performance Requirements
- **Speed**
  - Page load time: < 2 seconds
  - Search results: < 1 second
  - File upload: Progress indicator, background processing for large files
  
- **Scalability**
  - Support 10,000+ documents
  - Handle 200+ concurrent users
  - 1GB+ upload capacity per day

### 11. Mobile Considerations
- Responsive design (works on tablets and smartphones)
- Touch-friendly interface
- Offline viewing capability (PWA with cached documents)
- Camera integration: Snap photo of chemical label to initiate SDS search

### 12. Future Enhancements (Phase 2)
- QR code generation: Print QR codes for physical chemical containers that link to SDS
- Multi-language support (Spanish, French Canadian)
- Integration with Salesforce internal systems (employee directory, incident reporting)
- AI-powered hazard assessment recommendations
- Chemical inventory management (track quantities on-site)
- Training module: Link SDS to required safety training courses
- Barcode scanner for quick SDS lookup

## Deliverables
1. **Frontend Web Application** (React/Vue)
2. **Backend API** (Node.js/Python on Google Cloud)
3. **Database Schema** (Firestore/Cloud SQL)
4. **Google Cloud Infrastructure** (Storage, Functions, Hosting)
5. **User Documentation** (how to upload, search, manage documents)
6. **Admin Guide** (user management, system configuration)
7. **Deployment Pipeline** (CI/CD via Cloud Build)

## Success Metrics
- 100% of current SDS documents migrated and accessible within 30 days
- <2 second average search response time
- 95%+ user satisfaction score
- Zero expired documents remaining in circulation after 60 days
- 80% user adoption across all offices within 90 days

## Timeline Estimate
- **Week 1-2**: Requirements finalization, Google Cloud setup, database design
- **Week 3-4**: Backend API development
- **Week 5-6**: Frontend dashboard development
- **Week 7**: Upload system and file processing pipeline
- **Week 8**: User management and authentication integration
- **Week 9**: Analytics dashboard and reporting
- **Week 10**: Testing (unit, integration, user acceptance)
- **Week 11**: Migration of existing SDS documents
- **Week 12**: Deployment, training, and launch

## Budget Considerations (Google Cloud Costs)
- Cloud Storage: ~$0.02/GB/month (estimate $10-50/month for 500-2500 GB)
- Cloud Functions: ~$0.40 per million invocations (estimate $5-20/month)
- Cloud SQL or Firestore: ~$25-100/month depending on usage
- Cloud Vision API (OCR): ~$1.50 per 1000 pages (one-time migration + ongoing uploads)
- Firebase Hosting or Cloud Run: ~$10-30/month
- **Total estimated monthly cost**: $50-200/month (may vary based on usage)

## Contact & Resources
- **Project Sponsor**: H&S Manager (pdelaware)
- **Stakeholders**: 9 office safety coordinators, all Salesforce employees
- **Google Workspace Domain**: Salesforce corporate Google account
- **Existing Systems**: Integration with Salesforce Git (git.soma.salesforce.com) for version control

---

## Next Steps
1. Review and refine requirements with stakeholders
2. Set up Google Cloud project and billing
3. Create project repository on git.soma.salesforce.com
4. Assemble development team (frontend, backend, cloud engineer)
5. Begin design mockups and technical architecture documentation
