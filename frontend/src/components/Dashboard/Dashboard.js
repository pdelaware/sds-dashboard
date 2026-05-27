import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { getAuthToken, userProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [expiringDocs, setExpiringDocs] = useState([]);
  const [recentDocs, setRecentDocs] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = await getAuthToken();
      const headers = { Authorization: `Bearer ${token}` };

      const analyticsRes = await axios.get(`${API_URL}/analytics/overview`, { headers });
      setAnalytics(analyticsRes.data.overview);

      const expiringRes = await axios.get(`${API_URL}/analytics/expiring?days=90`, { headers });
      setExpiringDocs(expiringRes.data.documents.slice(0, 5));

      const docsRes = await axios.get(`${API_URL}/documents?limit=5&sort=uploadDate&order=desc`, { headers });
      setRecentDocs(docsRes.data.documents);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">
          Welcome back, {userProfile?.name || 'User'}!
        </h1>
        <p className="page-description">
          Salesforce Global SDS Library Dashboard
        </p>
      </div>

      <div className="content-wrapper">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-content">
              <div className="kpi-icon" style={{ backgroundColor: '#0176D3' }}>📊</div>
              <div className="kpi-info">
                <h3 className="kpi-value">{analytics?.totalDocuments || 0}</h3>
                <p className="kpi-label">Total Documents</p>
              </div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-content">
              <div className="kpi-icon" style={{ backgroundColor: '#4BCA81' }}>✅</div>
              <div className="kpi-info">
                <h3 className="kpi-value">{analytics?.activeDocuments || 0}</h3>
                <p className="kpi-label">Active Documents</p>
              </div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-content">
              <div className="kpi-icon" style={{ backgroundColor: '#FE9339' }}>⚠️</div>
              <div className="kpi-info">
                <h3 className="kpi-value">{analytics?.expiringDocuments || 0}</h3>
                <p className="kpi-label">Expiring Soon</p>
              </div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-content">
              <div className="kpi-icon" style={{ backgroundColor: '#1B96FF' }}>🌍</div>
              <div className="kpi-info">
                <h3 className="kpi-value">{analytics?.totalOffices || 0}</h3>
                <p className="kpi-label">Global Offices</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>⚠️ Expiring Soon (Next 90 Days)</h2>
            {expiringDocs.length === 0 ? (
              <div className="empty-state">
                <p>✅ No documents expiring in the next 90 days</p>
              </div>
            ) : (
              <div className="expiring-list">
                {expiringDocs.map((doc) => (
                  <div key={doc.id} className="expiring-item" onClick={() => navigate(`/documents/${doc.id}`)}>
                    <h4>{doc.productName}</h4>
                    <p>{doc.manufacturer}</p>
                    <p className="expiring-date">
                      Expires: {formatDate(doc.expirationDate?.toDate?.() || doc.expirationDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-card">
            <h2>📤 Recent Uploads</h2>
            {recentDocs.length === 0 ? (
              <div className="empty-state">
                <p>No recent uploads</p>
              </div>
            ) : (
              <div className="recent-list">
                {recentDocs.map((doc) => (
                  <div key={doc.id} className="recent-item" onClick={() => navigate(`/documents/${doc.id}`)}>
                    <div>
                      <h4>{doc.productName}</h4>
                      <p>{doc.manufacturer}</p>
                      <p className="recent-date">
                        {formatDate(doc.uploadDate?.toDate?.() || doc.uploadDate)}
                      </p>
                    </div>
                    <span className={`status-badge ${doc.status}`}>{doc.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {(userProfile?.role === 'admin' || userProfile?.role === 'regional_coordinator' || userProfile?.role === 'facilities_editor') && (
          <div className="quick-actions-card">
            <h2>🚀 Quick Actions</h2>
            <div className="quick-actions-grid">
              <button className="action-button primary" onClick={() => navigate('/upload')}>
                Upload New SDS
              </button>
              <button className="action-button" onClick={() => navigate('/library')}>
                Search Library
              </button>
              {(userProfile?.role === 'admin' || userProfile?.role === 'regional_coordinator') && (
                <button className="action-button" onClick={() => navigate('/analytics')}>
                  View Analytics
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
