import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useForm } from '../hooks/useForm';
import './ReportCrime.css';

function ReportCrime() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addComplaint, addNotification } = useApp();
  const fileInputRef = useRef(null);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState('');

  // Get pre-filled data from location state (from ScamAlerts)
  const preFilledData = location.state || {};

  // Validation function
  const validateForm = useCallback((values) => {
    const errors = {};

    if (!values.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (values.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters';
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!values.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(values.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!values.crimeType) {
      errors.crimeType = 'Please select a crime type';
    }

    if (!values.incidentDate) {
      errors.incidentDate = 'Incident date is required';
    } else {
      const selectedDate = new Date(values.incidentDate);
      const today = new Date();
      if (selectedDate > today) {
        errors.incidentDate = 'Incident date cannot be in the future';
      }
    }

    if (!values.description.trim()) {
      errors.description = 'Description is required';
    } else if (values.description.trim().length < 20) {
      errors.description = 'Description must be at least 20 characters';
    }

    if (values.amountLost && isNaN(parseFloat(values.amountLost))) {
      errors.amountLost = 'Please enter a valid amount';
    }

    return errors;
  }, []);

  // Submit handler
  const handleSubmit = useCallback(async (values) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newComplaintId = addComplaint({
      type: values.crimeType,
      description: values.description,
      evidence: previewFiles.map(f => f.name).join(', ')
    });

    setComplaintId(newComplaintId);
    setSubmitSuccess(true);
    
    addNotification({
      type: 'success',
      message: `Complaint ${newComplaintId} filed successfully!`
    });
  }, [addComplaint, addNotification, previewFiles]);

  // Initial form values
  const initialValues = useMemo(() => ({
    fullName: '',
    email: '',
    phone: '',
    crimeType: preFilledData.crimeType || '',
    incidentDate: '',
    incidentTime: '',
    description: '',
    amountLost: '',
    suspectInfo: '',
    evidence: []
  }), [preFilledData.crimeType]);

  // Use custom form hook
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: onFormSubmit,
    setFieldValue
  } = useForm(initialValues, validateForm, handleSubmit);

  // Crime types
  const crimeTypes = useMemo(() => [
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
  ], []);

  // Handle file change
  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const newPreviews = [];

    files.forEach(file => {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'video/mp4'];
      if (!validTypes.includes(file.type)) {
        addNotification({
          type: 'error',
          message: `File ${file.name} is not a supported format. Please upload images, PDFs, or videos.`
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        addNotification({
          type: 'error',
          message: `File ${file.name} is too large. Maximum size is 10MB.`
        });
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

    setFieldValue('evidence', [...values.evidence, ...validFiles]);
  }, [values.evidence, setFieldValue, addNotification]);

  // Remove file
  const removeFile = useCallback((index) => {
    setPreviewFiles(prev => prev.filter((_, i) => i !== index));
    setFieldValue('evidence', values.evidence.filter((_, i) => i !== index));
  }, [values.evidence, setFieldValue]);

  // Reset form
  const resetForm = useCallback(() => {
    setSubmitSuccess(false);
    setComplaintId('');
    setPreviewFiles([]);
  }, []);

  if (submitSuccess) {
    return (
      <div className="report-crime">
        <div className="success-container animate-scale-in">
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
              onClick={resetForm}
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

      <form onSubmit={onFormSubmit} className="report-form" noValidate>
        {/* Personal Information Section */}
        <section className="form-section animate-fade-in" aria-labelledby="personal-info-title">
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
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.fullName && touched.fullName ? 'error' : ''}`}
                placeholder="Enter your full name"
                aria-describedby={errors.fullName && touched.fullName ? 'fullName-error' : undefined}
                aria-invalid={errors.fullName && touched.fullName ? 'true' : 'false'}
                required
              />
              {errors.fullName && touched.fullName && (
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
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                required
              />
              {errors.email && touched.email && (
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
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                placeholder="Enter your 10-digit phone number"
                aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                required
              />
              {errors.phone && touched.phone && (
                <span id="phone-error" className="error-message" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Incident Details Section */}
        <section className="form-section animate-fade-in" style={{ animationDelay: '0.1s' }} aria-labelledby="incident-details-title">
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
                value={values.crimeType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-select ${errors.crimeType && touched.crimeType ? 'error' : ''}`}
                aria-describedby={errors.crimeType && touched.crimeType ? 'crimeType-error' : undefined}
                aria-invalid={errors.crimeType && touched.crimeType ? 'true' : 'false'}
                required
              >
                {crimeTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.crimeType && touched.crimeType && (
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
                value={values.incidentDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.incidentDate && touched.incidentDate ? 'error' : ''}`}
                max={new Date().toISOString().split('T')[0]}
                aria-describedby={errors.incidentDate && touched.incidentDate ? 'incidentDate-error' : undefined}
                aria-invalid={errors.incidentDate && touched.incidentDate ? 'true' : 'false'}
                required
              />
              {errors.incidentDate && touched.incidentDate && (
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
                value={values.incidentTime}
                onChange={handleChange}
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
                value={values.amountLost}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.amountLost && touched.amountLost ? 'error' : ''}`}
                placeholder="Enter amount if applicable"
                min="0"
                step="0.01"
                aria-describedby={errors.amountLost && touched.amountLost ? 'amountLost-error' : undefined}
              />
              {errors.amountLost && touched.amountLost && (
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
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-textarea ${errors.description && touched.description ? 'error' : ''}`}
              placeholder="Please provide detailed description of the incident..."
              rows="5"
              aria-describedby={errors.description && touched.description ? 'description-error' : undefined}
              aria-invalid={errors.description && touched.description ? 'true' : 'false'}
              required
            />
            {errors.description && touched.description && (
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
              value={values.suspectInfo}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Any information about the suspect (phone number, email, website, etc.)"
              rows="3"
            />
          </div>
        </section>

        {/* Evidence Upload Section */}
        <section className="form-section animate-fade-in" style={{ animationDelay: '0.2s' }} aria-labelledby="evidence-title">
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
                <div key={index} className="file-preview-item animate-scale-in">
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
        <div className="form-actions animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
