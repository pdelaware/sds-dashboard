import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { IconSettings } from '@salesforce/design-system-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IconSettings iconPath="/assets/salesforce-lightning-design-system/assets/icons">
      <App />
    </IconSettings>
  </React.StrictMode>
);
