import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaClipboardList } from "react-icons/fa";
import "../styles/UserMenu.css";

const UserMenu = () => {
  return (
    <div className="user-menu-container">
      <h4 className="user-menu-title">Личный кабинет</h4>
      <div className="user-menu-list">
        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) => `user-menu-item ${isActive ? 'active' : ''}`}
        >
          <FaUser className="user-menu-icon" />
          <span>Профиль</span>
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className={({ isActive }) => `user-menu-item ${isActive ? 'active' : ''}`}
        >
          <FaClipboardList className="user-menu-icon" />
          <span>История заказов</span>
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;