import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { Badge } from "antd";
import toast from "react-hot-toast";
import homeIcon from "../icon/home.png";
import catalogIcon from "../icon/Catalog.png";
import cartIcon from "../icon/cart-2.png";
import userIcon from "../icon/user.png";
import "../styles/BottomNav.css";

function BottomNav() {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Вы успешно вышли");
  };

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
        <img src={homeIcon} alt="Главная" />
        <span>Главная</span>
      </NavLink>

      <NavLink
        to="/catalog"
        className={`nav-item ${isActive("/catalog") ? "active" : ""}`}
      >
        <img src={catalogIcon} alt="Каталог" />
        <span>Каталог</span>
      </NavLink>

      <Badge
        count={cart?.length}
        showZero
        offset={[-8, 5]}
        style={{ backgroundColor: "red", color: "white" }}
      >
        <NavLink
          to="/cart"
          className={`nav-item ${isActive("/cart") ? "active" : ""}`}
        >
          <img src={cartIcon} alt="Корзина" className="cart-icon" />
          <span className="cart-text">Корзина</span>
        </NavLink>
      </Badge>

      {!auth?.user ? (
        <NavLink
          to="/login"
          className={`nav-item ${isActive("/login") ? "active" : ""}`}
        >
          <img
            src={userIcon}
            alt="Профиль"
            style={{ width: "24px", height: "24px" }}
          />
          <span className="profil-nav">Профиль</span>
        </NavLink>
      ) : (
        <div className="nav-item dropdown">
          <NavLink
            to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
            className={`nav-item ${
              isActive("/dashboard/admin") || isActive("/dashboard/user")
                ? "active"
                : ""
            }`}
          >
            <img
              src={userIcon}
              alt="Профиль"
              style={{ width: "24px", height: "24px" }}
            />
            <span className="profil-nav">Профиль</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default BottomNav;
