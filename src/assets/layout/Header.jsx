import React, { useState, useContext } from 'react';
import BackButton from '../components/BackButton';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/Header.css';
import cartIcon from "../icon/cart-2.png";
import Logo from "../icon/logo.png";
import Menu from "../icon/menu.png";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import useCategory from "../hooks/useCategory";
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/cart.jsx';
import { Badge } from "antd";
import SearchInput from '../components/Form/SearchInput';
import specialIcon from "../icon/special.png";
import userIcon from '../icon/user.png';

function Header() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const [openCategory, setOpenCategory] = useState(null);
  const { categories, subcategories } = useCategory();
  

  const totalQuantity = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSelect = (product) => {
    const hash = `product-${product.id}`;
    navigate(`/${product.category}/${product.subCategory}#${hash}`);
    setSearchQuery("");
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        element.classList.add('highlighted');
        setTimeout(() => {
          element.classList.remove('highlighted');
        }, 2000);
      } else {
        console.error(`Element with id ${hash} not found`);
      }
    }, 500);
  };


  const openCatalog = () => {
    setIsCatalogOpen(true);
    setClosing(false);
  };

  const closeCatalog = () => {
    setClosing(true);
    setTimeout(() => {
      setIsCatalogOpen(false);
      setOpenCategory(null);
      setOpenSubCategory(null);
    }, 300);
  };

  const toggleCatalog = () => {
    if (isCatalogOpen) {
      closeCatalog();
    } else {
      openCatalog();
    }
  };

  const toggleCategory = (slug) => {
    setOpenCategory(openCategory === slug ? null : slug);
  };

  const toggleSubCategory = (subCategory) => {
    setOpenSubCategory(openSubCategory === subCategory ? null : subCategory);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };
// Добавление в корзину
const addToCart = (product) => {
  setCart([...cart, product]);
  localStorage.setItem('cart', JSON.stringify([...cart, product]));
};

// Удаление из корзины
const removeFromCart = (pid) => {
  const newCart = cart.filter((item) => item._id !== pid);
  setCart(newCart);
  localStorage.setItem('cart', JSON.stringify(newCart));
};
  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <BackButton />
            <div className="catalog-btn" onClick={toggleCatalog}>
              <img src={Menu} alt="menu" className='menu' />
              <span>Каталог</span>
            </div>
            <div className="logo">
              <img className='logotipe' src={Logo} alt="" />
              <a href="/">TABYS STROY</a>
            </div>
            
              
              <SearchInput/>
            
              <div className="header-actions">
                  <li className="nav-item">
                    <Badge 
                      count={cart?.length} 
                      showZero 
                      offset={[0, 5]}
                      style={{ backgroundColor: 'red', color: 'white' }}
                    >
                      <NavLink to="/cart" className="nav-item">
                        <img src={cartIcon} alt="Корзина" className="cart-icon" />
                      </NavLink>
                    </Badge>
                  </li>
                  {!auth?.user ? (
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        <img src={userIcon} alt="Профиль" style={{ width: '24px', height: '24px' }} />
                      </NavLink>
                    </li>
                  ) : (
                    <li className="nav-item dropdown">
                      <NavLink
                        to="#"
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        style={{ border: "none" }}
                      >
                        <img src={userIcon} alt="Профиль" style={{ width: '24px', height: '24px' }} />
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                            className="dropdown-item"
                          >
                            Панель управления
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item"
                          >
                            Выйти
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  )}
                </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <button className="mobile-menu-btn">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23333' d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3V4zm0 7h18v2H3V4z'/%3E%3C/svg%3E"
                alt="menu"
              />
            </button>
            <nav className="main-nav">
              <Link to="/about">О нас</Link>
              <Link to="/payment">Оплата</Link>
              <Link to="/delivery">Доставка</Link>
              <Link to="/contacts">Контакты</Link>
            </nav>
            <div className="lang-phone">
              <a href="tel:+77782673976" className="phone">+7(778) 267-39-76</a>
            </div>
          </div>
        </div>
      </header>
      {isCatalogOpen && (
        <div className="catalog-overlay" onClick={closeCatalog}>
          <div className={`catalog-sidebar ${closing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeCatalog}>X</button>
            <h2>Каталог</h2>
            <ul className="category-list">
              {categories.map(cat => (
                <li key={cat._id} className={`category-item ${openCategory === cat.slug ? 'open' : ''}`}>
                  <div className="category-header" onClick={() => toggleCategory(cat.slug)}>
                    <img src={`${import.meta.env.VITE_API}${cat.iconUrl}`|| specialIcon } alt={cat.name} className="icon" />
                    <span className="category-title">{cat.name}</span>
                    <span className="arrow">{openCategory === cat.slug ? '▲' : '▼'}</span>
                  </div>
                  <div className={`subcategory-wrapper ${openCategory === cat.slug ? 'open' : ''}`}>
                    <ul className="subcategory-list">
                      {subcategories
                        .filter(sub => 
                          sub.category && sub.category._id && 
                          sub.category._id.toString() === cat._id.toString()
                        )
                        .map(sub => (
                          <li key={sub._id}>
                            <Link to={`/${cat.slug}/${sub.slug}`} onClick={closeCatalog}>
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;