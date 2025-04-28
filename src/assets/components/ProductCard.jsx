import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';
import '../../assets/styles/card.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Если product не передан, не отображаем карточку
  if (!product) {
    return null;
  }

  // Обработчик перехода на страницу товара
  const handleNavigateToProduct = () => {
    navigate(`/product/${product.slug}`);
  };

  // Обработчик добавления в корзину
  const handleAddToCart = (e) => {
    e.stopPropagation();
    const [firstUnit] = Object.keys(product.pricePerUnit);
    
    // Проверяем есть ли товар с такой же единицей измерения
    const existingItem = cart.find(item => 
      item._id === product._id && 
      item.selectedUnit === firstUnit
    );
    
    if (existingItem) {
      toast.error(`Товар с единицей измерения ${firstUnit} уже в корзине`);
      return;
    }
  
    const cartItem = {
      ...product,
      quantity: 1,
      selectedUnit: firstUnit,
    };
  
    setCart([...cart, cartItem]);
    localStorage.setItem('cart', JSON.stringify([...cart, cartItem]));
    toast.success('Товар добавлен в корзину');
  };

  return (
    <div className="card-container">
      <div className="product-image-container" onClick={handleNavigateToProduct}>
        <img 
          src={product.photo || product.image || 'default_image.jpg'} 
          alt={product.name || 'Продукт'} 
          className="product-image"
        />
      </div>
      
      <div className="product-info" onClick={handleNavigateToProduct}>
        <h3 className="product-title">{product.name}</h3>
        
        <div className="price-and-status">
          <div className="price-wrapper">
            <span className="current-price">
              {product.pricePerUnit && Object.entries(product.pricePerUnit)[0] ? 
                `${Object.entries(product.pricePerUnit)[0][1]} тг за ${Object.entries(product.pricePerUnit)[0][0]}` : 
                product.price ? `${product.price} тг` : 'Цена по запросу'
              }
            </span>
          </div>
          
          <span className={`availability-status ${
            product.availability === 'Есть в наличии' ? 'in-stock' :
            product.availability === 'Нет в наличии' ? 'out-of-stock' :
            product.availability === 'Под заказ' ? 'on-order' : 'check-availability'
          }`}>
            {product.availability || 'Уточнить наличие'}
          </span>
        </div>
      </div>

      <div className="card-buttons">
        <button 
          className="details-btn"
          onClick={handleNavigateToProduct}
        >
          Подробнее
        </button>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={product.availability === 'Нет в наличии'}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}

export default ProductCard;