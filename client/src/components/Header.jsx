import React from 'react';
import { Sun, Moon, Clock, Settings } from 'lucide-react';

const Header = ({ theme, autoTheme, toggleTheme, toggleAutoTheme }) => {
  const getTimeBasedIcon = () => {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? <Sun size={16} /> : <Moon size={16} />;
  };

  return (
    <>
      <div className="theme-controls">
        {/* Auto Theme Toggle */}
        <button 
          className={`auto-theme-toggle ${autoTheme ? 'active' : ''}`}
          onClick={toggleAutoTheme}
          title={autoTheme ? 'Disable auto theme' : 'Enable auto theme (6AM-6PM light, 6PM-6AM dark)'}
        >
          <Clock size={16} />
          <span className="toggle-text">
            {autoTheme ? 'AUTO' : 'MANUAL'}
          </span>
          {autoTheme && (
            <span className="theme-indicator">
              {getTimeBasedIcon()}
            </span>
          )}
        </button>

        {/* Manual Theme Toggle */}
        <button 
          className={`theme-toggle ${autoTheme ? 'disabled' : ''}`}
          onClick={toggleTheme}
          title={autoTheme ? 'Auto theme is active' : `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          disabled={autoTheme}
        >
          <span className="theme-icon">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </span>
          <span className="toggle-text">
            {theme === 'light' ? 'DARK' : 'LIGHT'}
          </span>
        </button>
      </div>
      
      <header className="header">
        <div className="header-title-container">
          <img 
            src="/image.png" 
            alt="SkyScope Pro Logo" 
            className="app-logo"
          />
          <h1 className="slide-in">SkyScope Pro</h1>
        </div>
        <p className="fade-in">
          Advanced Weather Intelligence & Analytics Platform
          {autoTheme && (
            <span style={{ 
              display: 'block', 
              fontSize: '0.9rem', 
              marginTop: '5px',
              color: 'rgba(255, 215, 0, 0.8)'
            }}>
              🕒 Auto Theme: {new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'Day Mode' : 'Night Mode'}
            </span>
          )}
        </p>
      </header>
    </>
  );
};

export default Header;
