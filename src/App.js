import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReportCrime from './pages/ReportCrime';
import TrackComplaint from './pages/TrackComplaint';
import ScamAlerts from './pages/ScamAlerts';
import Statistics from './pages/Statistics';
import './App.css';

function App() {
  const [complaints, setComplaints] = useState([
    {
      id: 'CYB001',
      type: 'Phishing',
      status: 'Action Taken',
      date: '2024-01-15',
      description: 'Received fake bank email',
      evidence: 'screenshot.png'
    },
    {
      id: 'CYB002',
      type: 'UPI Fraud',
      status: 'Under Review',
      date: '2024-01-20',
      description: 'Unauthorized UPI transaction',
      evidence: 'transaction.pdf'
    },
    {
      id: 'CYB003',
      type: 'Identity Theft',
      status: 'Filed',
      date: '2024-01-25',
      description: 'Someone using my identity online',
      evidence: 'profile_screenshot.jpg'
    }
  ]);

  const addComplaint = (complaint) => {
    const newComplaint = {
      ...complaint,
      id: `CYB${String(complaints.length + 1).padStart(3, '0')}`,
      status: 'Filed',
      date: new Date().toISOString().split('T')[0]
    };
    setComplaints([...complaints, newComplaint]);
    return newComplaint.id;
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportCrime addComplaint={addComplaint} />} />
            <Route path="/track" element={<TrackComplaint complaints={complaints} />} />
            <Route path="/alerts" element={<ScamAlerts />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
