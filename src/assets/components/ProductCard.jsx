//// filepath: src/assets/components/ProductCard.jsx
import React from 'react';
import '../../assets/styles/card.css';

function ProductCard({ product, onClick }) {
  return (
    <div className="card-container" onClick={onClick}>
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="price-wrapper">
        <span className="product-price">{product.price} тг</span>
        {product.oldPrice && (
          <span className="old-price">{product.oldPrice} тг</span>
        )}
      </div>
      <button
        className="add-to-cart-btn"
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        Подробнее
      </button>
    </div>
  );
}

export default ProductCard;