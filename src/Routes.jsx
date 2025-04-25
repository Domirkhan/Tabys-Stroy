import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CartPage from './assets/Pages/CartPage';
import CategoryPage from './assets/Pages/CategoryPage';
import ProductPage from './assets/Pages/ProductPage';
import ZakazPage from './assets/Pages/ZakazPage';
import About from './assets/Pages/About';
import DeliveryPage from './assets/Pages/DeliveryPage';
import PaymentPage from './assets/Pages/PaymentPage';
import ContactsPage from './assets/Pages/ContactsPage';
import ProductDetail from './assets/components/ProductDetail';
import CatalogPage from './assets/Pages/CatalogPage';
import PrivateRoute from './assets/components/Routes/Private';
import AdminRoute from './assets/components/Routes/AdminRoute';
import Dashboard from './assets/Pages/user/Dashboard';
import Orders from './assets/Pages/user/Orders';
import Profile from './assets/Pages/user/Profile';
import AdminDashboard from './assets/Pages/Admin/AdminDashboard';
import CreateCategory from './assets/Pages/Admin/CreateCategory';
import CreateProduct from './assets/Pages/Admin/CreateProduct';
import UpdateProduct from './assets/Pages/Admin/UpdateProduct';
import Products from './assets/Pages/Admin/Products';
import Users from './assets/Pages/Admin/Users';
import AdminOrders from './assets/Pages/Admin/AdminOrders';
import SubCategoryProduct from './assets/Pages/SubCategoryProduct';
import ProductInfo from './assets/Pages/ProductInfo';
import Register from './assets/Pages/Auth/Register'
import Login from './assets/Pages/Auth/Login';
import ForgotPasssword from './assets/Pages/Auth/ForgotPassword';
import ResetPassword from './assets/Pages/Auth/ResetPassword';




function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/zakaz" element={<ZakazPage />} />
        
        <Route path="/:category/:subCategory/:productName" element={<ProductDetail />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/contacts" element={<ContactsPage />} />

        {/* Категории – размещаем в конце маршрутов */}
        <Route path="/product/:slug" element={<ProductInfo/>} />

        <Route path="/:subcategory/:slug" element={<SubCategoryProduct />} />
        <Route path="/:category/:subcategory" element={<CategoryPage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;