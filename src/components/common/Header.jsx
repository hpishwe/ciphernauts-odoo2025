import React from 'react';
import { User, Plus, Search, ShoppingBag, LogOut, X } from 'lucide-react';

const Header = ({ user, handleLogout, navigateTo }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigateTo('/')}>
          <span className="logo-text large">ReWear</span>
          <span className="logo-tagline">Sustainable Fashion</span>
        </div>
        <div className="header-right">
          <nav className="nav">
            <button 
              className="nav-link"
              onClick={() => navigateTo('/browse')}
            >
              <ShoppingBag className="nav-icon" />
              Browse
            </button>
            <button 
              className="nav-link"
              onClick={() => navigateTo('/dashboard')}
            >
              <User className="nav-icon" />
              Dashboard
            </button>
            <button 
              className="nav-link"
              onClick={() => navigateTo('/add-item')}
            >
              <Plus className="nav-icon" />
              Add Item
            </button>
          </nav>
          {user && (
            <div className="user-menu">
              <div className="user-avatar">{user.avatar}</div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-points">{user.points} pts</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut className="icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 