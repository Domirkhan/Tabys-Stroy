import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CartPage from './assets/Pages/CartPage';
import CategoryPage from './assets/Pages/CategoryPage';
import ProductPage from './assets/Pages/ProductPage';
import ZakazPage from './assets/Pages/ZakazPage';
import About from './assets/Pages/About';
import DeliveryPage from './assets/Pages/DeliveryPage';
import PaymentPage from './assets/Pages/PaymentPage';
import ContactsPage from './assets/Pages/ContactsPage';

function RouterApp() {
  return (
    <HashRouter>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<App />} />

        {/* Страница корзины */}
        <Route path="/cart" element={<CartPage />} />

        {/* ВАЖНО: маршрут для /zakaz (без :orderId) */}
        <Route path="/zakaz" element={<ZakazPage />} />

        {/* Страница продукта */}
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Прочие страницы */}
        <Route path="/about" element={<About />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/contacts" element={<ContactsPage />} />

        {/* Категории в самом конце */}
        <Route path="/:category/:subCategory/:subSubCategory" element={<CategoryPage />} />
        <Route path="/:category/:subCategory" element={<CategoryPage />} />
        <Route path="/:category" element={<CategoryPage />} />
      </Routes>
    </HashRouter>
  );
}

export default RouterApp;
