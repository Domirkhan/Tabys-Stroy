import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../icon/home.png';
import catalogIcon from '../icon/catalog.png';
import cartIcon from '../icon/cart-2.png';
import userIcon from '../icon/user.png';
import '../styles/BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <img src={homeIcon} alt="Главная" />
        <span>Главная</span>
      </Link>
      <button 
        className="nav-item" 
        onClick={() => window.dispatchEvent(new Event("openCatalog"))}
      >
        <img src={catalogIcon} alt="Каталог" />
        <span>Каталог</span>
      </button>
      <Link to="/cart" className="nav-item">
        <img src={cartIcon} alt="Корзина" />
        <span>Корзина</span>
      </Link>
      <Link to="/profile" className="nav-item">
        <img src={userIcon} alt="Профиль" />
        <span>Профиль</span>
      </Link>
    </nav>
  );
}

export default BottomNav;