import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import LandingPage from '../components/pages/LandingPage';
import BrowsePage from '../components/pages/BrowsePage';
import ProductDetailPage from '../components/pages/ProductDetailPage';
import LoginPage from '../components/pages/LoginPage';
import SignupPage from '../components/pages/SignupPage';
import UserDashboard from '../components/pages/UserDashboard';
import AdminDashboard from '../components/pages/AdminDashboard';
import TransactionPage from '../components/pages/TransactionPage';
import AddProductPage from '../components/pages/AddProductPage';

// Import components
import Header from '../components/common/Header';
import NotificationList from '../components/common/NotificationList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';

const AppRoutes = ({ 
  user, 
  loading, 
  error, 
  notifications, 
  setNotifications,
  navigateTo,
  handleLogin,
  handleLogout,
  addNotification,
  items // <-- add items prop
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  return (
    <Router>
      <div className="app">
        <Header 
          user={user} 
          handleLogout={handleLogout}
          navigateTo={navigateTo}
        />
        <NotificationList 
          notifications={notifications}
          setNotifications={setNotifications}
        />
        
        <main className="main-content">
          <ErrorBoundary>
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/" 
                element={
                  <LandingPage 
                    navigateTo={navigateTo}
                    addNotification={addNotification}
                  />
                } 
              />
              
              <Route 
                path="/browse" 
                element={
                  <BrowsePage 
                    navigateTo={navigateTo}
                    addNotification={addNotification}
                    user={user}
                    items={items}
                  />
                } 
              />
              
              <Route 
                path="/product/:id" 
                element={
                  <ProductDetailPage 
                    products={items} // <-- pass items as products
                    user={user} // <-- pass user
                    addNotification={addNotification} // <-- pass addNotification
                    navigateTo={navigateTo}
                  />
                } 
              />
              
              <Route 
                path="/login" 
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LoginPage 
                      handleLogin={handleLogin}
                      navigateTo={navigateTo}
                      addNotification={addNotification}
                    />
                  )
                } 
              />
              
              <Route 
                path="/signup" 
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <SignupPage 
                      navigateTo={navigateTo}
                      addNotification={addNotification}
                    />
                  )
                } 
              />
              
              <Route 
                path="/transaction" 
                element={
                  <TransactionPage 
                    addNotification={addNotification}
                  />
                } 
              />
              
              <Route 
                path="/add-item" 
                element={
                  <AddProductPage 
                    navigateTo={navigateTo}
                    addNotification={addNotification}
                  />
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  user ? (
                    <UserDashboard 
                      user={user}
                      navigateTo={navigateTo}
                      addNotification={addNotification}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              
              <Route 
                path="/admin" 
                element={
                  user && user.isAdmin ? (
                    <AdminDashboard 
                      user={user}
                      navigateTo={navigateTo}
                      addNotification={addNotification}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              {/* Catch all route */}
              <Route 
                path="*" 
                element={<Navigate to="/" replace />} 
              />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  );
};

export default AppRoutes; 