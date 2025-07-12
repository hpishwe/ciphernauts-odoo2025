import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Star, User, MapPin, SlidersHorizontal, Grid, List } from 'lucide-react';

const BrowsePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterCondition, setFilterCondition] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 12;

  // Sample items data
  const sampleItems = [
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

  useEffect(() => {
    setItems(sampleItems);
    setFilteredItems(sampleItems);
  }, []);

  // Debounced search and filter
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterCategory, filterCondition, sortBy, priceRange, items]);

  const applyFilters = () => {
    let filtered = [...items];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }
    
    // Condition filter
    if (filterCondition !== 'all') {
      filtered = filtered.filter(item => item.condition === filterCondition);
    }
    
    // Price range filter
    filtered = filtered.filter(item => 
      item.points >= priceRange[0] && item.points <= priceRange[1]
    );
    
    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
        break;
      case 'points-high':
        filtered.sort((a, b) => b.points - a.points);
        break;
      case 'points-low':
        filtered.sort((a, b) => a.points - b.points);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views + b.likes) - (a.views + a.likes));
        break;
      default:
        break;
    }
    
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const navigateTo = (page, data) => {
    console.log('Navigate to:', page, data);
  };

  const Breadcrumb = () => (
    <nav className="breadcrumb">
      <span onClick={() => navigateTo('landing')}>Home</span>
      <span className="separator">›</span>
      <span className="current">Browse Items</span>
    </nav>
  );

  const SearchAndFilter = () => (
    <div className="search-filter-section">
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search for items, brands, or styles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="filter-controls">
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="icon" />
          Filters
          {(filterCategory !== 'all' || filterCondition !== 'all') && (
            <span className="filter-badge">•</span>
          )}
        </button>
        
        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="points-high">Highest Points</option>
          <option value="points-low">Lowest Points</option>
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
  );

  const FilterPanel = () => (
    <div className={`filter-panel ${showFilters ? 'show' : ''}`}>
      <div className="filter-group">
        <label>Category</label>
        <select 
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="outerwear">Outerwear</option>
          <option value="dresses">Dresses</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Condition</label>
        <select 
          value={filterCondition}
          onChange={(e) => setFilterCondition(e.target.value)}
        >
          <option value="all">All Conditions</option>
          <option value="like-new">Like New</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Points Range: {priceRange[0]} - {priceRange[1]}</label>
        <div className="range-slider">
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          />
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
        </div>
      </div>
      
      <button 
        className="clear-filters"
        onClick={() => {
          setFilterCategory('all');
          setFilterCondition('all');
          setPriceRange([50, 500]);
          setSearchTerm('');
        }}
      >
        Clear All Filters
      </button>
    </div>
  );

  const ItemCard = ({ item }) => (
    <div 
      className={`item-card ${viewMode}`} 
      onClick={() => navigateTo('item-detail', item)}
    >
      <div className="item-image">
        <img src={item.images[0]} alt={item.title} loading="lazy" />
        <div className="item-status">{item.status}</div>
        <div className="item-overlay">
          <Eye className="overlay-icon" />
          <span>{item.views}</span>
        </div>
        <button className="favorite-btn">
          <Star className="icon" />
        </button>
      </div>
      <div className="item-info">
        <h3>{item.title}</h3>
        <p className="item-description">
          {viewMode === 'list' ? item.description : item.description.substring(0, 80) + '...'}
        </p>
        <div className="item-meta">
          <span className="item-size">Size: {item.size}</span>
          <span className={`condition-badge ${item.condition}`}>{item.condition}</span>
        </div>
        <div className="item-footer">
          <div className="uploader-info">
            <div className="uploader-avatar">{item.uploader.avatar}</div>
            <div className="uploader-details">
              <span className="uploader-name">{item.uploader.name}</span>
              <span className="uploader-location">
                <MapPin className="location-icon" />
                {item.uploader.location}
              </span>
            </div>
          </div>
          <div className="item-stats">
            <div className="points-badge">{item.points} pts</div>
            <div className="item-likes">
              <Star className="icon" />
              {item.likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Pagination = () => (
    <div className="pagination">
      <button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Previous
      </button>
      
      <div className="page-numbers">
        {[...Array(Math.min(5, totalPages))].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
            >
              {pageNumber}
            </button>
          );
        })}
        {totalPages > 5 && <span className="ellipsis">...</span>}
      </div>
      
      <button 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="browse-page">
      <Breadcrumb />
      
      <div className="browse-header">
        <h2>Discover Amazing Items</h2>
        <p className="results-count">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
        </p>
      </div>
      
      <SearchAndFilter />
      <FilterPanel />
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="no-results">
          <h3>No items found</h3>
          <p>Try adjusting your search or filters to find what you're looking for</p>
          <button className="btn btn-primary" onClick={() => {
            setSearchTerm('');
            setFilterCategory('all');
            setFilterCondition('all');
            setPriceRange([50, 500]);
          }}>
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          <div className={`items-container ${viewMode}`}>
            {paginatedItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          
          {totalPages > 1 && <Pagination />}
        </>
      )}

      <style jsx>{`
        .browse-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .breadcrumb span {
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .breadcrumb span:hover:not(.current) {
          color: var(--text-primary);
        }

        .breadcrumb .separator {
          color: var(--text-muted);
          cursor: default;
        }

        .breadcrumb .current {
          color: var(--text-primary);
          cursor: default;
        }

        .browse-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }

        .browse-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-sm);
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .results-count {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .search-filter-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .search-bar {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: var(--spacing-md);
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: var(--text-muted);
        }

        .search-bar input {
          width: 100%;
          padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3.5rem;
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-large);
          background: var(--bg-input);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-bar input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filter-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-md);
          flex-wrap: wrap;
        }

        .filter-toggle {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-medium);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          transition: all 0.3s ease;
          position: relative;
        }

        .filter-toggle:hover {
          background: var(--bg-input);
        }

        .filter-badge {
          color: #667eea;
          font-size: 1.2rem;
          line-height: 1;
        }

        .sort-select {
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-medium);
          background: var(--bg-input);
          color: var(--text-primary);
          cursor: pointer;
        }

        .view-toggle {
          display: flex;
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-medium);
          overflow: hidden;
        }

        .view-btn {
          background: var(--bg-input);
          border: none;
          color: var(--text-secondary);
          padding: var(--spacing-sm);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        .view-btn.active {
          background: #667eea;
          color: white;
        }

        .filter-panel {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-large);
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
          display: none;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);
        }

        .filter-panel.show {
          display: grid;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .filter-group label {
          font-weight: 600;
          color: var(--text-primary);
        }

        .filter-group select {
          padding: var(--spacing-sm);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-medium);
          background: var(--bg-input);
          color: var(--text-primary);
        }

        .range-slider {
          position: relative;
          height: 40px;
        }

        .range-slider input[type="range"] {
          position: absolute;
          width: 100%;
          height: 5px;
          background: transparent;
          outline: none;
          pointer-events: none;
        }

        .range-slider input[type="range"]::-webkit-slider-thumb {
          pointer-events: all;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          -webkit-appearance: none;
        }

        .clear-filters {
          grid-column: 1 / -1;
          background: var(--danger-gradient);
          border: none;
          color: white;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-medium);
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .clear-filters:hover {
          transform: translateY(-2px);
        }

        .items-container {
          margin-bottom: var(--spacing-xl);
        }

        .items-container.grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-xl);
        }

        .items-container.list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .item-card {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-large);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .item-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-large);
          border-color: #667eea;
        }

        .item-card.list {
          display: flex;
          align-items: stretch;
        }

        .item-card.list .item-image {
          width: 200px;
          height: 200px;
          flex-shrink: 0;
        }

        .item-card.list .item-info {
          flex: 1;
          padding: var(--spacing-lg);
        }

        .item-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .item-card:hover .item-image img {
          transform: scale(1.05);
        }

        .item-status {
          position: absolute;
          top: var(--spacing-md);
          left: var(--spacing-md);
          background: var(--success-color);
          color: white;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-small);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .item-overlay {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-small);
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.8rem;
        }

        .overlay-icon {
          width: 14px;
          height: 14px;
        }

        .favorite-btn {
          position: absolute;
          bottom: var(--spacing-md);
          right: var(--spacing-md);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          color: var(--text-muted);
          padding: var(--spacing-xs);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .favorite-btn:hover {
          background: white;
          color: #ffd700;
          transform: scale(1.1);
        }

        .item-info {
          padding: var(--spacing-lg);
        }

        .item-info h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
          color: var(--text-primary);
        }

        .item-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: var(--spacing-md);
          line-height: 1.4;
        }

        .item-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }

        .item-size {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .condition-badge {
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-small);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .condition-badge.like-new {
          background: rgba(74, 222, 128, 0.2);
          color: var(--success-color);
        }

        .condition-badge.excellent {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .condition-badge.good {
          background: rgba(251, 191, 36, 0.2);
          color: var(--warning-color);
        }

        .condition-badge.fair {
          background: rgba(248, 113, 113, 0.2);
          color: var(--error-color);
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .uploader-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .uploader-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.8rem;
          color: white;
          flex-shrink: 0;
        }

        .uploader-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .uploader-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .uploader-location {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .location-icon {
          width: 12px;
          height: 12px;
        }

        .item-stats {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .points-badge {
          background: var(--accent-gradient);
          color: #333;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-small);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .item-likes {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .item-likes .icon {
          width: 14px;
          height: 14px;
        }

        .no-results {
          text-align: center;
          padding: var(--spacing-2xl);
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-large);
          color: var(--text-secondary);
        }

        .no-results h3 {
          margin-bottom: var(--spacing-md);
          color: var(--text-primary);
          font-size: 1.5rem;
        }

        .no-results p {
          margin-bottom: var(--spacing-lg);
          font-size: 1.1rem;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-md);
          margin-top: var(--spacing-xl);
        }

        .pagination-btn {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-medium);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .pagination-btn:hover:not(:disabled) {
          background: var(--primary-gradient);
          border-color: transparent;
          color: white;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-numbers {
          display: flex;
          gap: var(--spacing-xs);
          align-items: center;
        }

        .page-number {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-medium);
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 40px;
          text-align: center;
          font-weight: 500;
        }

        .page-number:hover {
          background: rgba(102, 126, 234, 0.2);
          border-color: #667eea;
        }

        .page-number.active {
          background: var(--primary-gradient);
          border-color: transparent;
          color: white;
        }

        .ellipsis {
          color: var(--text-muted);
          padding: 0 var(--spacing-sm);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .items-container.grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: var(--spacing-lg);
          }

          .browse-header h2 {
            font-size: 2rem;
          }

          .item-card.list {
            flex-direction: column;
          }

          .item-card.list .item-image {
            width: 100%;
            height: 200px;
          }
        }

        @media (max-width: 768px) {
          .browse-page {
            padding: var(--spacing-md);
          }

          .filter-controls {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-sm);
          }

          .filter-panel {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .items-container.grid {
            grid-template-columns: 1fr;
          }

          .search-bar {
            max-width: none;
          }

          .browse-header h2 {
            font-size: 1.8rem;
          }

          .view-toggle {
            order: -1;
            align-self: flex-end;
          }

          .pagination {
            flex-wrap: wrap;
            gap: var(--spacing-sm);
          }

          .page-numbers {
            order: -1;
            width: 100%;
            justify-content: center;
          }

          .item-footer {
            flex-direction: column;
            gap: var(--spacing-sm);
            align-items: flex-start;
          }

          .item-stats {
            align-self: flex-end;
          }
        }

        @media (max-width: 480px) {
          .breadcrumb {
            font-size: 0.8rem;
            flex-wrap: wrap;
          }

          .browse-header h2 {
            font-size: 1.5rem;
          }

          .search-bar input {
            padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 3rem;
          }

          .filter-controls {
            gap: var(--spacing-xs);
          }

          .filter-toggle,
          .sort-select {
            font-size: 0.9rem;
            padding: var(--spacing-xs) var(--spacing-sm);
          }

          .item-info {
            padding: var(--spacing-md);
          }

          .item-info h3 {
            font-size: 1.1rem;
          }

          .pagination-btn {
            padding: var(--spacing-xs) var(--spacing-sm);
            font-size: 0.9rem;
          }

          .page-number {
            padding: var(--spacing-xs) var(--spacing-sm);
            min-width: 36px;
          }

          .uploader-details {
            display: none;
          }

          .item-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-xs);
          }
        }

        /* Loading Animation */
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-2xl);
          gap: var(--spacing-md);
        }

        .loading-spinner .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Animation for item cards */
        .item-card {
          animation: fadeInUp 0.3s ease-out;
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

        /* Hover effects */
        .item-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          pointer-events: none;
        }

        .item-card:hover::before {
          opacity: 1;
        }

        .item-image,
        .item-info {
          position: relative;
          z-index: 2;
        }

        /* Focus states for accessibility */
        .search-bar input:focus,
        .filter-toggle:focus,
        .sort-select:focus,
        .view-btn:focus,
        .pagination-btn:focus,
        .page-number:focus {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }

        /* Dark mode enhancements */
        .item-card {
          backdrop-filter: blur(10px);
        }

        .filter-panel {
          backdrop-filter: blur(10px);
        }

        .search-bar input {
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default BrowsePage;