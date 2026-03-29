import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">CyberSafe Portal</h3>
          <p className="footer-description">
            Your trusted platform for reporting cyber crimes and staying informed about online threats.
            Together, we can make the digital world safer.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook" className="social-link">
              <span aria-hidden="true">📘</span>
            </a>
            <a href="#" aria-label="Twitter" className="social-link">
              <span aria-hidden="true">🐦</span>
            </a>
            <a href="#" aria-label="Instagram" className="social-link">
              <span aria-hidden="true">📷</span>
            </a>
            <a href="#" aria-label="YouTube" className="social-link">
              <span aria-hidden="true">📺</span>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/report">Report Crime</Link></li>
            <li><Link to="/track">Track Complaint</Link></li>
            <li><Link to="/alerts">Scam Alerts</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Crime Categories</h4>
          <ul className="footer-links">
            <li><a href="#">Phishing</a></li>
            <li><a href="#">UPI Fraud</a></li>
            <li><a href="#">Identity Theft</a></li>
            <li><a href="#">Online Harassment</a></li>
            <li><a href="#">Ransomware</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Us</h4>
          <div className="contact-info">
            <p><span aria-hidden="true">📞</span> Helpline: 1930</p>
            <p><span aria-hidden="true">📧</span> Email: cybercrime@gov.in</p>
            <p><span aria-hidden="true">📍</span> National Cyber Crime Reporting Portal</p>
          </div>
          <div className="footer-emergency">
            <a href="tel:1930" className="emergency-footer-btn">
              <span aria-hidden="true">🚨</span> 24/7 Helpline
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            © 2024 CyberSafe Portal. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
