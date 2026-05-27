import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useAuth();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'home',
      path: '/',
      roles: ['admin', 'regional_coordinator', 'facilities_editor', 'viewer']
    },
    {
      label: 'Document Library',
      icon: 'catalog',
      path: '/library',
      roles: ['admin', 'regional_coordinator', 'facilities_editor', 'viewer']
    },
    {
      label: 'Upload',
      icon: 'upload',
      path: '/upload',
      roles: ['admin', 'regional_coordinator', 'facilities_editor']
    },
    {
      label: 'Analytics',
      icon: 'chart',
      path: '/analytics',
      roles: ['admin', 'regional_coordinator']
    },
    {
      label: 'Settings',
      icon: 'settings',
      path: '/settings',
      roles: ['admin', 'regional_coordinator', 'facilities_editor', 'viewer']
    }
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(userProfile?.role || 'viewer')
  );

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul className="slds-nav-vertical slds-nav-vertical_shade">
            {filteredMenuItems.map((item) => (
              <li
                key={item.path}
                className={`slds-nav-vertical__item ${
                  location.pathname === item.path ? 'slds-is-active' : ''
                }`}
              >
                <a
                  href="#"
                  className="slds-nav-vertical__action"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.path);
                  }}
                  title={item.label}
                >
                  <span className="slds-icon_container">
                    <svg className="slds-icon slds-icon-text-default slds-icon_small" aria-hidden="true">
                      <use xlinkHref={`/assets/icons/utility-sprite/svg/symbols.svg#${item.icon}`}></use>
                    </svg>
                  </span>
                  {!collapsed && <span className="slds-nav-vertical__action-text">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-info">
            {!collapsed && (
              <>
                <p className="sidebar-footer-title">Workplace Services</p>
                <p className="sidebar-footer-subtitle">Health & Safety</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
