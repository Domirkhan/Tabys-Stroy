import React, { useContext, useState, useEffect, useMemo } from 'react';

import '../styles/ProductPopup.css';

function ProductPopup({ product, onClose }) {
  if (!product) return null;

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('описание');
  const [selectedUnit, setSelectedUnit] = useState(Object.keys(product.pricePerUnit)[0]);
  const [isActive, setIsActive] = useState(false);

  const images = useMemo(() => {
    return product.images?.length ? product.images : [product.image];
  }, [product.images, product.image]);

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
    setQuantity(prev => (prev < 99 ? prev + 1 : prev));
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      addToCart(product, quantity, selectedUnit);
      onClose();
    }
  };

  const handleClose = () => {
    setIsActive(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`popup-overlay ${isActive ? 'active' : ''}`} onClick={handleClose}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close" onClick={(e) => { e.stopPropagation(); handleClose(); }}>&times;</button>
      <div className="popup-img-slider">
        <button className="slider-btn prev" onClick={handlePrev}>{'<'}</button>
        {images.map((image, index) => (
          <img
            key={index}
            src={image || ''}
            alt={`${product.name} - изображение ${index + 1}`}
            className={index === currentImage ? 'active' : ''}
          />
        ))}
        <button className="slider-btn next" onClick={handleNext}>{'>'}</button>
        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
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
            <p>{product.detailedDescription || product.description || 'Описание отсутствует'}</p>
          )}
          {activeTab === 'характеристика' && product.specifications && (
            <ul className="popup-specs">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value || 'Не указано'}</li>
              ))}
            </ul>
          )}
        </div>
        <p className="popup-price">Цена: {product.pricePerUnit[selectedUnit]} тг за {selectedUnit}</p>
        <div className="unit-selector">
          <label>Единица измерения:</label>
          <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
            {Object.keys(product.pricePerUnit).map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
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