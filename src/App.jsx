import React, { useState, useEffect } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import MessagesButton from './components/common/MessagesButton';

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

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
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
      setError(null);
    } catch (err) {
      setError('Failed to load application data');
      console.error('App initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (path) => {
    // This will be handled by React Router
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
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
      navigateTo('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    addNotification('You have been logged out', 'info');
    navigateTo('/');
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

  return (
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
      `}</style>
      
      <AppRoutes 
        user={user}
        loading={loading}
        error={error}
        notifications={notifications}
        setNotifications={setNotifications}
        navigateTo={navigateTo}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        addNotification={addNotification}
        items={items} // <-- pass items here
      />
      
      {/* Floating Messages Button */}
      <MessagesButton 
        user={user}
        addNotification={addNotification}
      />
    </div>
  );
};

export default App;