import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, Plus, Search, ShoppingBag, LogOut, X, Eye, Star, MapPin, SlidersHorizontal, Grid, List, Filter } from 'lucide-react';
import './App.css';
import SignupPage from './components/pages/SignupPage';

// Context for global state management
const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Sample data
const SAMPLE_ITEMS = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    description: "Classic brown leather jacket in excellent condition. Perfect for fall/winter wear with timeless style.",
    category: "outerwear",
    type: "jacket",
    size: "M",
    condition: "excellent",
    tags: ["vintage", "leather", "brown", "classic"],
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&auto=format"],
    uploader: { id: 1, name: "Sarah M.", points: 1250, location: "NYC", avatar: "SM" },
    points: 150,
    status: "available",
    uploadDate: "2024-07-10",
    views: 45,
    likes: 12
  },
  {
    id: 2,
    title: "Designer Silk Blouse",
    description: "Elegant silk blouse from premium brand. Barely worn, like new condition with beautiful draping.",
    category: "tops",
    type: "blouse",
    size: "S",
    condition: "like-new",
    tags: ["silk", "designer", "elegant", "premium"],
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&auto=format"],
    uploader: { id: 2, name: "Emma K.", points: 890, location: "LA", avatar: "EK" },
    points: 200,
    status: "available",
    uploadDate: "2024-07-11",
    views: 32,
    likes: 8
  },
  {
    id: 3,
    title: "Sustainable Denim Jeans",
    description: "Eco-friendly denim jeans made from recycled materials. Comfortable fit with environmental consciousness.",
    category: "bottoms",
    type: "jeans",
    size: "32",
    condition: "good",
    tags: ["sustainable", "denim", "eco-friendly", "recycled"],
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format"],
    uploader: { id: 3, name: "Alex R.", points: 1450, location: "SF", avatar: "AR" },
    points: 120,
    status: "available",
    uploadDate: "2024-07-09",
    views: 28,
    likes: 5
  },
  {
    id: 4,
    title: "Bohemian Maxi Dress",
    description: "Flowing maxi dress with bohemian patterns. Perfect for summer festivals and casual outings.",
    category: "dresses",
    type: "maxi dress",
    size: "M",
    condition: "good",
    tags: ["bohemian", "maxi", "summer", "festival"],
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&auto=format"],
    uploader: { id: 4, name: "Maya S.", points: 980, location: "Austin", avatar: "MS" },
    points: 130,
    status: "available",
    uploadDate: "2024-07-08",
    views: 22,
    likes: 9
  },
  {
    id: 5,
    title: "Professional Blazer",
    description: "Sharp black blazer perfect for business meetings and professional settings. Excellent tailoring.",
    category: "outerwear",
    type: "blazer",
    size: "L",
    condition: "excellent",
    tags: ["professional", "business", "black", "formal"],
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format"],
    uploader: { id: 5, name: "David L.", points: 1120, location: "Chicago", avatar: "DL" },
    points: 180,
    status: "available",
    uploadDate: "2024-07-07",
    views: 38,
    likes: 14
  },
  {
    id: 6,
    title: "Vintage Band T-Shirt",
    description: "Authentic vintage band t-shirt from the 90s. Soft cotton material with original graphics.",
    category: "tops",
    type: "t-shirt",
    size: "L",
    condition: "good",
    tags: ["vintage", "band", "90s", "cotton"],
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format"],
    uploader: { id: 6, name: "Jake W.", points: 750, location: "Seattle", avatar: "JW" },
    points: 90,
    status: "available",
    uploadDate: "2024-07-06",
    views: 41,
    likes: 7
  }
];

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setItems(SAMPLE_ITEMS);
      setFilteredItems(SAMPLE_ITEMS);
      setError(null);
    } catch (err) {
      setError('Failed to load application data');
      console.error('App initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    if (data) {
      setSelectedItem(data);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: 1,
        name: "Jordan Smith",
        email: credentials.email,
        points: 850,
        level: "Eco Warrior",
        swapsCompleted: 12,
        itemsListed: 8,
        isAdmin: false,
        avatar: "JS",
        location: "NYC",
        joinDate: "2024-01-15"
      };
      
      setUser(userData);
      addNotification('Welcome back to ReWear!', 'success');
      navigateTo('dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    addNotification('You have been logged out', 'info');
    navigateTo('landing');
  };

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const contextValue = {
    currentPage,
    setCurrentPage,
    user,
    setUser,
    items,
    setItems,
    filteredItems,
    setFilteredItems,
    selectedItem,
    setSelectedItem,
    loading,
    setLoading,
    error,
    setError,
    notifications,
    setNotifications,
    navigateTo,
    handleLogin,
    handleLogout,
    addNotification
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app">
        <Header />
        <NotificationList />
        <main className="main-content">
          <ErrorBoundary>
            {loading && currentPage === 'landing' ? (
              <LoadingSpinner />
            ) : (
              <>
                {currentPage === 'landing' && <LandingPage />}
                {currentPage === 'login' && <LoginPage />}
                {currentPage === 'browse' && <BrowsePage />}
                {currentPage === 'signup' && <SignupPage />}
              </>
            )}
          </ErrorBoundary>
        </main>
      </div>
    </AppContext.Provider>
  );
};

// Component: Error Boundary
const ErrorBoundary = ({ children }) => {
  const { error, setError } = useAppContext();
  
  if (error) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => setError(null)} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }
  return children;
};

// Component: Loading Spinner
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

// Component: Header
const Header = () => {
  const { navigateTo, user, handleLogout, currentPage } = useAppContext();
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigateTo('landing')}>
          <span className="logo-text">ReWear</span>
          <span className="logo-tagline">Sustainable Fashion</span>
        </div>
        
        <nav className="nav">
          <button 
            className={`nav-link ${currentPage === 'browse' ? 'active' : ''}`}
            onClick={() => navigateTo('browse')}
          >
            <ShoppingBag className="nav-icon" />
            Browse
          </button>
          
          {user ? (
            <>
              <button 
                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => navigateTo('dashboard')}
              >
                <User className="nav-icon" />
                Dashboard
              </button>
              
              <button 
                className="nav-link"
                onClick={() => navigateTo('add-item')}
              >
                <Plus className="nav-icon" />
                Add Item
              </button>
              
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
            </>
          ) : (
            <button 
              className="nav-link login-btn"
              onClick={() => navigateTo('login')}
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

// Component: Notification List
const NotificationList = () => {
  const { notifications, setNotifications } = useAppContext();
  
  return (
    <div className="notification-list">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
            <X className="icon" />
          </button>
        </div>
      ))}
    </div>
  );
};

// Component: Landing Page
const LandingPage = () => {
  const { navigateTo } = useAppContext();
  
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
            <button className="btn btn-primary" onClick={() => navigateTo('browse')}>
              Start Swapping
            </button>
            <button className="btn btn-secondary" onClick={() => navigateTo('browse')}>
              Browse Items
            </button>
            <button className="btn btn-accent" onClick={() => navigateTo('login')}>
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

// Component: Login Page
const LoginPage = () => {
  const { handleLogin, navigateTo, loading } = useAppContext();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await handleLogin(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back to ReWear</h2>
        <p className="auth-subtitle">Sign in to continue your sustainable fashion journey</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              disabled={loading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              disabled={loading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        
        <p className="auth-switch">
          Don't have an account? <span onClick={() => navigateTo('signup')}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

// Component: Browse Page
const BrowsePage = () => {
  const { items, navigateTo } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    let filtered = [...items];
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }
    
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        break;
      case 'points-high':
        filtered.sort((a, b) => b.points - a.points);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views + b.likes) - (a.views + a.likes));
        break;
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, filterCategory, sortBy, items]);

  const ItemCard = ({ item }) => (
    <div className="item-card" onClick={() => navigateTo('item-detail', item)}>
      <div className="item-image">
        <img src={item.images[0]} alt={item.title} loading="lazy" />
        <div className="item-status">{item.status}</div>
        <div className="item-overlay">
          <Eye className="overlay-icon" />
          <span>{item.views}</span>
        </div>
      </div>
      <div className="item-info">
        <h3>{item.title}</h3>
        <p className="item-description">{item.description.substring(0, 80)}...</p>
        <div className="item-meta">
          <span className="item-size">Size: {item.size}</span>
          <span className={`condition-badge ${item.condition}`}>{item.condition}</span>
        </div>
        <div className="item-footer">
          <div className="uploader-info">
            <div className="uploader-avatar">{item.uploader.avatar}</div>
            <span>{item.uploader.name}</span>
          </div>
          <div className="points-badge">{item.points} pts</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="browse-page">
      <nav className="breadcrumb">
        <span onClick={() => navigateTo('landing')}>Home</span>
        <span className="separator">›</span>
        <span className="current">Browse Items</span>
      </nav>
      
      <div className="browse-header">
        <h2>Discover Amazing Items</h2>
        <p className="results-count">{filteredItems.length} items found</p>
      </div>
      
      <div className="search-filters">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="outerwear">Outerwear</option>
            <option value="dresses">Dresses</option>
          </select>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="points-high">Highest Points</option>
            <option value="popular">Most Popular</option>
          </select>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="icon" />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="icon" />
            </button>
          </div>
        </div>
      </div>
      
      <div className={`items-grid ${viewMode}`}>
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="no-results">
          <h3>No items found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export { useAppContext };
export default App;