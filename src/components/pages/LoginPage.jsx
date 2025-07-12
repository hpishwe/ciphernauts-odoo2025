import React, { useState, useContext } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { AppContext } from '../../App';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const appContext = useContext(AppContext);
  const navigateTo = appContext ? appContext.navigateTo : (page) => console.log('Navigate to:', page);

  // Get context functions (in real app, use useContext)
  const handleLogin = async (credentials) => {
    // This would normally come from context
    console.log('Login with:', credentials);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await handleLogin(formData);
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
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

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card glass-effect">
          <div className="auth-header">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">
              Sign in to continue your sustainable fashion journey
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
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
                autoComplete="email"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              
              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>or</span>
          </div>
          
          <div className="social-login">
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
          
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <button 
                onClick={() => navigateTo('signup')}
                className="auth-link"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>
        
        <div className="auth-benefits">
          <h3>Why join ReWear?</h3>
          <ul>
            <li>
              <div className="benefit-icon">🌱</div>
              <div>
                <strong>Sustainable Fashion</strong>
                <p>Give your clothes a second life and reduce fashion waste</p>
              </div>
            </li>
            <li>
              <div className="benefit-icon">🎯</div>
              <div>
                <strong>Earn Points</strong>
                <p>Get rewarded for every sustainable action you take</p>
              </div>
            </li>
            <li>
              <div className="benefit-icon">🤝</div>
              <div>
                <strong>Community</strong>
                <p>Connect with like-minded fashion enthusiasts</p>
              </div>
            </li>
            <li>
              <div className="benefit-icon">💎</div>
              <div>
                <strong>Unique Finds</strong>
                <p>Discover one-of-a-kind pieces you won't find anywhere else</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <style jsx>{`
        .auth-page {
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
          max-width: 1000px;
          width: 100%;
          align-items: center;
        }

        .auth-card {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          padding: 3rem;
          max-width: 450px;
          width: 100%;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .field-icon {
          width: 16px;
          height: 16px;
          color: var(--text-muted);
        }

        .password-field {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.25rem;
        }

        .password-toggle:hover {
          color: var(--text-primary);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.5rem 0;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .checkbox-label input[type="checkbox"] {
          width: auto;
          margin: 0;
        }

        .forgot-password {
          background: none;
          border: none;
          color: #667eea;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: underline;
        }

        .forgot-password:hover {
          color: #764ba2;
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
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

        .social-login {
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

        .auth-benefits {
          max-width: 400px;
        }

        .auth-benefits h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .auth-benefits ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .auth-benefits li {
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
          background: var(--bg-card);
          border-radius: var(--radius-medium);
          flex-shrink: 0;
        }

        .auth-benefits strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.25rem;
        }

        .auth-benefits p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0;
        }

        @media (max-width: 768px) {
          .auth-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .auth-card {
            padding: 2rem;
            max-width: none;
          }

          .auth-benefits {
            order: -1;
            max-width: none;
          }

          .social-login {
            gap: 0.5rem;
          }

          .btn-social {
            font-size: 0.9rem;
            padding: 0.6rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .auth-page {
            padding: 1rem;
          }

          .auth-card {
            padding: 1.5rem;
          }

          .auth-title {
            font-size: 1.7rem;
          }

          .form-options {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;