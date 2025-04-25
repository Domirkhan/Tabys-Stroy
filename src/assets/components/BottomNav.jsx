import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cart';
import homeIcon from '../icon/home.png';
import catalogIcon from '../icon/Catalog.png';
import cartIcon from '../icon/cart-2.png';
import userIcon from '../icon/user.png';
import '../styles/BottomNav.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { Badge } from 'antd'; 

function BottomNav() {
  const [cart, setCart] = useCart();

  // Рассчитываем общее количество товаров
  const totalQuantity = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const [auth, setAuth] = useAuth();
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
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
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
      <Badge count={cart?.length} showZero>
          <NavLink to="/cart" className="nav-link">
            Cart
          </NavLink>
      </Badge>
      { !auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item dropdown">
              <NavLink
                to="#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                style={{ border: "none" }}
              >
                <img src={userIcon} alt="Профиль" />
                {auth?.user?.name}
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="dropdown-item"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </>
        )}
    </nav>
  );
}

export default BottomNav;