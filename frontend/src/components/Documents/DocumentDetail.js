import React from 'react';
import { useParams } from 'react-router-dom';

const DocumentDetail = () => {
  const { id } = useParams();

  return (
    <div className="document-detail">
      <div className="page-header">
        <h1 className="page-title">Document Details</h1>
      </div>
      <div className="content-wrapper">
        <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem' }}>
          <p>Document ID: {id}</p>
          <p>PDF Viewer and full document details will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
