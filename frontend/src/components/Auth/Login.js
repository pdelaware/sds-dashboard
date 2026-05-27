import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Card } from '@salesforce/design-system-react';
import './Login.css';

const Login = () => {
  const { loginWithGoogle, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">
            <span className="sf-logo">☁️</span>
            Salesforce Global SDS Library
          </h1>
          <p className="login-subtitle">Building Trust Through Safety Excellence Worldwide</p>
        </div>

        <Card>
          <div className="login-content">
            <h2 className="welcome-text">Welcome</h2>
            <p className="welcome-description">
              Sign in with your Salesforce Google account to access the SDS Library
            </p>

            {error && (
              <div className="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error">
                <span className="slds-assistive-text">Error</span>
                <h2>{error}</h2>
              </div>
            )}

            <Button
              label="Sign in with Google"
              variant="brand"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="login-button"
              iconCategory="utility"
              iconName="user"
              iconPosition="left"
            />

            <div className="login-footer">
              <p className="help-text">
                Need help? Contact <a href="mailto:pdelaware@salesforce.com">pdelaware@salesforce.com</a>
              </p>
            </div>
          </div>
        </Card>

        <div className="login-info">
          <p>🛡️ Secure authentication via Salesforce Google Workspace</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
