import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/card.css';

function ProductCard({ product, onClick }) {
  const navigate = useNavigate();

  // Если не передан обработчик, определяем дефолтный переход
  const handleClick = (e) => {
    e.stopPropagation();
    if (typeof onClick === 'function') {
      onClick();
    } else {
      // Формируем маршрут и переходим
      const productNameEncoded = encodeURIComponent(product.name);
      navigate(`/${product.category}/${product.subCategory}/${productNameEncoded}`);
    }
  };

  // Используйте уникальные ключи, например, product.id, для списка
  return (
    <div className="card-container" onClick={handleClick}>
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-title">{product.name}</h3>
      {product.description && 
        <p className="product-description">{product.description}</p>
      }
      <div className="price-wrapper">
        <span className="product-price">
          {/* Пример получения цены */}
          {product.pricePerUnit ? `${product.pricePerUnit[Object.keys(product.pricePerUnit)[0]]} тг за ${Object.keys(product.pricePerUnit)[0]}` : `${product.price} тг`}
        </span>
        {product.availability && (
          <span className={`product-availability ${product.availability === 'Есть в наличии' ? 'status-available' : ''}`}>
            — {product.availability}
          </span>
        )}
      </div>
      <button className="add-to-cart-btn" onClick={handleClick}>
        Подробнее
      </button>
    </div>
  );
}

export default ProductCard;