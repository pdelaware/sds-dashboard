import React from 'react';
import { Card } from '@salesforce/design-system-react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { userProfile } = useAuth();

  return (
    <div className="settings">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Manage your profile and preferences</p>
      </div>
      <div className="content-wrapper">
        <Card heading="User Profile">
          <div style={{ padding: '1rem' }}>
            <p><strong>Email:</strong> {userProfile?.email}</p>
            <p><strong>Name:</strong> {userProfile?.name}</p>
            <p><strong>Role:</strong> {userProfile?.role}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
