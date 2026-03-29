import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import './Statistics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Statistics() {
  const [downloading, setDownloading] = useState(null);

  // Mock data for statistics
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Complaints Filed',
        data: [1250, 1450, 1320, 1580, 1720, 1890, 2100, 2350, 2180, 2420, 2680, 2950],
        borderColor: '#1a237e',
        backgroundColor: 'rgba(26, 35, 126, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Complaints Resolved',
        data: [980, 1120, 1050, 1280, 1420, 1580, 1750, 1980, 1850, 2100, 2320, 2580],
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const crimeTypeData = {
    labels: ['Phishing', 'UPI Fraud', 'Identity Theft', 'Email Scams', 'Social Media', 'Others'],
    datasets: [
      {
        label: 'Number of Cases',
        data: [12450, 8320, 6890, 9540, 5670, 4130],
        backgroundColor: [
          '#1a237e',
          '#c62828',
          '#f57c00',
          '#2e7d32',
          '#7b1fa2',
          '#00838f'
        ],
        borderColor: [
          '#1a237e',
          '#c62828',
          '#f57c00',
          '#2e7d32',
          '#7b1fa2',
          '#00838f'
        ],
        borderWidth: 1
      }
    ]
  };

  const statusData = {
    labels: ['Filed', 'Under Review', 'Action Taken'],
    datasets: [
      {
        data: [35, 45, 20],
        backgroundColor: [
          '#f57c00',
          '#1a237e',
          '#2e7d32'
        ],
        borderColor: [
          '#f57c00',
          '#1a237e',
          '#2e7d32'
        ],
        borderWidth: 2
      }
    ]
  };

  const ageGroupData = {
    labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
    datasets: [
      {
        label: 'Victims by Age Group',
        data: [28, 35, 22, 10, 5],
        backgroundColor: 'rgba(26, 35, 126, 0.8)',
        borderColor: '#1a237e',
        borderWidth: 1
      }
    ]
  };

  const recoveryRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Recovery Rate (%)',
        data: [78, 82, 79, 85, 88, 91, 89, 92, 90, 93, 95, 94],
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    ...chartOptions,
    cutout: '60%'
  };

  const stats = [
    { label: 'Total Complaints', value: '46,920', icon: '📝', change: '+12%' },
    { label: 'Resolved Cases', value: '38,450', icon: '✅', change: '+15%' },
    { label: 'Amount Recovered', value: '₹12.5 Cr', icon: '💰', change: '+18%' },
    { label: 'Active Cases', value: '8,470', icon: '🔍', change: '-5%' }
  ];

  const topCrimes = [
    { name: 'Phishing', count: 12450, percentage: 26.5 },
    { name: 'Email Scams', count: 9540, percentage: 20.3 },
    { name: 'UPI Fraud', count: 8320, percentage: 17.7 },
    { name: 'Identity Theft', count: 6890, percentage: 14.7 },
    { name: 'Social Media Fraud', count: 5670, percentage: 12.1 }
  ];

  const downloadReport = async (reportType) => {
    setDownloading(reportType);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate report content based on type
    let reportContent = '';
    let fileName = '';
    
    if (reportType === 'monthly') {
      fileName = 'Monthly_Cyber_Crime_Report.pdf';
      reportContent = `
CYBER CRIME REPORTING & AWARENESS PORTAL
MONTHLY REPORT - ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}

EXECUTIVE SUMMARY
=================
Total Complaints Filed: 46,920
Complaints Resolved: 38,450
Recovery Rate: 94%
Amount Recovered: ₹12.5 Crore

CRIME TYPE BREAKDOWN
====================
1. Phishing: 12,450 cases (26.5%)
2. Email Scams: 9,540 cases (20.3%)
3. UPI Fraud: 8,320 cases (17.7%)
4. Identity Theft: 6,890 cases (14.7%)
5. Social Media Fraud: 5,670 cases (12.1%)
6. Others: 4,130 cases (8.8%)

MONTHLY TRENDS
==============
January: 1,250 complaints
February: 1,450 complaints
March: 1,320 complaints
April: 1,580 complaints
May: 1,720 complaints
June: 1,890 complaints
July: 2,100 complaints
August: 2,350 complaints
September: 2,180 complaints
October: 2,420 complaints
November: 2,680 complaints
December: 2,950 complaints

AGE GROUP ANALYSIS
==================
18-25 years: 28%
26-35 years: 35%
36-45 years: 22%
46-55 years: 10%
55+ years: 5%

RECOMMENDATIONS
===============
1. Increase awareness campaigns for the 26-35 age group
2. Strengthen UPI fraud prevention measures
3. Enhance phishing detection systems
4. Improve response time for complaint resolution

---
Report Generated: ${new Date().toLocaleString('en-IN')}
Cyber Crime Reporting & Awareness Portal
Helpline: 1930
      `;
    } else if (reportType === 'annual') {
      fileName = 'Annual_Cyber_Crime_Statistics.pdf';
      reportContent = `
CYBER CRIME REPORTING & AWARENESS PORTAL
ANNUAL STATISTICS REPORT - ${new Date().getFullYear()}

YEAR IN REVIEW
==============
Total Complaints Received: 46,920
Total Complaints Resolved: 38,450
Overall Recovery Rate: 82%
Total Amount Recovered: ₹12.5 Crore

CRIME CATEGORY PERFORMANCE
==========================
Phishing:
  - Cases: 12,450
  - Resolved: 10,890
  - Recovery Rate: 87%

Email Scams:
  - Cases: 9,540
  - Resolved: 7,890
  - Recovery Rate: 83%

UPI Fraud:
  - Cases: 8,320
  - Resolved: 6,980
  - Recovery Rate: 84%

Identity Theft:
  - Cases: 6,890
  - Resolved: 5,670
  - Recovery Rate: 82%

Social Media Fraud:
  - Cases: 5,670
  - Resolved: 4,560
  - Recovery Rate: 80%

REGIONAL DISTRIBUTION
=====================
Metro Cities: 45%
Tier-1 Cities: 30%
Tier-2 Cities: 15%
Rural Areas: 10%

KEY ACHIEVEMENTS
================
1. Reduced average resolution time from 45 days to 28 days
2. Increased recovery rate from 75% to 82%
3. Launched awareness campaigns reaching 10 million citizens
4. Established 24/7 helpline support

FUTURE PLANS
============
1. AI-powered scam detection system
2. Mobile app launch
3. Integration with banking systems
4. Enhanced training for law enforcement

---
Report Generated: ${new Date().toLocaleString('en-IN')}
Cyber Crime Reporting & Awareness Portal
Helpline: 1930
      `;
    } else if (reportType === 'category') {
      fileName = 'Crime_Category_Report.pdf';
      reportContent = `
CYBER CRIME REPORTING & AWARENESS PORTAL
CRIME CATEGORY REPORT

PHISHING ATTACKS
================
Total Cases: 12,450
Financial Loss: ₹4.2 Crore
Recovery Rate: 87%

Common Methods:
- Fake bank emails
- Fraudulent websites
- SMS phishing
- Social media phishing

Prevention Tips:
✓ Never click on suspicious links
✓ Verify website URLs
✓ Enable two-factor authentication
✓ Report suspicious messages

UPI FRAUD
=========
Total Cases: 8,320
Financial Loss: ₹2.8 Crore
Recovery Rate: 84%

Common Methods:
- QR code manipulation
- Fake UPI apps
- Social engineering
- SIM swapping

Prevention Tips:
✓ Verify merchant details before payment
✓ Use official UPI apps only
✓ Never share OTP or PIN
✓ Enable transaction alerts

IDENTITY THEFT
==============
Total Cases: 6,890
Financial Loss: ₹1.9 Crore
Recovery Rate: 82%

Common Methods:
- Data breaches
- Social media stalking
- Document theft
- Phishing

Prevention Tips:
✓ Use strong, unique passwords
✓ Monitor credit reports
✓ Secure personal documents
✓ Be cautious on social media

EMAIL SCAMS
===========
Total Cases: 9,540
Financial Loss: ₹3.1 Crore
Recovery Rate: 83%

Common Methods:
- Lottery scams
- Job offer scams
- Investment scams
- Romance scams

Prevention Tips:
✓ Don't respond to unsolicited emails
✓ Verify sender authenticity
✓ Never share financial information
✓ Report spam emails

SOCIAL MEDIA FRAUD
==================
Total Cases: 5,670
Financial Loss: ₹1.5 Crore
Recovery Rate: 80%

Common Methods:
- Fake profiles
- Investment schemes
- Shopping scams
- Impersonation

Prevention Tips:
✓ Verify profiles before engaging
✓ Don't share personal information
✓ Use platform reporting features
✓ Be skeptical of too-good-to-be-true offers

---
Report Generated: ${new Date().toLocaleString('en-IN')}
Cyber Crime Reporting & Awareness Portal
Helpline: 1930
      `;
    }
    
    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    setDownloading(null);
  };

  return (
    <div className="statistics">
      <div className="page-header">
        <h1 className="page-title">Statistics Dashboard</h1>
        <p className="page-subtitle">
          Real-time data and insights on cyber crime trends and enforcement actions.
        </p>
      </div>

      {/* Key Statistics */}
      <section className="key-stats-section" aria-labelledby="key-stats-title">
        <h2 id="key-stats-title" className="visually-hidden">Key Statistics</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-icon" aria-hidden="true">{stat.icon}</div>
              <div className="stat-content">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
              <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section" aria-labelledby="charts-title">
        <h2 id="charts-title" className="section-title">Data Visualization</h2>
        
        <div className="charts-grid">
          {/* Monthly Trends Chart */}
          <div className="chart-card animate-slide-up">
            <h3 className="chart-title">Monthly Complaint Trends</h3>
            <div className="chart-container">
              <Line data={monthlyData} options={lineChartOptions} />
            </div>
          </div>

          {/* Crime Type Distribution */}
          <div className="chart-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="chart-title">Crime Type Distribution</h3>
            <div className="chart-container">
              <Bar data={crimeTypeData} options={barChartOptions} />
            </div>
          </div>

          {/* Case Status */}
          <div className="chart-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="chart-title">Case Status Overview</h3>
            <div className="chart-container doughnut-container">
              <Doughnut data={statusData} options={doughnutOptions} />
            </div>
          </div>

          {/* Age Group Distribution */}
          <div className="chart-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="chart-title">Victims by Age Group</h3>
            <div className="chart-container">
              <Bar data={ageGroupData} options={barChartOptions} />
            </div>
          </div>

          {/* Recovery Rate */}
          <div className="chart-card wide animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="chart-title">Recovery Rate Trend</h3>
            <div className="chart-container">
              <Line data={recoveryRateData} options={lineChartOptions} />
            </div>
          </div>
        </div>
      </section>

      {/* Top Crimes Section */}
      <section className="top-crimes-section" aria-labelledby="top-crimes-title">
        <h2 id="top-crimes-title" className="section-title">Top Reported Crimes</h2>
        <div className="top-crimes-list">
          {topCrimes.map((crime, index) => (
            <div key={index} className="crime-item animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="crime-rank">{index + 1}</div>
              <div className="crime-info">
                <span className="crime-name">{crime.name}</span>
                <span className="crime-count">{crime.count.toLocaleString()} cases</span>
              </div>
              <div className="crime-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${crime.percentage}%` }}
                  role="progressbar"
                  aria-valuenow={crime.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="crime-percentage">{crime.percentage}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Insights Section */}
      <section className="insights-section" aria-labelledby="insights-title">
        <h2 id="insights-title" className="section-title">Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card animate-scale-in">
            <div className="insight-icon" aria-hidden="true">📈</div>
            <h3>Increasing Trend</h3>
            <p>Cyber crime complaints have increased by 12% compared to last year, with phishing being the most reported crime.</p>
          </div>
          <div className="insight-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="insight-icon" aria-hidden="true">👥</div>
            <h3>Age Demographics</h3>
            <p>The 26-35 age group is most vulnerable to cyber crimes, accounting for 35% of all reported cases.</p>
          </div>
          <div className="insight-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="insight-icon" aria-hidden="true">💰</div>
            <h3>Financial Impact</h3>
            <p>₹12.5 Crore has been recovered for victims this year, with a recovery rate of 94% in December.</p>
          </div>
          <div className="insight-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="insight-icon" aria-hidden="true">⚡</div>
            <h3>Response Time</h3>
            <p>Average complaint resolution time has decreased from 45 days to 28 days due to improved processes.</p>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download-section" aria-labelledby="download-title">
        <h2 id="download-title" className="section-title">Download Reports</h2>
        <div className="download-cards">
          <div className="download-card animate-bounce-in">
            <div className="download-icon" aria-hidden="true">📊</div>
            <h3>Monthly Report</h3>
            <p>Detailed analysis of cyber crime trends for the current month</p>
            <button 
              className="download-btn"
              onClick={() => downloadReport('monthly')}
              disabled={downloading === 'monthly'}
            >
              {downloading === 'monthly' ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  Generating...
                </>
              ) : (
                <>
                  <span aria-hidden="true">📥</span> Download PDF
                </>
              )}
            </button>
          </div>
          <div className="download-card animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            <div className="download-icon" aria-hidden="true">📈</div>
            <h3>Annual Statistics</h3>
            <p>Comprehensive yearly statistics and trend analysis</p>
            <button 
              className="download-btn"
              onClick={() => downloadReport('annual')}
              disabled={downloading === 'annual'}
            >
              {downloading === 'annual' ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  Generating...
                </>
              ) : (
                <>
                  <span aria-hidden="true">📥</span> Download PDF
                </>
              )}
            </button>
          </div>
          <div className="download-card animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <div className="download-icon" aria-hidden="true">📋</div>
            <h3>Crime Category Report</h3>
            <p>Detailed breakdown by crime category and region</p>
            <button 
              className="download-btn"
              onClick={() => downloadReport('category')}
              disabled={downloading === 'category'}
            >
              {downloading === 'category' ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  Generating...
                </>
              ) : (
                <>
                  <span aria-hidden="true">📥</span> Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Statistics;
