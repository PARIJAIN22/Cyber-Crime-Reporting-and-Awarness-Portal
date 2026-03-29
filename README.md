# Cyber Crime Reporting & Awareness Portal

A comprehensive web application for reporting cyber crimes, tracking complaints, and staying informed about online threats. Built with React, this portal provides a user-friendly interface for citizens to report various types of cyber crimes and access important safety information.

## Features

### 🛡️ Core Functionality
- **Cyber Crime Reporting**: Submit complaints for various crime types including:
  - Phishing
  - UPI Fraud
  - Identity Theft
  - Online Harassment
  - Ransomware
  - Email Scams
  - Social Media Fraud
  - Credit Card Fraud
  - Investment Scams

- **Form Validation**: Comprehensive validation with:
  - Required field validation
  - Email format validation
  - Phone number validation (10-digit)
  - Date validation (no future dates)
  - Minimum description length
  - Real-time error feedback

- **Evidence Upload**: 
  - Support for images, PDFs, and videos
  - File size validation (max 10MB)
  - Preview functionality
  - Multiple file upload support

- **Complaint Tracking**: 
  - Search by complaint ID
  - Visual status timeline (Filed → Under Review → Action Taken)
  - Detailed complaint information
  - Recent complaints list

- **Scam Alerts**: 
  - Card-based alert display
  - Category-based filtering
  - Search functionality
  - Severity indicators (Critical, High, Medium, Low)
  - Warning signs and prevention tips
  - Reported cases count

- **Statistics Dashboard**: 
  - Interactive charts using Chart.js
  - Monthly complaint trends
  - Crime type distribution
  - Case status overview
  - Age group analysis
  - Recovery rate trends
  - Key insights and metrics

### 🎨 Design Features
- **Responsive Design**: Fully responsive across all devices
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Modern UI**: Clean, professional interface with smooth animations
- **Color-coded Status**: Visual indicators for complaint status and severity
- **Interactive Elements**: Hover effects, transitions, and feedback

## Technology Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.20.0
- **Charts**: Chart.js 4.4.1 with react-chartjs-2
- **Styling**: Custom CSS with CSS Variables
- **Build Tool**: Create React App

## Project Structure

```
cybercrime/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── ReportCrime.js
│   │   ├── ReportCrime.css
│   │   ├── TrackComplaint.js
│   │   ├── TrackComplaint.css
│   │   ├── ScamAlerts.js
│   │   ├── ScamAlerts.css
│   │   ├── Statistics.js
│   │   └── Statistics.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps to Run

1. **Navigate to the project directory**:
   ```bash
   cd cybercrime
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build/` directory.

## Usage Guide

### Reporting a Cyber Crime
1. Click on "Report Crime" in the navigation menu
2. Fill in your personal information (name, email, phone)
3. Select the crime type from the dropdown
4. Provide incident details (date, time, description)
5. Upload evidence files (optional but recommended)
6. Submit the form and note your complaint ID

### Tracking a Complaint
1. Click on "Track Complaint" in the navigation menu
2. Enter your complaint ID (e.g., CYB001)
3. Click "Track" to view the status
4. View the detailed timeline and current status

### Browsing Scam Alerts
1. Click on "Scam Alerts" in the navigation menu
2. Use the search bar to find specific alerts
3. Filter by category using the category buttons
4. Read about warning signs and prevention tips
5. Click "Report Similar" if you've encountered a similar scam

### Viewing Statistics
1. Click on "Statistics" in the navigation menu
2. View key metrics at the top
3. Explore interactive charts showing:
   - Monthly trends
   - Crime type distribution
   - Case status breakdown
   - Age group analysis
   - Recovery rate trends

## Key Components

### Header
- Fixed navigation bar with logo
- Responsive mobile menu
- Emergency helpline button (1930)
- Active page indicator

### Footer
- Quick links to all pages
- Crime categories
- Contact information
- Social media links
- Emergency helpline

### Report Crime Form
- Multi-section form with validation
- Personal information collection
- Incident details with date/time
- Evidence upload with preview
- Success confirmation with complaint ID

### Track Complaint
- Search functionality
- Visual status timeline
- Detailed complaint view
- Recent complaints list
- Help section with contact options

### Scam Alerts
- Filterable alert cards
- Severity indicators
- Warning signs and prevention tips
- Category-based filtering
- Search functionality

### Statistics Dashboard
- Key metrics cards
- Interactive charts (Line, Bar, Doughnut)
- Top crimes ranking
- Key insights
- Downloadable reports section

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Color contrast compliance
- Skip links for navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication and login
- Real-time notifications
- Multi-language support
- Live chat support
- Mobile app version
- Integration with law enforcement databases
- AI-powered scam detection
- Community forum

## Support

For support or queries:
- **Helpline**: 1930 (24/7)
- **Email**: cybercrime@gov.in

## License

This project is created for educational and awareness purposes.

## Acknowledgments

- National Cyber Crime Reporting Portal
- Chart.js for data visualization
- React community for excellent documentation
