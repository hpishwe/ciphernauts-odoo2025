/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, Upload, Check } from 'lucide-react';

const PALETTE = {
  green1: '#338e77', // primary
  green2: '#6db77a',
  green3: '#a3d68c',
  green4: '#eaf3c2',
  teal1: '#13bcbc',
  teal2: '#4be0db',
  teal3: '#b2f1e5',
  yellow1: '#f9fa77',
  yellow2: '#b8e986',
  yellow3: '#8dd96a',
};

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    bio: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [step, setStep] = useState(1); // Multi-step form

  // Mock functions - replace with actual context
  const handleSignup = async (userData) => {
    console.log('Signup with:', userData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    return true;
  };

  const navigateTo = (page) => {
    console.log('Navigate to:', page);
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
    }
    
    if (isValid && step < 3) {
      setStep(step + 1);
    } else if (isValid && step === 3) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const success = await handleSignup(formData);
      if (success) {
        // Redirect to dashboard on success
        navigateTo('dashboard');
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return score;
  };

  const getStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength <= 2) return { label: 'Weak', color: '#ff6b6b' };
    if (strength <= 3) return { label: 'Fair', color: '#fbbf24' };
    if (strength <= 4) return { label: 'Good', color: '#4ade80' };
    return { label: 'Strong', color: '#22c55e' };
  };

  const ProgressBar = () => (
    <div className="progress-bar">
      <div className="progress-steps">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className={`progress-step ${step >= stepNumber ? 'active' : ''}`}>
            <div className="step-circle">
              {step > stepNumber ? <Check className="check-icon" /> : stepNumber}
            </div>
            <span className="step-label">
              {stepNumber === 1 && 'Personal Info'}
              {stepNumber === 2 && 'Security'}
              {stepNumber === 3 && 'Profile'}
            </span>
          </div>
        ))}
      </div>
      <div className="progress-line">
        <div 
          className="progress-fill" 
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  );

  const SocialSignup = () => (
    <div className="social-signup">
      <div className="auth-divider">
        <span>or sign up with</span>
      </div>
      
      <div className="social-buttons">
        <button className="btn btn-social btn-google">
          <svg className="icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <button className="btn btn-social btn-github">
          <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>
      </div>
    </div>
  );

  return (
    <div className="auth-page signup-page">
      <div className="auth-container">
        <div className="auth-card glass-effect">
          <div className="auth-header">
            <h2 className="auth-title">Join ReWear Community</h2>
            <p className="auth-subtitle">
              Start your sustainable fashion journey today and make a positive impact
            </p>
          </div>

          <ProgressBar />

          <form className="signup-form">
            {step === 1 && (
              <div className="form-step">
                <h3 className="step-title">Personal Information</h3>
                
                <div className="form-group">
                  <label htmlFor="name">
                    <User className="field-icon" />
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    disabled={loading}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <Mail className="field-icon" />
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    disabled={loading}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="location">
                    <MapPin className="field-icon" />
                    Location (Optional)
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h3 className="step-title">Create Your Password</h3>
                
                <div className="form-group">
                  <label htmlFor="password">
                    <Lock className="field-icon" />
                    Password
                  </label>
                  <div className="password-field">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? 'error' : ''}
                      disabled={loading}
                    />
                  </div>
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className="strength-fill" 
                          style={{ 
                            width: `${(getPasswordStrength() / 5) * 100}%`,
                            backgroundColor: getStrengthLabel().color
                          }}
                        />
                      </div>
                      <span 
                        className="strength-label"
                        style={{ color: getStrengthLabel().color }}
                      >
                        {getStrengthLabel().label}
                      </span>
                    </div>
                  )}
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <Lock className="field-icon" />
                    Confirm Password
                  </label>
                  <div className="password-field">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'error' : ''}
                      disabled={loading}
                    />
                  </div>
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <div className="password-requirements">
                  <h4>Password Requirements:</h4>
                  <ul>
                    <li className={formData.password.length >= 8 ? 'valid' : ''}>
                      At least 8 characters
                    </li>
                    <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                      One lowercase letter
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                      One uppercase letter
                    </li>
                    <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                      One number
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h3 className="step-title">Complete Your Profile</h3>
                
                <div className="form-group">
                  <label>Profile Picture (Optional)</label>
                  <div className="image-upload">
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="profile-image" className="image-upload-area">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-preview" />
                      ) : (
                        <div className="upload-placeholder">
                          <Upload className="upload-icon" />
                          <span>Click to upload photo</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="bio">
                    Bio (Optional)
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us a bit about yourself and your style..."
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    maxLength="500"
                    disabled={loading}
                  />
                  <div className="char-count">
                    {formData.bio.length}/500 characters
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="checkmark"></span>
                    I agree to the{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
                </div>

                <div className="newsletter-signup">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                    Send me updates about new features and sustainability tips
                  </label>
                </div>
              </div>
            )}

            {errors.submit && (
              <div className="error-message">
                {errors.submit}
              </div>
            )}

            <div className="form-navigation">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Back
                </button>
              )}
              
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    {step === 3 ? 'Creating Account...' : 'Processing...'}
                  </>
                ) : (
                  step === 3 ? 'Create Account' : 'Next'
                )}
              </button>
            </div>
          </form>

          {step === 1 && <SocialSignup />}

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => navigateTo('login')}
                className="auth-link"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        <div className="signup-benefits">
          <h3>Why Join ReWear?</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">🌱</div>
              <div>
                <strong>Make an Impact</strong>
                <p>Reduce fashion waste and contribute to a more sustainable future</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <div>
                <strong>Earn While You Swap</strong>
                <p>Get points for every sustainable action and redeem them for items</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">👥</div>
              <div>
                <strong>Join a Community</strong>
                <p>Connect with 5,000+ eco-conscious fashion enthusiasts</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🛡️</div>
              <div>
                <strong>Safe & Secure</strong>
                <p>Your data is protected with enterprise-grade security</p>
              </div>
            </div>
          </div>

          <div className="trust-indicators">
            <div className="trust-item">
              <strong>10,000+</strong>
              <span>Happy Members</span>
            </div>
            <div className="trust-item">
              <strong>50 tons</strong>
              <span>CO2 Saved</span>
            </div>
            <div className="trust-item">
              <strong>4.8★</strong>
              <span>User Rating</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .signup-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .auth-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1200px;
          width: 100%;
          align-items: start;
        }

        .auth-card {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          backdrop-filter: blur(10px);
        }

        .progress-bar {
          margin-bottom: 2rem;
          position: relative;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-input);
          border: 2px solid var(--border-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .progress-step.active .step-circle {
          background: var(--primary-gradient);
          border-color: transparent;
          color: white;
        }

        .check-icon {
          width: 20px;
          height: 20px;
        }

        .step-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
        }

        .progress-step.active .step-label {
          color: var(--text-primary);
          font-weight: 500;
        }

        .progress-line {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          height: 2px;
          background: var(--border-primary);
          z-index: 1;
        }

        .progress-fill {
          height: 100%;
          background: var(--primary-gradient);
          border-radius: 1px;
          transition: width 0.3s ease;
        }

        .form-step {
          margin-bottom: 2rem;
        }

        .step-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          text-align: center;
        }

        .password-strength {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .strength-bar {
          flex: 1;
          height: 4px;
          background: var(--bg-input);
          border-radius: 2px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .strength-label {
          font-size: 0.8rem;
          font-weight: 500;
        }

        .password-requirements {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-secondary);
          border-radius: var(--radius-medium);
        }

        .password-requirements h4 {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .password-requirements ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .password-requirements li {
          font-size: 0.8rem;
          color: var(--text-muted);
          position: relative;
          padding-left: 1.5rem;
        }

        .password-requirements li::before {
          content: '✗';
          position: absolute;
          left: 0;
          color: var(--error-color);
        }

        .password-requirements li.valid {
          color: var(--success-color);
        }

        .password-requirements li.valid::before {
          content: '✓';
          color: var(--success-color);
        }

        .image-upload-area {
          display: block;
          width: 120px;
          height: 120px;
          border: 2px dashed var(--border-primary);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 auto;
          overflow: hidden;
        }

        .image-upload-area:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 0.5rem;
          color: var(--text-muted);
        }

        .upload-icon {
          width: 24px;
          height: 24px;
        }

        .upload-placeholder span {
          font-size: 0.8rem;
          text-align: center;
        }

        .profile-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .char-count {
          text-align: right;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .checkbox-label input[type="checkbox"] {
          width: auto;
          margin: 0;
        }

        .checkbox-label a {
          color: #667eea;
          text-decoration: underline;
        }

        .newsletter-signup {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(102, 126, 234, 0.05);
          border: 1px solid rgba(102, 126, 234, 0.1);
          border-radius: var(--radius-medium);
        }

        .form-navigation {
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          margin-top: 2rem;
        }

        .form-navigation .btn {
          flex: 1;
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .error-message {
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid var(--error-color);
          color: var(--error-color);
          padding: 1rem;
          border-radius: var(--radius-medium);
          margin-bottom: 1rem;
          text-align: center;
        }

        .signup-benefits {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          backdrop-filter: blur(10px);
        }

        .signup-benefits h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .benefit-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .benefit-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-input);
          border-radius: var(--radius-medium);
          flex-shrink: 0;
        }

        .benefit-item strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.25rem;
          font-size: 0.95rem;
        }

        .benefit-item p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.4;
          margin: 0;
        }

        .trust-indicators {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-secondary);
        }

        .trust-item {
          text-align: center;
        }

        .trust-item strong {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 0.25rem;
        }

        .trust-item span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .auth-divider {
          text-align: center;
          margin: 1.5rem 0;
          position: relative;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border-primary);
          z-index: 1;
        }

        .auth-divider span {
          background: var(--bg-card);
          padding: 0 1rem;
          position: relative;
          z-index: 2;
        }

        .social-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .btn-social {
          background: var(--bg-input);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          justify-content: center;
          transition: all 0.3s ease;
          padding: 0.75rem 1rem;
        }

        .btn-social:hover {
          background: var(--bg-card);
          border-color: var(--border-primary);
          transform: translateY(-1px);
        }

        .btn-google:hover {
          border-color: #4285f4;
          color: #4285f4;
        }

        .btn-github:hover {
          border-color: #333;
          color: #333;
          background: #f6f8fa;
        }

        .auth-footer {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-secondary);
        }

        .auth-footer p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .auth-link {
          background: none;
          border: none;
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .auth-link:hover {
          color: #764ba2;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .auth-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 600px;
          }

          .signup-benefits {
            order: -1;
          }

          .trust-indicators {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .signup-page {
            padding: 1rem;
          }

          .auth-card,
          .signup-benefits {
            padding: 2rem;
          }

          .progress-steps {
            flex-direction: column;
            gap: 1rem;
          }

          .progress-line {
            display: none;
          }

          .step-circle {
            width: 35px;
            height: 35px;
          }

          .form-navigation {
            flex-direction: column;
          }

          .password-requirements ul {
            grid-template-columns: 1fr;
          }

          .trust-indicators {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .social-buttons {
            gap: 0.5rem;
          }

          .btn-social {
            font-size: 0.9rem;
            padding: 0.6rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .auth-card,
          .signup-benefits {
            padding: 1.5rem;
          }

          .step-title {
            font-size: 1.1rem;
          }

          .image-upload-area {
            width: 100px;
            height: 100px;
          }

          .upload-placeholder span {
            font-size: 0.7rem;
          }

          .benefits-list {
            gap: 1rem;
          }

          .benefit-item {
            flex-direction: column;
            text-align: center;
          }

          .benefit-icon {
            margin: 0 auto;
          }
        }

        /* Animation Enhancements */
        .form-step {
          animation: fadeInUp 0.3s ease-out;
        }

        .benefit-item {
          animation: fadeInUp 0.4s ease-out;
        }

        .benefit-item:nth-child(2) {
          animation-delay: 0.1s;
        }

        .benefit-item:nth-child(3) {
          animation-delay: 0.2s;
        }

        .benefit-item:nth-child(4) {
          animation-delay: 0.3s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Focus states for accessibility */
        .image-upload-area:focus-within {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }

        .checkbox-label:focus-within {
          outline: 2px solid #667eea;
          outline-offset: 2px;
          border-radius: var(--radius-small);
        }

        /* Custom checkbox styling */
        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid var(--border-primary);
          border-radius: 3px;
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
          background: var(--primary-gradient);
          border-color: transparent;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 0.8rem;
          font-weight: bold;
        }

        /* Loading state improvements */
        .auth-card.loading {
          pointer-events: none;
          opacity: 0.7;
        }

        .form-navigation .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Enhanced glassmorphism effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        /* Step transition effects */
        .progress-step {
          transition: all 0.3s ease;
        }

        .progress-step.active {
          transform: scale(1.05);
        }

        /* Hover effects for better UX */
        .benefit-item:hover {
          transform: translateX(5px);
          transition: transform 0.2s ease;
        }

        .benefit-item:hover .benefit-icon {
          background: rgba(102, 126, 234, 0.1);
          transition: background 0.2s ease;
        }
      `}</style>
      <style>{`
        :root {
          --primary1: ${PALETTE.green1};
          --primary2: ${PALETTE.green2};
          --primary3: ${PALETTE.green3};
          --primary4: ${PALETTE.green4};
          --accent1: ${PALETTE.teal1};
          --accent2: ${PALETTE.teal2};
          --accent3: ${PALETTE.teal3};
          --accent4: ${PALETTE.yellow1};
          --accent5: ${PALETTE.yellow2};
          --accent6: ${PALETTE.yellow3};
          --primary-gradient: linear-gradient(90deg, var(--primary1), var(--primary2), var(--primary3));
          --accent-gradient: linear-gradient(90deg, var(--accent4), var(--accent5), var(--accent6));
          --bg-main: var(--primary4);
          --bg-card: #fff;
          --border-primary: var(--primary3);
          --text-primary: #222;
          --text-secondary: var(--primary1);
          --radius-large: 18px;
          --radius-medium: 12px;
          --radius-small: 6px;
          --shadow-large: 0 8px 32px rgba(51,142,119,0.12);
        }
        .auth-page, .signup-page {
          background: var(--bg-main);
        }
        .auth-card, .glass-effect, .signup-benefits {
          background: rgba(255,255,255,0.85);
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-large);
          backdrop-filter: blur(8px);
        }
        .btn-primary {
          background: var(--primary-gradient);
          color: #fff;
          border: none;
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-large);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .btn-primary:hover {
          background: var(--accent-gradient);
          box-shadow: 0 12px 32px rgba(77,185,122,0.18);
        }
        .btn-social {
          background: var(--accent5);
          color: #222;
          border: none;
          border-radius: var(--radius-medium);
          box-shadow: var(--shadow-large);
        }
        .btn-social:hover {
          background: var(--accent2);
          color: #fff;
        }
        .auth-title, .signup-benefits h3 {
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .auth-link {
          color: var(--primary1);
        }
      `}</style>
    </div>
  );
};

export default SignupPage;