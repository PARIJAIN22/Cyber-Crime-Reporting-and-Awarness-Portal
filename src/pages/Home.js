import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const features = [
    {
      icon: '📝',
      title: 'Easy Reporting',
      description: 'File your cyber crime complaint online with our simple and secure form.'
    },
    {
      icon: '🔍',
      title: 'Track Status',
      description: 'Monitor the progress of your complaint from filing to resolution.'
    },
    {
      icon: '⚠️',
      title: 'Scam Alerts',
      description: 'Stay informed about the latest cyber threats and scam techniques.'
    },
    {
      icon: '📊',
      title: 'Statistics',
      description: 'View real-time data on cyber crime trends and enforcement actions.'
    }
  ];

  const crimeTypes = [
    { icon: '🎣', name: 'Phishing', count: '12,450' },
    { icon: '💳', name: 'UPI Fraud', count: '8,320' },
    { icon: '👤', name: 'Identity Theft', count: '6,890' },
    { icon: '📱', name: 'Social Media Fraud', count: '5,670' },
    { icon: '🔒', name: 'Ransomware', count: '3,210' },
    { icon: '📧', name: 'Email Scams', count: '9,540' }
  ];

  const safetyTips = [
    'Never share your OTP, PIN, or password with anyone',
    'Verify the authenticity of websites before entering credentials',
    'Use strong, unique passwords for different accounts',
    'Enable two-factor authentication wherever possible',
    'Be cautious of unsolicited calls and messages',
    'Report suspicious activities immediately'
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <h1 id="hero-title" className="hero-title">
            Protecting You in the Digital World
          </h1>
          <p className="hero-subtitle">
            Report cyber crimes, track your complaints, and stay informed about online threats.
            Together, we can create a safer digital environment.
          </p>
          <div className="hero-actions">
            <Link to="/report" className="btn btn-primary">
              <span aria-hidden="true">📝</span> Report a Crime
            </Link>
            <Link to="/track" className="btn btn-secondary">
              <span aria-hidden="true">🔍</span> Track Complaint
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50,000+</span>
              <span className="stat-label">Complaints Resolved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Helpline Support</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1930</span>
              <span className="stat-label">Toll-Free Number</span>
            </div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="shield-icon">🛡️</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" aria-labelledby="features-title">
        <div className="section-container">
          <h2 id="features-title" className="section-title">How We Help You</h2>
          <p className="section-subtitle">
            Our platform provides comprehensive tools to combat cyber crime
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <article key={index} className="feature-card">
                <div className="feature-icon" aria-hidden="true">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Crime Types Section */}
      <section className="crime-types-section" aria-labelledby="crime-types-title">
        <div className="section-container">
          <h2 id="crime-types-title" className="section-title">Types of Cyber Crimes</h2>
          <p className="section-subtitle">
            Common cyber crimes we handle and their current statistics
          </p>
          <div className="crime-types-grid">
            {crimeTypes.map((crime, index) => (
              <article key={index} className="crime-type-card">
                <div className="crime-icon" aria-hidden="true">{crime.icon}</div>
                <h3 className="crime-name">{crime.name}</h3>
                <p className="crime-count">{crime.count} cases reported</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="safety-section" aria-labelledby="safety-title">
        <div className="section-container">
          <h2 id="safety-title" className="section-title">Stay Safe Online</h2>
          <p className="section-subtitle">
            Essential tips to protect yourself from cyber threats
          </p>
          <div className="safety-tips">
            <ul className="tips-list" role="list">
              {safetyTips.map((tip, index) => (
                <li key={index} className="tip-item">
                  <span className="tip-icon" aria-hidden="true">✓</span>
                  <span className="tip-text">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="section-container">
          <h2 id="cta-title" className="cta-title">Need to Report a Cyber Crime?</h2>
          <p className="cta-description">
            Don't wait! Report cyber crimes immediately to help us take swift action.
            Your report could prevent others from becoming victims.
          </p>
          <div className="cta-actions">
            <Link to="/report" className="btn btn-primary btn-large">
              <span aria-hidden="true">🚨</span> Report Now
            </Link>
            <a href="tel:1930" className="btn btn-secondary btn-large">
              <span aria-hidden="true">📞</span> Call Helpline
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
