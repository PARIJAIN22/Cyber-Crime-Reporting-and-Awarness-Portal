import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import './App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ReportCrime = lazy(() => import('./pages/ReportCrime'));
const TrackComplaint = lazy(() => import('./pages/TrackComplaint'));
const ScamAlerts = lazy(() => import('./pages/ScamAlerts'));
const Statistics = lazy(() => import('./pages/Statistics'));

// Loading component
function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <div className="app">
            <Header />
            <Notification />
            <main className="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/report" element={<ReportCrime />} />
                  <Route path="/track" element={<TrackComplaint />} />
                  <Route path="/alerts" element={<ScamAlerts />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
