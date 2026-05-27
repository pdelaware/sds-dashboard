import React from 'react';
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
        <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem' }}>
          <h2>User Profile</h2>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Email:</strong> {userProfile?.email || 'Not available'}</p>
            <p><strong>Name:</strong> {userProfile?.name || 'Not available'}</p>
            <p><strong>Role:</strong> {userProfile?.role || 'Not available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
