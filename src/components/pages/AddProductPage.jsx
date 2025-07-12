import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProductPage.css';
import { useProducts } from '../../contexts/ProductContext';

const AddProductPage = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    size: '',
    condition: '',
    material: '',
    color: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
    tags: ''
  });
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).slice(0, 5 - images.length); // Max 5 images
    const imageUrls = newImages.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    setImages(prev => [...prev, ...imageUrls]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a new product object
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        brand: formData.brand,
        size: formData.size,
        condition: formData.condition,
        material: formData.material,
        color: formData.color,
        category: formData.category,
        price: formData.price,
        originalPrice: formData.originalPrice,
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        images: images.map(img => img.url),
      };
      addProduct(newProduct);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product-page themed-bg">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <span onClick={() => navigate('/')}>Home</span>
        <span> › </span>
        <span onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span> › </span>
        <span>Add New Item</span>
      </nav>
      {/* Main Content */}
      <main className="main-content">
        <div className="page-header">
          <h1>Add New Item</h1>
          <p>Share your sustainable fashion finds with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="add-product-form two-column-form">
          {/* Left: Image Upload Section */}
          <div className="form-section image-section">
            <h2>Product Images</h2>
            <p className="section-subtitle">Add up to 5 high-quality images of your item</p>
            <div 
              className={`image-upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="file-input"
              />
              <label htmlFor="image-upload" className="upload-label">
                <div className="upload-icon">📸</div>
                <h3>Drag and drop images here</h3>
                <p>or click to browse files</p>
                <span className="file-info">JPG, PNG, WEBP up to 10MB each</span>
              </label>
            </div>
            {/* Image Preview */}
            {images.length > 0 && (
              <div className="image-preview-grid">
                {images.map((image, index) => (
                  <div key={image.id} className="image-preview-item">
                    <img src={image.url} alt={`Product ${index + 1}`} />
                    <button 
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage(image.id)}
                    >
                      ×
                    </button>
                    {index === 0 && <span className="main-image-badge">Main</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details Section */}
          <div className="form-section details-section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Designer Silk Blouse"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Zara, H&M, Vintage"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="dresses">Dresses</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                  <option value="bags">Bags</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="size">Size *</label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Size</option>
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="xxl">XXL</option>
                  <option value="one-size">One Size</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="condition">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="new-with-tags">New with Tags</option>
                  <option value="like-new">Like New</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="material">Material</label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  placeholder="e.g., 100% Cotton, Polyester Blend"
                />
              </div>

              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Navy Blue, Dusty Rose"
                />
              </div>
            </div>

            <h2>Pricing</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="price">Your Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="45"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="originalPrice">Original Price ($)</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="120"
                  min="1"
                />
                <small>What you originally paid for this item</small>
              </div>
            </div>

            <h2>Description</h2>
            <div className="form-group">
              <label htmlFor="description">Tell us about this item *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the item's style, fit, any flaws, and why you're selling it..."
                rows="5"
                required
              />
              <small>Be honest about any wear or damage to build trust with buyers</small>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (optional)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="sustainable, designer, vintage, summer (comma separated)"
              />
              <small>Add tags to help buyers discover your item</small>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => navigate('/dashboard')}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting || images.length === 0}
              >
                {isSubmitting ? 'Adding Item...' : 'Add Item'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProductPage;