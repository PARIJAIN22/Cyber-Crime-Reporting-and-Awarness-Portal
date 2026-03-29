import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ScamAlerts.css';

function ScamAlerts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Phishing',
    'UPI Fraud',
    'Identity Theft',
    'Online Harassment',
    'Ransomware',
    'Email Scams',
    'Social Media Fraud',
    'Investment Scam'
  ];

  const scamAlerts = [
    {
      id: 1,
      title: 'Fake Bank SMS Scam',
      category: 'Phishing',
      severity: 'High',
      date: '2024-01-25',
      description: 'Scammers are sending fake SMS messages claiming to be from banks, asking users to click on links to verify their accounts. These links lead to fake websites that steal login credentials.',
      indicators: [
        'Urgent language demanding immediate action',
        'Suspicious links not matching official bank domains',
        'Requests for OTP, PIN, or password',
        'Poor grammar and spelling errors'
      ],
      prevention: [
        'Never click on links in unsolicited SMS messages',
        'Always verify by calling your bank directly',
        'Check the official website URL carefully',
        'Enable two-factor authentication'
      ],
      reportedCases: 1250
    },
    {
      id: 2,
      title: 'UPI QR Code Fraud',
      category: 'UPI Fraud',
      severity: 'High',
      date: '2024-01-24',
      description: 'Fraudsters are replacing legitimate UPI QR codes with their own at shops and public places. When scanned, money goes to the fraudster instead of the merchant.',
      indicators: [
        'QR code appears tampered or pasted over',
        'Merchant claims they didn\'t receive payment',
        'Transaction shows different recipient name',
        'Unusually high transaction amounts'
      ],
      prevention: [
        'Always verify the merchant name before paying',
        'Ask the merchant to confirm the amount',
        'Check if the QR code looks original',
        'Use UPI ID instead of QR code when possible'
      ],
      reportedCases: 890
    },
    {
      id: 3,
      title: 'Social Media Account Takeover',
      category: 'Identity Theft',
      severity: 'Medium',
      date: '2024-01-23',
      description: 'Hackers are gaining access to social media accounts through phishing links and then using them to scam the victim\'s friends and family by asking for money.',
      indicators: [
        'Unusual messages from friends asking for money',
        'Account posting content you didn\'t create',
        'Login alerts from unfamiliar locations',
        'Friends receiving strange messages from your account'
      ],
      prevention: [
        'Use strong, unique passwords',
        'Enable login notifications',
        'Don\'t click on suspicious links',
        'Regularly check your account activity'
      ],
      reportedCases: 2100
    },
    {
      id: 4,
      title: 'Fake Customer Support Calls',
      category: 'Online Harassment',
      severity: 'Medium',
      date: '2024-01-22',
      description: 'Scammers impersonate customer support from popular companies, claiming there\'s an issue with your account or order, and ask for remote access to your device.',
      indicators: [
        'Unsolicited calls claiming to be from tech support',
        'Requests for remote access to your computer',
        'Demands for immediate payment',
        'Threats of account suspension'
      ],
      prevention: [
        'Never give remote access to unsolicited callers',
        'Hang up and call the official company number',
        'Don\'t share personal information over phone',
        'Verify any claims through official channels'
      ],
      reportedCases: 1560
    },
    {
      id: 5,
      title: 'Cryptocurrency Investment Scam',
      category: 'Investment Scam',
      severity: 'High',
      date: '2024-01-21',
      description: 'Fraudsters promise high returns on cryptocurrency investments, often using fake trading platforms that show fabricated profits to lure more investment.',
      indicators: [
        'Guaranteed high returns with no risk',
        'Pressure to invest quickly',
        'Unregistered investment platforms',
        'Difficulty withdrawing funds'
      ],
      prevention: [
        'Research any investment platform thoroughly',
        'Be wary of guaranteed returns',
        'Only use registered and regulated platforms',
        'Never invest more than you can afford to lose'
      ],
      reportedCases: 780
    },
    {
      id: 6,
      title: 'Job Offer Scam',
      category: 'Email Scams',
      severity: 'Medium',
      date: '2024-01-20',
      description: 'Scammers send fake job offers via email, often promising high salaries for minimal work. They may ask for upfront fees for training or equipment.',
      indicators: [
        'Job offers without interviews',
        'Requests for upfront payments',
        'Unrealistic salary promises',
        'Vague job descriptions'
      ],
      prevention: [
        'Research the company thoroughly',
        'Never pay for a job offer',
        'Verify job postings on official company websites',
        'Be cautious of offers that seem too good to be true'
      ],
      reportedCases: 920
    },
    {
      id: 7,
      title: 'Fake Online Shopping Websites',
      category: 'Social Media Fraud',
      severity: 'High',
      date: '2024-01-19',
      description: 'Fraudsters create fake e-commerce websites with unbelievable discounts. After payment, customers receive nothing or counterfeit products.',
      indicators: [
        'Prices significantly lower than market rate',
        'Newly created websites with no reviews',
        'Only accepting advance payment',
        'No physical address or contact information'
      ],
      prevention: [
        'Shop only from reputable websites',
        'Check website reviews and ratings',
        'Use secure payment methods',
        'Verify contact information and address'
      ],
      reportedCases: 1890
    },
    {
      id: 8,
      title: 'Ransomware Attack via Email',
      category: 'Ransomware',
      severity: 'Critical',
      date: '2024-01-18',
      description: 'Cybercriminals are sending emails with malicious attachments that, when opened, encrypt all files on the computer and demand ransom for decryption.',
      indicators: [
        'Unexpected email attachments',
        'Files suddenly become inaccessible',
        'Ransom message appearing on screen',
        'Unusual system behavior'
      ],
      prevention: [
        'Never open suspicious email attachments',
        'Keep your operating system updated',
        'Regularly backup your important files',
        'Use reputable antivirus software'
      ],
      reportedCases: 450
    }
  ];

  const filteredAlerts = scamAlerts.filter(alert => {
    const matchesCategory = selectedCategory === 'All' || alert.category === selectedCategory;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'severity-critical';
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="scam-alerts">
      <div className="page-header">
        <h1 className="page-title">Scam Alerts</h1>
        <p className="page-subtitle">
          Stay informed about the latest cyber threats and scam techniques to protect yourself and your loved ones.
        </p>
      </div>

      {/* Filters Section */}
      <section className="filters-section" aria-labelledby="filters-title">
        <h2 id="filters-title" className="visually-hidden">Filter Alerts</h2>
        
        <div className="search-filter">
          <label htmlFor="search-alerts" className="filter-label">Search Alerts</label>
          <div className="search-input-wrapper">
            <input
              type="text"
              id="search-alerts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              placeholder="Search by title or description..."
              aria-label="Search scam alerts"
            />
            <span className="search-icon" aria-hidden="true">🔍</span>
          </div>
        </div>

        <div className="category-filter">
          <label htmlFor="category-select" className="filter-label">Filter by Category</label>
          <div className="category-buttons" role="group" aria-label="Filter by category">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Alerts Count */}
      <div className="alerts-count" aria-live="polite">
        Showing {filteredAlerts.length} of {scamAlerts.length} alerts
      </div>

      {/* Alerts Grid */}
      <section className="alerts-section" aria-labelledby="alerts-title">
        <h2 id="alerts-title" className="visually-hidden">Scam Alerts List</h2>
        
        {filteredAlerts.length === 0 ? (
          <div className="no-alerts">
            <div className="no-alerts-icon" aria-hidden="true">🔍</div>
            <p>No alerts found matching your criteria.</p>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="alerts-grid">
            {filteredAlerts.map((alert, index) => (
              <article 
                key={alert.id} 
                className="alert-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="alert-header">
                  <span className={`severity-badge ${getSeverityClass(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="alert-date">{formatDate(alert.date)}</span>
                </div>

                <h3 className="alert-title">{alert.title}</h3>
                <span className="alert-category">{alert.category}</span>
                
                <p className="alert-description">{alert.description}</p>

                <div className="alert-details">
                  <div className="detail-section">
                    <h4 className="detail-title">
                      <span aria-hidden="true">⚠️</span> Warning Signs
                    </h4>
                    <ul className="detail-list">
                      {alert.indicators.map((indicator, idx) => (
                        <li key={idx}>{indicator}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4 className="detail-title">
                      <span aria-hidden="true">🛡️</span> How to Protect Yourself
                    </h4>
                    <ul className="detail-list">
                      {alert.prevention.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="alert-footer">
                  <div className="reported-cases">
                    <span className="cases-icon" aria-hidden="true">📊</span>
                    <span className="cases-count">{alert.reportedCases.toLocaleString()}</span>
                    <span className="cases-label">cases reported</span>
                  </div>
                  <Link 
                    to="/report" 
                    className="report-btn"
                    state={{ crimeType: alert.category, alertTitle: alert.title }}
                  >
                    <span aria-hidden="true">📝</span> Report Similar
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Safety Tips Section */}
      <section className="safety-section" aria-labelledby="safety-title">
        <h2 id="safety-title" className="section-title">General Safety Tips</h2>
        <div className="safety-tips-grid">
          <div className="safety-tip-card animate-scale-in">
            <div className="tip-icon" aria-hidden="true">🔐</div>
            <h3>Protect Your Passwords</h3>
            <p>Use strong, unique passwords for different accounts. Never share your passwords with anyone.</p>
          </div>
          <div className="safety-tip-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="tip-icon" aria-hidden="true">📱</div>
            <h3>Verify Before You Trust</h3>
            <p>Always verify the identity of anyone asking for personal information or money.</p>
          </div>
          <div className="safety-tip-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="tip-icon" aria-hidden="true">💾</div>
            <h3>Backup Your Data</h3>
            <p>Regularly backup important files to protect against ransomware and data loss.</p>
          </div>
          <div className="safety-tip-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="tip-icon" aria-hidden="true">🚨</div>
            <h3>Report Suspicious Activity</h3>
            <p>If you encounter a scam, report it immediately to help protect others.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ScamAlerts;
