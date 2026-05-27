import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@salesforce/design-system-react';

const DocumentDetail = () => {
  const { id } = useParams();

  return (
    <div className="document-detail">
      <div className="page-header">
        <h1 className="page-title">Document Details</h1>
      </div>
      <div className="content-wrapper">
        <Card>
          <p>Document ID: {id}</p>
          <p>PDF Viewer and full document details will be implemented here.</p>
        </Card>
      </div>
    </div>
  );
};

export default DocumentDetail;
