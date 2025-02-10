///// filepath: src/assets/components/ProductPopup.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import '.././/styles/ProductPopup.css';

function ProductPopup({ product, onClose }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  // Если массива изображений нет, используем одно изображение
  const images = product.images ? product.images : [product.image];

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <div className="popup-img-slider">
          <button className="slider-btn" onClick={handlePrev}>{'<'}</button>
          <img src={images[currentImage]} alt={product.name} />
          <button className="slider-btn" onClick={handleNext}>{'>'}</button>
        </div>
        <div className="popup-details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <ul className="popup-specs">
            {product.specifications &&
              Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
          </ul>
          <p className="popup-price">Цена: {product.price} тг</p>
          <div className="quantity-wrapper">
            <label>Количество:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
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