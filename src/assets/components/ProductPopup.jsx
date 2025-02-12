//// filepath: /c:/Users/damir/Tabys-Stroy/src/assets/components/ProductPopup.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import '../styles/ProductPopup.css';

function ProductPopup({ product, onClose }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('описание');

  const images = product.images ? product.images : [product.image];

  const handlePrev = () => {
    setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>&times;</button>
        <div className="popup-img-slider">
          <button className="slider-btn" onClick={handlePrev}>{'<'}</button>
          <img src={images[currentImage]} alt={product.name} />
          <button className="slider-btn" onClick={handleNext}>{'>'}</button>
        </div>
        <div className="popup-details">
          <h2>{product.name}</h2>
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'описание' ? 'active' : ''}`}
              onClick={() => setActiveTab('описание')}
            >
              Описание
            </button>
            <button
              className={`tab-btn ${activeTab === 'характеристика' ? 'active' : ''}`}
              onClick={() => setActiveTab('характеристика')}
            >
              Характеристики
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'описание' && (
              <p>{product.detailedDescription || product.description}</p>
            )}
            {activeTab === 'характеристика' && product.specifications && (
              <ul className="popup-specs">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            )}
          </div>
          <p className="popup-price">Цена: {product.price} тг</p>
          <div className="quantity-wrapper">
            <label>Количество:</label>
            <button onClick={handleDecrement} className="quantity-btn">−</button>
            <span className="quantity-value">{quantity}</span>
            <button onClick={handleIncrement} className="quantity-btn">+</button>
          </div>
          <button className="popup-add-to-cart" onClick={handleAddToCart}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;