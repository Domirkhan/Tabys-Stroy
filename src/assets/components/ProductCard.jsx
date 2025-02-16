import React from 'react';
import '../../assets/styles/card.css';

function ProductCard({ product, onClick }) {
  const getStatusClass = (availability) => {
    switch (availability) {
      case 'Есть в наличии':
        return 'status-available';
      case 'Нет в наличии':
        return 'status-unavailable';
      case 'На заказ':
        return 'status-order';
      default:
        return '';
    }
  };

  return (
    <div className="card-container" onClick={onClick}>
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-title">{product.name}</h3>
      {product.description && <p className="product-description">{product.description}</p>}
      <div className="price-wrapper">
        <span className="product-price">{product.price} тг</span>
        {product.availability && (
          <span className={`product-availability ${getStatusClass(product.availability)}`}>
            — {product.availability}
          </span>
        )}
      </div>
      <button
        className="add-to-cart-btn"
        onClick={(e) => { 
          e.stopPropagation(); 
          onClick(); 
        }}
      >
        Подробнее
      </button>
    </div>
  );
}

export default ProductCard;