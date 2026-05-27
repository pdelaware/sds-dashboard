import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './DocumentLibrary.css';

const DocumentLibrary = () => {
  const { getAuthToken } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [documents, setDocuments] = useState([]);
  const [offices, setOffices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    office: '',
    category: '',
    status: 'active'
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    fetchData();
  }, [filters, searchQuery]);

  const fetchData = async () => {
    try {
      const token = await getAuthToken();
      const headers = { Authorization: `Bearer ${token}` };

      const params = new URLSearchParams();
      if (filters.office) params.append('office', filters.office);
      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (searchQuery) params.append('search', searchQuery);

      const [docsRes, officesRes, categoriesRes] = await Promise.all([
        axios.get(`${API_URL}/documents?${params.toString()}`, { headers }),
        axios.get(`${API_URL}/offices`, { headers }),
        axios.get(`${API_URL}/categories`, { headers })
      ]);

      setDocuments(docsRes.data.documents);
      setOffices(officesRes.data.offices);
      setCategories(categoriesRes.data.categories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
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
    <div className="document-library">
      <div className="page-header">
        <h1 className="page-title">Document Library</h1>
        <p className="page-description">Search and browse SDS documents across all offices</p>
      </div>

      <div className="content-wrapper">
        <div className="search-card">
          <form onSubmit={handleSearch} className="search-section">
            <div className="search-input-wrapper">
              <input
                type="search"
                placeholder="Search by product name, manufacturer, CAS number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">Search</button>
            </div>

            <div className="filters-grid">
              <div className="form-field">
                <label>Office</label>
                <select
                  value={filters.office}
                  onChange={(e) => setFilters({ ...filters, office: e.target.value })}
                >
                  <option value="">All Offices</option>
                  {offices.map((office) => (
                    <option key={office.id} value={office.id}>{office.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="expiring">Expiring Soon</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="results-header">
          <h2>{documents.length} documents found</h2>
        </div>

        {documents.length === 0 ? (
          <div className="empty-state-card">
            <div className="empty-state-icon">📄</div>
            <h3>No documents found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="documents-grid">
            {documents.map((doc) => (
              <div key={doc.id} className="document-card" onClick={() => navigate(`/documents/${doc.id}`)}>
                <div className="document-card-header">
                  <div className="document-icon">📄</div>
                  <span className={`status-badge ${doc.status}`}>{doc.status}</span>
                </div>
                <h3 className="document-title">{doc.productName}</h3>
                <p className="document-manufacturer">{doc.manufacturer}</p>
                <div className="document-meta">
                  <span className="document-category">{doc.category}</span>
                  <span className="document-date">Updated: {formatDate(doc.uploadDate?.toDate?.() || doc.uploadDate)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentLibrary;
