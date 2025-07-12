import React from 'react';

const LandingPage = ({ navigateTo, addNotification }) => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">ReWear</span>
            <br />
            Sustainable Fashion Exchange
          </h1>
          <p className="hero-subtitle">
            Turn your closet into a treasure hunt. Swap, earn points, and save the planet one outfit at a time.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => navigateTo('/browse')}>
              Start Swapping
            </button>
            <button className="btn btn-secondary" onClick={() => navigateTo('/browse')}>
              Browse Items
            </button>
            <button className="btn btn-accent" onClick={() => navigateTo('/login')}>
              List an Item
            </button>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Items Swapped</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Happy Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50 tons</div>
            <div className="stat-label">CO2 Saved</div>
          </div>
        </div>
      </div>
      
      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Fashion doesn't have to cost the earth. ReWear connects conscious consumers who want to give their clothes a second life while earning rewards for sustainable choices. Every swap is a step toward a more sustainable future.
        </p>
      </div>
    </div>
  );
};

export default LandingPage; 