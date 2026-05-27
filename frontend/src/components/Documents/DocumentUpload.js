import React from 'react';
import { Card } from '@salesforce/design-system-react';

const DocumentUpload = () => {
  return (
    <div className="document-upload">
      <div className="page-header">
        <h1 className="page-title">Upload SDS Document</h1>
        <p className="page-description">Upload new Safety Data Sheets to the library</p>
      </div>
      <div className="content-wrapper">
        <Card>
          <p>Drag-and-drop upload interface will be implemented here.</p>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUpload;
