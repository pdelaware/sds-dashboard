import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, GlobalNavigationBar, GlobalNavigationBarRegion, Dropdown } from '@salesforce/design-system-react';
import './Header.css';

const Header = ({ onMenuClick }) => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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

  const userMenuItems = [
    {
      label: 'My Profile',
      value: 'profile',
      leftIcon: {
        name: 'user',
        category: 'standard'
      }
    },
    {
      label: 'Settings',
      value: 'settings',
      leftIcon: {
        name: 'settings',
        category: 'utility'
      }
    },
    {
      label: 'Sign Out',
      value: 'logout',
      leftIcon: {
        name: 'logout',
        category: 'utility'
      }
    }
  ];

  const handleUserMenuSelect = (item) => {
    if (item.value === 'logout') {
      handleLogout();
    } else if (item.value === 'settings') {
      navigate('/settings');
    } else if (item.value === 'profile') {
      navigate('/settings');
    }
  };

  return (
    <div className="app-header">
      <GlobalNavigationBar>
        <GlobalNavigationBarRegion region="primary">
          <button className="menu-button" onClick={onMenuClick}>
            <span className="slds-icon_container">
              <svg className="slds-icon slds-icon-text-default" aria-hidden="true">
                <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#rows"></use>
              </svg>
            </span>
          </button>

          <div className="app-name">
            <span className="app-logo">☁️</span>
            <h1>Global SDS Library</h1>
          </div>
        </GlobalNavigationBarRegion>

        <GlobalNavigationBarRegion region="secondary">
          <form className="header-search" onSubmit={handleSearch}>
            <div className="slds-form-element">
              <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                <svg className="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default" aria-hidden="true">
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
                </svg>
                <input
                  type="search"
                  className="slds-input"
                  placeholder="Search SDS documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </form>

          <div className="user-info">
            <span className="user-role-badge">
              {userProfile?.role || 'viewer'}
            </span>
            <Dropdown
              align="right"
              assistiveText={{ icon: 'User Actions' }}
              iconCategory="utility"
              iconName="user"
              iconVariant="border-filled"
              options={userMenuItems}
              onSelect={handleUserMenuSelect}
              width="x-small"
            />
          </div>
        </GlobalNavigationBarRegion>
      </GlobalNavigationBar>
    </div>
  );
};

export default Header;
