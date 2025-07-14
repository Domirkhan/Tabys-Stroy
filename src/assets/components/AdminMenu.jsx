import React from "react";
import { NavLink } from "react-router-dom";
import { FaTags, FaBoxOpen, FaUsers, FaClipboardList, FaPercent, FaPlus } from "react-icons/fa";
import "../styles/Admin.css";

const AdminMenu = () => {
  return (
    <div className="admin-menu-container">
      <h4 className="admin-menu-title">Админ-панель</h4>
      <div className="admin-menu-list">
        <NavLink to="/dashboard/admin/create-category" className="admin-menu-item">
          <FaTags className="admin-menu-icon" />
          <span>Создать категорию</span>
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="admin-menu-item">
          <FaPlus className="admin-menu-icon" />
          <span>Создать продукт</span>
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="admin-menu-item">
          <FaBoxOpen className="admin-menu-icon" />
          <span>Продукты</span>
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="admin-menu-item">
          <FaUsers className="admin-menu-icon" />
          <span>Пользователи</span>
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className="admin-menu-item">
          <FaClipboardList className="admin-menu-icon" />
          <span>Заказы</span>
        </NavLink>
        <NavLink to="/dashboard/admin/promocodes" className="admin-menu-item">
          <FaPercent className="admin-menu-icon" />
          <span>Промокоды</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;