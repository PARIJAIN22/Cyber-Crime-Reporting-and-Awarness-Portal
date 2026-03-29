import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header" role="banner">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu} aria-label="Home">
          <span className="logo-icon" aria-hidden="true">🛡️</span>
          <span className="logo-text">CyberSafe Portal</span>
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger"></span>
        </button>

        <nav 
          id="main-navigation" 
          className={`nav ${isMenuOpen ? 'nav-open' : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenu}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/report" 
                className={`nav-link ${isActive('/report') ? 'active' : ''}`}
                onClick={closeMenu}
                aria-current={isActive('/report') ? 'page' : undefined}
              >
                Report Crime
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/track" 
                className={`nav-link ${isActive('/track') ? 'active' : ''}`}
                onClick={closeMenu}
                aria-current={isActive('/track') ? 'page' : undefined}
              >
                Track Complaint
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/alerts" 
                className={`nav-link ${isActive('/alerts') ? 'active' : ''}`}
                onClick={closeMenu}
                aria-current={isActive('/alerts') ? 'page' : undefined}
              >
                Scam Alerts
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/statistics" 
                className={`nav-link ${isActive('/statistics') ? 'active' : ''}`}
                onClick={closeMenu}
                aria-current={isActive('/statistics') ? 'page' : undefined}
              >
                Statistics
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <a href="tel:1930" className="emergency-btn" aria-label="Cyber Crime Helpline">
            <span className="emergency-icon" aria-hidden="true">📞</span>
            <span className="emergency-text">Helpline: 1930</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
