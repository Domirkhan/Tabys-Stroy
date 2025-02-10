///// filepath: /src/Routes.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CartPage from './assets/Pages/CartPage';
import OrderPage from './assets/Pages/OrderPage';
import CategoryPage from './assets/Pages/CategoryPage';

function RouterApp() {
  return (
    <BrowserRouter basename="/Tabys-Stroy">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/zakaz" element={<OrderPage />} />
        <Route path="/*" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;