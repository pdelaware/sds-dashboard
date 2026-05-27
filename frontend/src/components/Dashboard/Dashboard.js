import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, DataTable, DataTableColumn } from '@salesforce/design-system-react';
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

      // Fetch analytics
      const analyticsRes = await axios.get(`${API_URL}/analytics/overview`, { headers });
      setAnalytics(analyticsRes.data.overview);

      // Fetch expiring documents
      const expiringRes = await axios.get(`${API_URL}/analytics/expiring?days=90`, { headers });
      setExpiringDocs(expiringRes.data.documents.slice(0, 5));

      // Fetch recent documents
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

  const getDaysUntilExpiration = (expirationDate) => {
    if (!expirationDate) return null;
    const now = new Date();
    const expiry = new Date(expirationDate);
    const days = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="slds-spinner slds-spinner_medium">
          <div className="slds-spinner__dot-a"></div>
          <div className="slds-spinner__dot-b"></div>
        </div>
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
        {/* KPI Cards */}
        <div className="kpi-grid">
          <Card className="kpi-card">
            <div className="kpi-content">
              <div className="kpi-icon" style={{ backgroundColor: '#0176D3' }}>
                <svg className="slds-icon" aria-hidden="true">
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#database"></use>
                </svg>
              </div>
              <div className="kpi-info">
                <h3 className="kpi-value">{analytics?.totalDocuments || 0}</h3>
                <p className="kpi-label">Total Documents</p>
              </div>
            </div>
          </Card>

          <Card className="kpi-card">
            <div className="kpi-content">
              <div className="kpi-icon" style={{ backgroundColor: '#4BCA81' }}>
                <svg className="slds-icon" aria-hidden="true">
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#success"></use>
                </svg>
              </div>
              <div className="kpi-info">
                <h3 className="kpi-value">{analytics?.activeDocuments || 0}</h3>
                <p className="kpi-label">Active Documents</p>
              </div>
            </div>
          </Card>

          <Card className="kpi-card">
            <div className="kpi-content">
              <div className="kpi-icon" style={{ backgroundColor: '#FE9339' }}>
                <svg className="slds-icon" aria-hidden="true">
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#warning"></use>
                </svg>
              </div>
              <div className="kpi-info">
                <h3 className="kpi-value">{analytics?.expiringDocuments || 0}</h3>
                <p className="kpi-label">Expiring Soon (90 days)</p>
              </div>
            </div>
          </Card>

          <Card className="kpi-card">
            <div className="kpi-content">
              <div className="kpi-icon" style={{ backgroundColor: '#1B96FF' }}>
                <svg className="slds-icon" aria-hidden="true">
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#location"></use>
                </svg>
              </div>
              <div className="kpi-info">
                <h3 className="kpi-value">{analytics?.totalOffices || 0}</h3>
                <p className="kpi-label">Global Offices</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Expiring Documents */}
          <Card heading="⚠️ Expiring Soon (Next 90 Days)" className="dashboard-card">
            {expiringDocs.length === 0 ? (
              <div className="empty-state">
                <p>✅ No documents expiring in the next 90 days</p>
              </div>
            ) : (
              <div className="expiring-list">
                {expiringDocs.map((doc) => (
                  <div key={doc.id} className="expiring-item" onClick={() => navigate(`/documents/${doc.id}`)}>
                    <div className="expiring-item-header">
                      <h4>{doc.productName}</h4>
                      <span className={`status-badge expiring`}>
                        {getDaysUntilExpiration(doc.expirationDate?.toDate?.() || doc.expirationDate)} days
                      </span>
                    </div>
                    <p className="expiring-item-subtitle">{doc.manufacturer}</p>
                    <p className="expiring-item-date">
                      Expires: {formatDate(doc.expirationDate?.toDate?.() || doc.expirationDate)}
                    </p>
                  </div>
                ))}
                <Button
                  label="View All Expiring"
                  variant="neutral"
                  onClick={() => navigate('/analytics')}
                  className="view-all-button"
                />
              </div>
            )}
          </Card>

          {/* Recent Uploads */}
          <Card heading="📤 Recent Uploads" className="dashboard-card">
            {recentDocs.length === 0 ? (
              <div className="empty-state">
                <p>No recent uploads</p>
              </div>
            ) : (
              <div className="recent-list">
                {recentDocs.map((doc) => (
                  <div key={doc.id} className="recent-item" onClick={() => navigate(`/documents/${doc.id}`)}>
                    <div className="recent-item-icon">
                      <svg className="slds-icon slds-icon-text-default" aria-hidden="true">
                        <use xlinkHref="/assets/icons/doctype-sprite/svg/symbols.svg#pdf"></use>
                      </svg>
                    </div>
                    <div className="recent-item-content">
                      <h4>{doc.productName}</h4>
                      <p className="recent-item-subtitle">{doc.manufacturer}</p>
                      <p className="recent-item-date">
                        {formatDate(doc.uploadDate?.toDate?.() || doc.uploadDate)}
                      </p>
                    </div>
                    <span className={`status-badge ${doc.status}`}>{doc.status}</span>
                  </div>
                ))}
                <Button
                  label="View Library"
                  variant="neutral"
                  onClick={() => navigate('/library')}
                  className="view-all-button"
                />
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        {(userProfile?.role === 'admin' || userProfile?.role === 'regional_coordinator' || userProfile?.role === 'facilities_editor') && (
          <Card heading="🚀 Quick Actions" className="quick-actions-card">
            <div className="quick-actions-grid">
              <Button
                label="Upload New SDS"
                variant="brand"
                onClick={() => navigate('/upload')}
                iconCategory="utility"
                iconName="upload"
                iconPosition="left"
              />
              <Button
                label="Search Library"
                variant="neutral"
                onClick={() => navigate('/library')}
                iconCategory="utility"
                iconName="search"
                iconPosition="left"
              />
              {(userProfile?.role === 'admin' || userProfile?.role === 'regional_coordinator') && (
                <Button
                  label="View Analytics"
                  variant="neutral"
                  onClick={() => navigate('/analytics')}
                  iconCategory="utility"
                  iconName="chart"
                  iconPosition="left"
                />
              )}
            </div>
          </Card>
        )}

        {/* Compliance Status */}
        <Card heading="📊 Compliance Overview" className="compliance-card">
          <div className="compliance-grid">
            <div className="compliance-item">
              <div className="compliance-circle" style={{
                background: `conic-gradient(#4BCA81 0% ${analytics?.complianceRate || 0}%, #dddbda ${analytics?.complianceRate || 0}% 100%)`
              }}>
                <span className="compliance-percentage">{analytics?.complianceRate || 0}%</span>
              </div>
              <p className="compliance-label">Compliance Rate</p>
            </div>
            <div className="compliance-stats">
              <div className="compliance-stat">
                <span className="stat-value" style={{ color: '#4BCA81' }}>{analytics?.activeDocuments || 0}</span>
                <span className="stat-label">Active</span>
              </div>
              <div className="compliance-stat">
                <span className="stat-value" style={{ color: '#FE9339' }}>{analytics?.expiringDocuments || 0}</span>
                <span className="stat-label">Expiring</span>
              </div>
              <div className="compliance-stat">
                <span className="stat-value" style={{ color: '#EA001E' }}>{analytics?.expiredDocuments || 0}</span>
                <span className="stat-label">Expired</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
