import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, Plus, Search, ShoppingBag, LogOut, X, Eye, Star, MapPin, SlidersHorizontal, Grid, List, Filter } from 'lucide-react';
import './App.css';
import SignupPage from './components/pages/SignupPage';
import UserDashboard from './components/pages/UserDashboard';
import AdminDashboard from './components/pages/AdminDashboard';

// Context for global state management
const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Add color palette CSS variables to the app root
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

// Add at the top, after imports
const HERO_IMAGE = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80';
const CATEGORIES = [
  { name: 'Tops', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Bottoms', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Outerwear', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dresses', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Accessories', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
];
const TRENDING = [
  { name: 'Eco Denim Jacket', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80', hot: true },
  { name: 'Summer Maxi Dress', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', hot: false },
  { name: 'Classic White Tee', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', hot: true },
  { name: 'Statement Bag', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', hot: false },
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
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // eslint-disable-next-line no-unused-vars
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
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
          :root {
            font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
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
          body, .app {
            font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
            background: var(--bg-main);
            color: var(--text-primary);
          }
          .header, .main-content, .notification-list, .error-boundary, .auth-page, .landing-page, .browse-page {
            background: transparent;
          }
          .btn-primary {
            background: var(--primary-gradient);
            color: #fff;
            border: none;
            border-radius: var(--radius-large);
            box-shadow: var(--shadow-large);
            transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
          }
          .btn-primary:hover {
            background: var(--accent-gradient);
            box-shadow: 0 12px 32px rgba(77,185,122,0.18);
          }
          .btn-secondary {
            background: var(--accent5);
            color: #222;
            border: none;
            border-radius: var(--radius-medium);
            box-shadow: var(--shadow-large);
          }
          .btn-accent {
            background: var(--accent2);
            color: #fff;
            border: none;
            border-radius: var(--radius-medium);
            box-shadow: var(--shadow-large);
          }
          .btn-primary:hover, .btn-secondary:hover, .btn-accent:hover {
            transform: translateY(-2px) scale(1.04);
            box-shadow: 0 16px 40px rgba(51,142,119,0.18);
          }
          .card, .auth-card, .stat-card, .signup-benefits {
            background: rgba(255,255,255,0.85);
            border-radius: var(--radius-large);
            box-shadow: var(--shadow-large);
            backdrop-filter: blur(8px);
          }
          .card:hover, .auth-card:hover, .stat-card:hover, .signup-benefits:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 16px 40px rgba(51,142,119,0.18);
          }
          .logo-text, .auth-title, .signup-benefits h3 {
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .gradient-text {
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .stat-number, .points-badge, .profile-stats strong {
            animation: popIn 0.5s cubic-bezier(.68,-0.55,.27,1.55);
          }
          @keyframes popIn {
            0% { transform: scale(0.7); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }
          .hero-bg {
            // background: url('${HERO_IMAGE}') center/cover no-repeat;
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .hero-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(51,142,119,0.55);
            backdrop-filter: blur(2px);
            z-index: 1;
          }
          .hero-content {
            position: relative;
            z-index: 2;
            color: #fff;
            text-align: center;
            padding: 3rem 2rem;
          }
          .hero-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            letter-spacing: -2px;
            background: linear-gradient(90deg, #338e77, #6db77a, #b8e986);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .hero-subtitle {
            font-size: 1.3rem;
            font-weight: 500;
            margin-bottom: 2rem;
          }
          .hero-cta {
            background: linear-gradient(90deg, #b8e986, #13bcbc);
            color: #222;
            border: none;
            border-radius: 18px;
            padding: 1rem 2.5rem;
            font-size: 1.2rem;
            font-weight: 700;
            box-shadow: 0 8px 32px rgba(51,142,119,0.12);
            cursor: pointer;
            transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
          }
          .hero-cta:hover {
            background: linear-gradient(90deg, #338e77, #6db77a);
            color: #fff;
            transform: translateY(-2px) scale(1.04);
          }
          .categories-section {
            margin: 3rem 0 2rem 0;
            padding: 0 2rem;
          }
          .categories-title {
            font-size: 2rem;
            font-weight: 700;
            color: #338e77;
            margin-bottom: 1.2rem;
          }
          .categories-list {
            display: flex;
            gap: 1.5rem;
            overflow-x: auto;
          }
          .category-card {
            min-width: 140px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 16px rgba(51,142,119,0.08);
            text-align: center;
            padding: 1rem 0.5rem;
            font-weight: 600;
            color: #338e77;
            transition: box-shadow 0.3s, transform 0.2s;
            cursor: pointer;
          }
          .category-card:hover {
            transform: translateY(-4px) scale(1.04);
            box-shadow: 0 12px 32px rgba(51,142,119,0.18);
          }
          .category-img {
            width: 80px;
            height: 80px;
            border-radius: 12px;
            object-fit: cover;
            margin-bottom: 0.7rem;
          }
          .trending-section {
            margin: 2rem 0;
            padding: 0 2rem;
          }
          .trending-title {
            font-size: 2rem;
            font-weight: 700;
            color: #338e77;
            margin-bottom: 1.2rem;
          }
          .trending-list {
            display: flex;
            gap: 1.5rem;
            overflow-x: auto;
          }
          .trending-card {
            min-width: 180px;
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 16px rgba(51,142,119,0.08);
            text-align: center;
            padding: 1rem 0.5rem;
            font-weight: 600;
            color: #338e77;
            position: relative;
            transition: box-shadow 0.3s, transform 0.2s;
            cursor: pointer;
          }
          .trending-card:hover {
            transform: translateY(-4px) scale(1.04);
            box-shadow: 0 12px 32px rgba(51,142,119,0.18);
          }
          .trending-img {
            width: 120px;
            height: 120px;
            border-radius: 14px;
            object-fit: cover;
            margin-bottom: 0.7rem;
          }
          .hot-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(90deg, #f9fa77, #b8e986);
            color: #338e77;
            font-size: 0.8rem;
            font-weight: 700;
            border-radius: 8px;
            padding: 0.2rem 0.7rem;
          }
          .how-section {
            margin: 3rem 0 2rem 0;
            padding: 0 2rem;
            display: flex;
            gap: 2rem;
            justify-content: center;
          }
          .how-step {
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 16px rgba(51,142,119,0.08);
            padding: 1.5rem 1rem;
            text-align: center;
            flex: 1;
          }
          .how-icon {
            font-size: 2.5rem;
            color: #338e77;
            margin-bottom: 0.7rem;
          }
          .why-section {
            margin: 3rem 0 2rem 0;
            padding: 0 2rem;
            background: #eaf3c2;
            border-radius: 18px;
            display: flex;
            gap: 2rem;
            align-items: center;
            justify-content: space-between;
          }
          .why-content {
            flex: 2;
          }
          .why-title {
            font-size: 2rem;
            font-weight: 700;
            color: #338e77;
            margin-bottom: 1rem;
          }
          .why-stats {
            display: flex;
            gap: 2rem;
          }
          .why-stat {
            font-size: 1.3rem;
            font-weight: 700;
            color: #338e77;
          }
          .why-badges {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: flex-end;
          }
          .footer {
            margin-top: 3rem;
            padding: 2rem;
            text-align: center;
            color: #338e77;
            font-size: 1rem;
          }
          html, body, .app {
            width: 100vw;
            min-width: 100vw;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            overflow-x: hidden;
          }
          .categories-section, .trending-section, .how-section, .why-section, .footer {
            margin: 0 !important;
            padding: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
            left: 0;
            right: 0;
            box-sizing: border-box;
          }
          .categories-list, .trending-list {
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .categories-list, .trending-list {
            display: flex;
            gap: 2vw;
            overflow-x: auto;
            padding: 2vw 0;
            margin: 0;
          }
          .category-card, .trending-card {
            min-width: 220px;
            width: 220px;
            border-radius: 22px;
            box-shadow: 0 8px 32px rgba(51,142,119,0.18);
            background: none;
            padding: 0;
            margin: 0;
            position: relative;
            overflow: visible;
            border: none;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.3s;
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
          .category-img, .trending-img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 22px 22px 0 0;
            display: block;
            margin: 0;
            box-shadow: 0 2px 12px rgba(51,142,119,0.10);
            position: relative;
            z-index: 1;
          }
          .category-info, .trending-info {
            background: rgba(255,255,255,0.18);
            backdrop-filter: blur(12px);
            border-radius: 0 0 22px 22px;
            box-shadow: 0 4px 16px rgba(51,142,119,0.10);
            padding: 1.1rem 1rem 1.2rem 1rem;
            text-align: center;
            font-weight: 700;
            color: #338e77;
            font-size: 1.1rem;
            margin-top: -8px;
            position: relative;
            z-index: 2;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .glass-badge {
            position: absolute;
            bottom: 12px;
            left: 16px;
            background: rgba(255,255,255,0.32);
            backdrop-filter: blur(8px);
            color: #338e77;
            font-weight: 700;
            font-size: 1rem;
            border-radius: 12px;
            padding: 0.4rem 1.1rem;
            box-shadow: 0 2px 8px rgba(51,142,119,0.10);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s, transform 0.3s;
            z-index: 3;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transform: translateY(20px);
          }
          .category-card:hover .glass-badge, .trending-card:hover .glass-badge {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }
          .categories-list, .trending-list {
            display: flex;
            gap: 2vw;
            overflow-x: auto;
            padding: 2vw 0;
            margin: 0;
            border-bottom: 1px solid #eaf3c2;
          }
          .category-card:not(:last-child), .trending-card:not(:last-child) {
            margin-right: 1vw;
          }
          .footer {
            margin-top: 3rem;
            padding: 2.5rem 0 2rem 0;
            text-align: center;
            background: #338e77;
            color: #fff;
            font-size: 1.1rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            border-top: 4px solid #b8e986;
            box-shadow: 0 -4px 24px rgba(51,142,119,0.10);
          }
          .footer-links {
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            gap: 2rem;
            font-size: 1.2rem;
            font-weight: 700;
          }
          .footer-links a {
            color: #fff;
            text-decoration: none;
            transition: color 0.2s;
          }
          .footer-links a:hover {
            color: #b8e986;
            text-decoration: underline;
          }
        `}</style>
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
                {currentPage === 'dashboard' && <UserDashboard />}
                {currentPage === 'admin-dashboard' && <AdminDashboard />}
              </>
            )}
          </ErrorBoundary>
        </main>
        {/* Hero Banner */}
        {/* <div className="hero-bg"> */}
          {/* <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-title">ReWear: Fashion, Reimagined</div>
            <div className="hero-subtitle">Swap. Earn. Repeat. Sustainable fashion for everyone.</div>
            <button className="hero-cta" onClick={() => navigateTo('browse')}>Browse Now</button>
          </div> */}
        {/* </div> */}
        {/* Shop by Category */}
        <div className="categories-section">
          <div className="categories-title">Shop by Category</div>
          <div className="categories-list">
            {CATEGORIES.map(cat => {
              const savePercent = Math.floor(Math.random() * 30) + 20; // 20-49%
              return (
                <div className="category-card" key={cat.name}>
                  <img src={cat.img} alt={cat.name} className="category-img" />
                  <div className="glass-badge">Save {savePercent}% CO₂!</div>
                  <div className="category-info">{cat.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Trending Now */}
        <div className="trending-section">
          <div className="trending-title">Trending Now</div>
          <div className="trending-list">
            {TRENDING.map(item => {
              const savePercent = Math.floor(Math.random() * 30) + 20; // 20-49%
              return (
                <div className="trending-card" key={item.name}>
                  <img src={item.img} alt={item.name} className="trending-img" />
                  <div className="glass-badge">Save {savePercent}% CO₂!</div>
                  <div className="trending-info">{item.name}{item.hot && <span className="hot-badge">Hot</span>}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* How It Works */}
        <div className="how-section">
          <div className="how-step">
            <div className="how-icon">🛍️</div>
            <div>List Your Item</div>
          </div>
          <div className="how-step">
            <div className="how-icon">🔄</div>
            <div>Swap with Others</div>
          </div>
          <div className="how-step">
            <div className="how-icon">🏆</div>
            <div>Earn Points & Badges</div>
          </div>
        </div>
        {/* Why ReWear */}
        <div className="why-section">
          <div className="why-content">
            <div className="why-title">Why ReWear?</div>
            <div className="why-stats">
              <div className="why-stat">10,000+ Items Swapped</div>
              <div className="why-stat">5,000+ Happy Users</div>
              <div className="why-stat">50 tons CO₂ Saved</div>
            </div>
          </div>
          <div className="why-badges">
            <div>🌱 Eco Champion</div>
            <div>🎯 Swap Star</div>
            <div>💎 Unique Finds</div>
          </div>
        </div>
        {/* Footer */}
        <div className="footer">
          &copy; {new Date().getFullYear()} ReWear &mdash; Sustainable Fashion Exchange.
          <div className="footer-links">
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
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
          <button 
            className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => navigateTo('dashboard')}
          >
            <User className="nav-icon" />
            Dashboard
          </button>
          <button 
            className={`nav-link ${currentPage === 'admin-dashboard' ? 'active' : ''}`}
            onClick={() => navigateTo('admin-dashboard')}
          >
            <User className="nav-icon" />
            Admin Dashboard
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

export default App;