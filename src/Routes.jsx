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

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<App />} />

        {/* Страница корзины */}
        <Route path="/cart" element={<CartPage />} />

        {/* ВАЖНО: маршрут для /zakaz (без :orderId) */}
        <Route path="/zakaz" element={<ZakazPage />} />

        {/* Страница продукта */}
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Новый маршрут для детальной страницы товара */}
        <Route path="/:category/:subCategory/:productName" element={<ProductDetail />} />

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
    </BrowserRouter>
  );
}

export default RouterApp;
