///// filepath: src/assets/components/ProductCard.jsx
import React from 'react';

function ProductCard({ product, onClick }) {
  return (
    <div
      className="product-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="product-image w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="product-name text-lg font-semibold mb-2">{product.name}</h3>
      <p className="product-description mb-2">{product.description}</p>
      <div className="price-wrapper flex items-center space-x-2 mb-4">
        <span className="current-price text-xl font-bold text-primary">
          {product.price} тг
        </span>
        {product.oldPrice && (
          <span className="old-price text-sm text-gray-400 line-through">
            {product.oldPrice} тг
          </span>
        )}
      </div>
      <button
        className="add-to-cart-btn w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        Подробнее
      </button>
    </div>
  );
}

export default ProductCard;