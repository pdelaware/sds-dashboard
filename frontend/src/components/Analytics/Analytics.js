import React from 'react';
import { Card } from '@salesforce/design-system-react';

const Analytics = () => {
  return (
    <div className="analytics">
      <div className="page-header">
        <h1 className="page-title">Analytics Dashboard</h1>
        <p className="page-description">View reports and analytics for SDS compliance</p>
      </div>
      <div className="content-wrapper">
        <Card>
          <p>Charts and analytics will be implemented here.</p>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
