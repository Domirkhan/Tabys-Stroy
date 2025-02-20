import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CartPage from './assets/Pages/CartPage';
import CategoryPage from './assets/Pages/CategoryPage';
import ProductPage from './assets/Pages/ProductPage';
import ZakazPage from './assets/Pages/ZakazPage';
import About from './assets/Pages/About';
import DeliveryPage from './assets/Pages/DeliveryPage';

function RouterApp() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/zakaz/:orderId" element={<ZakazPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/:category/:subCategory/:subSubCategory" element={<CategoryPage />} />
        <Route path="/:category/:subCategory" element={<CategoryPage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/delivery" element={<DeliveryPage />} />
      </Routes>
    </HashRouter>
  );
}

export default RouterApp;