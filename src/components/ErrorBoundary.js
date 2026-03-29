import React, { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon" aria-hidden="true">⚠️</div>
            <h1 className="error-title">Oops! Something went wrong</h1>
            <p className="error-message">
              We're sorry, but something unexpected happened. Please try again.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
            <div className="error-actions">
              <button 
                onClick={this.handleRetry}
                className="btn btn-primary"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="btn btn-secondary"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
