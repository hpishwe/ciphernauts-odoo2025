import React from 'react';

const ErrorBoundary = ({ error, children }) => {
  if (error) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return children;
};

export default ErrorBoundary; 