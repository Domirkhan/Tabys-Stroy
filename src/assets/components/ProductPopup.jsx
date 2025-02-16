import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import '../styles/ProductPopup.css';

function ProductPopup({ product, onClose }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('описание');
  const [isActive, setIsActive] = useState(false);

  const images = product.images ? product.images : [product.image];

  useEffect(() => {
    setIsActive(true);
  }, []);

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

  const handleClose = () => {
    setIsActive(false);
    setTimeout(onClose, 300); // Дождитесь завершения анимации перед закрытием
  };

  return (
    <div className={`popup-overlay ${isActive ? 'active' : ''}`} onClick={handleClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={handleClose}>&times;</button>
        <div className="popup-img-slider">
          <button className="slider-btn prev" onClick={handlePrev}>{'<'}</button>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.name}
              className={index === currentImage ? 'active' : ''}
            />
          ))}
          <button className="slider-btn next" onClick={handleNext}>{'>'}</button>
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