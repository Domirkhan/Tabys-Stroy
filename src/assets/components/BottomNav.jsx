import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import homeIcon from '../icon/home.png';
import catalogIcon from '../icon/Catalog.png';
import cartIcon from '../icon/cart-2.png';
import userIcon from '../icon/user.png';
import '../styles/BottomNav.css';

function BottomNav() {
  const { cartItems } = useContext(CartContext);

  // Рассчитываем общее количество товаров
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <img src={homeIcon} alt="Главная" />
        <span>Главная</span>
      </Link>
      <Link to="/catalog" className="nav-item">
        <img src={catalogIcon} alt="Каталог" />
        <span>Каталог</span>
      </Link>
      <Link to="/cart" className="nav-item bottom-cart-item"> {/* Изменён класс */}
        <img src={cartIcon} alt="Корзина" />
        <span>Корзина</span>
        {totalQuantity > 0 && (
          <span className="cart-quantity">{totalQuantity}</span> // Счётчик для корзины
        )}
      </Link>
      <Link to="/profile" className="nav-item">
        <img src={userIcon} alt="Профиль" />
        <span>Профиль</span>
      </Link>
    </nav>
  );
}

export default BottomNav;