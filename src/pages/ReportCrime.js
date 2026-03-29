import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportCrime.css';

function ReportCrime({ addComplaint }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    crimeType: '',
    incidentDate: '',
    incidentTime: '',
    description: '',
    amountLost: '',
    suspectInfo: '',
    evidence: []
  });

  const [errors, setErrors] = useState({});
  const [previewFiles, setPreviewFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState('');

  const crimeTypes = [
    { value: '', label: 'Select Crime Type' },
    { value: 'Phishing', label: 'Phishing' },
    { value: 'UPI Fraud', label: 'UPI Fraud' },
    { value: 'Identity Theft', label: 'Identity Theft' },
    { value: 'Online Harassment', label: 'Online Harassment' },
    { value: 'Ransomware', label: 'Ransomware' },
    { value: 'Email Scams', label: 'Email Scams' },
    { value: 'Social Media Fraud', label: 'Social Media Fraud' },
    { value: 'Credit Card Fraud', label: 'Credit Card Fraud' },
    { value: 'Investment Scam', label: 'Investment Scam' },
    { value: 'Other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.crimeType) {
      newErrors.crimeType = 'Please select a crime type';
    }

    if (!formData.incidentDate) {
      newErrors.incidentDate = 'Incident date is required';
    } else {
      const selectedDate = new Date(formData.incidentDate);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.incidentDate = 'Incident date cannot be in the future';
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (formData.amountLost && isNaN(parseFloat(formData.amountLost))) {
      newErrors.amountLost = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const newPreviews = [];

    files.forEach(file => {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'video/mp4'];
      if (!validTypes.includes(file.type)) {
        alert(`File ${file.name} is not a supported format. Please upload images, PDFs, or videos.`);
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      validFiles.push(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({
          name: file.name,
          type: file.type,
          url: e.target.result,
          size: file.size
        });
        setPreviewFiles([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });

    setFormData(prev => ({
      ...prev,
      evidence: [...prev.evidence, ...validFiles]
    }));
  };

  const removeFile = (index) => {
    setPreviewFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newComplaintId = addComplaint({
      type: formData.crimeType,
      description: formData.description,
      evidence: previewFiles.map(f => f.name).join(', ')
    });

    setComplaintId(newComplaintId);
    setSubmitSuccess(true);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      crimeType: '',
      incidentDate: '',
      incidentTime: '',
      description: '',
      amountLost: '',
      suspectInfo: '',
      evidence: []
    });
    setPreviewFiles([]);
  };

  if (submitSuccess) {
    return (
      <div className="report-crime">
        <div className="success-container">
          <div className="success-icon" aria-hidden="true">✅</div>
          <h1 className="success-title">Complaint Filed Successfully!</h1>
          <p className="success-message">
            Your complaint has been registered with ID: <strong>{complaintId}</strong>
          </p>
          <p className="success-info">
            You will receive a confirmation email shortly. You can track the status of your complaint using the complaint ID.
          </p>
          <div className="success-actions">
            <button 
              onClick={() => navigate('/track')}
              className="btn btn-primary"
            >
              Track Your Complaint
            </button>
            <button 
              onClick={() => setSubmitSuccess(false)}
              className="btn btn-secondary"
            >
              File Another Complaint
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-crime">
      <div className="page-header">
        <h1 className="page-title">Report Cyber Crime</h1>
        <p className="page-subtitle">
          File your complaint online. All information provided will be kept confidential.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="report-form" noValidate>
        {/* Personal Information Section */}
        <section className="form-section" aria-labelledby="personal-info-title">
          <h2 id="personal-info-title" className="section-title">
            <span className="section-icon" aria-hidden="true">👤</span>
            Personal Information
          </h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name <span className="required" aria-label="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="Enter your full name"
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                aria-invalid={errors.fullName ? 'true' : 'false'}
                required
              />
              {errors.fullName && (
                <span id="fullName-error" className="error-message" role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required" aria-label="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={errors.email ? 'true' : 'false'}
                required
              />
              {errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="required" aria-label="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="Enter your 10-digit phone number"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                aria-invalid={errors.phone ? 'true' : 'false'}
                required
              />
              {errors.phone && (
                <span id="phone-error" className="error-message" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Incident Details Section */}
        <section className="form-section" aria-labelledby="incident-details-title">
          <h2 id="incident-details-title" className="section-title">
            <span className="section-icon" aria-hidden="true">📋</span>
            Incident Details
          </h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="crimeType" className="form-label">
                Crime Type <span className="required" aria-label="required">*</span>
              </label>
              <select
                id="crimeType"
                name="crimeType"
                value={formData.crimeType}
                onChange={handleInputChange}
                className={`form-select ${errors.crimeType ? 'error' : ''}`}
                aria-describedby={errors.crimeType ? 'crimeType-error' : undefined}
                aria-invalid={errors.crimeType ? 'true' : 'false'}
                required
              >
                {crimeTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.crimeType && (
                <span id="crimeType-error" className="error-message" role="alert">
                  {errors.crimeType}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="incidentDate" className="form-label">
                Date of Incident <span className="required" aria-label="required">*</span>
              </label>
              <input
                type="date"
                id="incidentDate"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleInputChange}
                className={`form-input ${errors.incidentDate ? 'error' : ''}`}
                max={new Date().toISOString().split('T')[0]}
                aria-describedby={errors.incidentDate ? 'incidentDate-error' : undefined}
                aria-invalid={errors.incidentDate ? 'true' : 'false'}
                required
              />
              {errors.incidentDate && (
                <span id="incidentDate-error" className="error-message" role="alert">
                  {errors.incidentDate}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="incidentTime" className="form-label">
                Time of Incident (Approximate)
              </label>
              <input
                type="time"
                id="incidentTime"
                name="incidentTime"
                value={formData.incidentTime}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amountLost" className="form-label">
                Amount Lost (₹)
              </label>
              <input
                type="number"
                id="amountLost"
                name="amountLost"
                value={formData.amountLost}
                onChange={handleInputChange}
                className={`form-input ${errors.amountLost ? 'error' : ''}`}
                placeholder="Enter amount if applicable"
                min="0"
                step="0.01"
                aria-describedby={errors.amountLost ? 'amountLost-error' : undefined}
              />
              {errors.amountLost && (
                <span id="amountLost-error" className="error-message" role="alert">
                  {errors.amountLost}
                </span>
              )}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description" className="form-label">
              Description of Incident <span className="required" aria-label="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Please provide detailed description of the incident..."
              rows="5"
              aria-describedby={errors.description ? 'description-error' : undefined}
              aria-invalid={errors.description ? 'true' : 'false'}
              required
            />
            {errors.description && (
              <span id="description-error" className="error-message" role="alert">
                {errors.description}
              </span>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="suspectInfo" className="form-label">
              Suspect Information (if known)
            </label>
            <textarea
              id="suspectInfo"
              name="suspectInfo"
              value={formData.suspectInfo}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Any information about the suspect (phone number, email, website, etc.)"
              rows="3"
            />
          </div>
        </section>

        {/* Evidence Upload Section */}
        <section className="form-section" aria-labelledby="evidence-title">
          <h2 id="evidence-title" className="section-title">
            <span className="section-icon" aria-hidden="true">📎</span>
            Evidence Upload
          </h2>
          
          <div className="upload-area">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="file-input"
              accept="image/*,.pdf,video/mp4"
              multiple
              aria-label="Upload evidence files"
            />
            <div 
              className="upload-zone"
              onClick={() => fileInputRef.current.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current.click()}
              tabIndex="0"
              role="button"
              aria-label="Click to upload evidence files"
            >
              <div className="upload-icon" aria-hidden="true">📁</div>
              <p className="upload-text">
                <strong>Click to upload</strong> or drag and drop
              </p>
              <p className="upload-hint">
                Images, PDFs, or videos (max 10MB each)
              </p>
            </div>
          </div>

          {previewFiles.length > 0 && (
            <div className="file-preview-list" aria-label="Uploaded files preview">
              {previewFiles.map((file, index) => (
                <div key={index} className="file-preview-item">
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={file.url} 
                      alt={`Preview of ${file.name}`}
                      className="file-preview-image"
                    />
                  ) : (
                    <div className="file-preview-icon" aria-hidden="true">
                      {file.type === 'application/pdf' ? '📄' : '🎥'}
                    </div>
                  )}
                  <div className="file-preview-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="remove-file-btn"
                    aria-label={`Remove ${file.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Submit Section */}
        <div className="form-actions">
          <p className="form-note">
            <span className="required">*</span> Required fields
          </p>
          <button 
            type="submit" 
            className="btn btn-primary btn-large"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                Submitting...
              </>
            ) : (
              <>
                <span aria-hidden="true">📝</span> Submit Complaint
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportCrime;
