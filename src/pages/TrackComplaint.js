import React, { useState } from 'react';
import './TrackComplaint.css';

function TrackComplaint({ complaints }) {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const statusSteps = [
    { key: 'Filed', label: 'Filed', icon: '📝' },
    { key: 'Under Review', label: 'Under Review', icon: '🔍' },
    { key: 'Action Taken', label: 'Action Taken', icon: '✅' }
  ];

  const getStatusIndex = (status) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchId.trim()) {
      setError('Please enter a complaint ID');
      return;
    }

    setIsSearching(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const found = complaints.find(
        c => c.id.toLowerCase() === searchId.trim().toLowerCase()
      );

      if (found) {
        setSearchResult(found);
        setError('');
      } else {
        setSearchResult(null);
        setError('No complaint found with this ID. Please check and try again.');
      }
      setIsSearching(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="track-complaint">
      <div className="page-header">
        <h1 className="page-title">Track Your Complaint</h1>
        <p className="page-subtitle">
          Enter your complaint ID to check the current status of your cyber crime report.
        </p>
      </div>

      {/* Search Section */}
      <section className="search-section" aria-labelledby="search-title">
        <h2 id="search-title" className="visually-hidden">Search Complaint</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <label htmlFor="complaintId" className="search-label">
              Complaint ID
            </label>
            <div className="search-input-wrapper">
              <input
                type="text"
                id="complaintId"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  setError('');
                }}
                className={`search-input ${error ? 'error' : ''}`}
                placeholder="Enter your complaint ID (e.g., CYB001)"
                aria-describedby={error ? 'search-error' : undefined}
                aria-invalid={error ? 'true' : 'false'}
              />
              <button 
                type="submit" 
                className="search-btn"
                disabled={isSearching}
              >
                {isSearching ? (
                  <span className="spinner" aria-hidden="true"></span>
                ) : (
                  <span aria-hidden="true">🔍</span>
                )}
                {isSearching ? 'Searching...' : 'Track'}
              </button>
            </div>
            {error && (
              <span id="search-error" className="error-message" role="alert">
                {error}
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Search Result */}
      {searchResult && (
        <section className="result-section" aria-labelledby="result-title">
          <h2 id="result-title" className="section-title">Complaint Details</h2>
          
          <div className="complaint-card">
            <div className="complaint-header">
              <div className="complaint-id">
                <span className="label">Complaint ID:</span>
                <span className="value">{searchResult.id}</span>
              </div>
              <div className={`status-badge status-${searchResult.status.toLowerCase().replace(' ', '-')}`}>
                {searchResult.status}
              </div>
            </div>

            <div className="complaint-details">
              <div className="detail-row">
                <span className="detail-label">Crime Type:</span>
                <span className="detail-value">{searchResult.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Filed On:</span>
                <span className="detail-value">{formatDate(searchResult.date)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{searchResult.description}</span>
              </div>
              {searchResult.evidence && (
                <div className="detail-row">
                  <span className="detail-label">Evidence:</span>
                  <span className="detail-value">{searchResult.evidence}</span>
                </div>
              )}
            </div>

            {/* Status Timeline */}
            <div className="status-timeline" aria-label="Complaint status timeline">
              <h3 className="timeline-title">Status Progress</h3>
              <div className="timeline-track">
                {statusSteps.map((step, index) => {
                  const currentIndex = getStatusIndex(searchResult.status);
                  const isCompleted = index <= currentIndex;
                  const isCurrent = index === currentIndex;

                  return (
                    <div 
                      key={step.key}
                      className={`timeline-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                    >
                      <div className="step-indicator">
                        <span className="step-icon" aria-hidden="true">{step.icon}</span>
                        {isCompleted && <span className="check-mark" aria-hidden="true">✓</span>}
                      </div>
                      <div className="step-content">
                        <span className="step-label">{step.label}</span>
                        {isCurrent && (
                          <span className="current-badge">Current Status</span>
                        )}
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div className={`step-connector ${isCompleted ? 'completed' : ''}`} aria-hidden="true"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Information */}
            <div className="additional-info">
              <h3 className="info-title">What happens next?</h3>
              <div className="info-content">
                {searchResult.status === 'Filed' && (
                  <p>
                    Your complaint has been successfully filed and is awaiting review by our team. 
                    You will receive updates via email as your case progresses.
                  </p>
                )}
                {searchResult.status === 'Under Review' && (
                  <p>
                    Our investigation team is currently reviewing your complaint. 
                    We may contact you for additional information if needed.
                  </p>
                )}
                {searchResult.status === 'Action Taken' && (
                  <p>
                    Action has been taken on your complaint. You should have received 
                    a detailed report via email. If you have any questions, please contact our helpline.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Complaints */}
      <section className="recent-section" aria-labelledby="recent-title">
        <h2 id="recent-title" className="section-title">Your Recent Complaints</h2>
        <p className="section-subtitle">
          View all your filed complaints and their current status
        </p>

        {complaints.length === 0 ? (
          <div className="no-complaints">
            <div className="no-complaints-icon" aria-hidden="true">📭</div>
            <p>No complaints filed yet.</p>
          </div>
        ) : (
          <div className="complaints-list">
            {complaints.map((complaint) => (
              <article key={complaint.id} className="complaint-list-item">
                <div className="list-item-header">
                  <span className="complaint-id">{complaint.id}</span>
                  <span className={`status-badge status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
                    {complaint.status}
                  </span>
                </div>
                <div className="list-item-body">
                  <div className="list-item-detail">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{complaint.type}</span>
                  </div>
                  <div className="list-item-detail">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{formatDate(complaint.date)}</span>
                  </div>
                  <div className="list-item-detail">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{complaint.description}</span>
                  </div>
                </div>
                <button 
                  className="view-details-btn"
                  onClick={() => {
                    setSearchId(complaint.id);
                    setSearchResult(complaint);
                  }}
                >
                  View Details
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Help Section */}
      <section className="help-section" aria-labelledby="help-title">
        <h2 id="help-title" className="section-title">Need Help?</h2>
        <div className="help-cards">
          <div className="help-card">
            <div className="help-icon" aria-hidden="true">📞</div>
            <h3>Call Helpline</h3>
            <p>24/7 support available</p>
            <a href="tel:1930" className="help-link">1930</a>
          </div>
          <div className="help-card">
            <div className="help-icon" aria-hidden="true">📧</div>
            <h3>Email Support</h3>
            <p>Get help via email</p>
            <a href="mailto:cybercrime@gov.in" className="help-link">cybercrime@gov.in</a>
          </div>
          <div className="help-card">
            <div className="help-icon" aria-hidden="true">❓</div>
            <h3>FAQ</h3>
            <p>Common questions</p>
            <a href="#" className="help-link">View FAQs</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TrackComplaint;
