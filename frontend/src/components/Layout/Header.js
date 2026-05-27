import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ onMenuClick }) => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/library?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="app-header">
      <div className="header-content">
        <button className="menu-button" onClick={onMenuClick}>
          ☰
        </button>

        <div className="app-name">
          <span className="app-logo">☁️</span>
          <h1>Global SDS Library</h1>
        </div>

        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="search"
            className="search-input"
            placeholder="Search SDS documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">🔍</button>
        </form>

        <div className="user-info">
          <span className="user-role-badge">
            {userProfile?.role || 'viewer'}
          </span>
          <div className="user-menu-container">
            <button
              className="user-menu-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              👤
            </button>
            {showUserMenu && (
              <div className="user-menu-dropdown">
                <button onClick={() => { navigate('/settings'); setShowUserMenu(false); }}>
                  Settings
                </button>
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
