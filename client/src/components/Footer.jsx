import React from 'react';
import { ExternalLink, Linkedin, User, Code, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer glass fade-in">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-branding">
            <div className="footer-logo-container">
              <img 
                src="/image.png" 
                alt="SkyScope Pro Logo" 
                className="footer-logo"
              />
              <h3 className="footer-title">
                <span className="gradient-text">SkyScope Pro</span>
              </h3>
            </div>
            <p className="footer-subtitle">
              Advanced Weather Intelligence & Analytics Platform
            </p>
          </div>

          <div className="footer-creator">
            <div className="creator-info">
              <div className="creator-name">
                <User size={18} />
                <span>Made with <Heart size={16} className="heart-icon" /> by</span>
              </div>
              <h4 className="creator-title">Y Mani Chandra Reddy</h4>
              <p className="creator-role">Full Stack Developer</p>
            </div>

            <div className="social-links">
              <a 
                href="https://www.linkedin.com/in/y-mani-chandra-reddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link linkedin"
                title="Connect on LinkedIn"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
                <ExternalLink size={14} className="external-icon" />
              </a>
              
              <a 
                href="https://manichandrareddy.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link portfolio"
                title="View Portfolio"
              >
                <Code size={20} />
                <span>Portfolio</span>
                <ExternalLink size={14} className="external-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          
          <div className="footer-info">
            <div className="copyright">
              <span>© {currentYear} SkyScope Pro. All rights reserved.</span>
            </div>
            
            <div className="tech-stack">
              <span className="tech-label">Built with:</span>
              <div className="tech-badges">
                <span className="tech-badge">React</span>
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">Express</span>
                <span className="tech-badge">OpenWeather API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
