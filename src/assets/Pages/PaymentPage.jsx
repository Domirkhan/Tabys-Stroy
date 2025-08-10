import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../styles/PaymentPage.css";
import { Helmet } from "react-helmet-async";
import BottomNav from "../components/BottomNav";
import {
  FaTruck,
  FaWhatsapp,
  FaCreditCard,
  FaQuestionCircle,
  FaPhoneAlt,
} from "react-icons/fa";

function PaymentPage() {
  return (
    <>
      <Helmet>
        <title>Tabys Stroy | Способы оплаты</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Helmet>
      <Header />
      <main className="payment-content">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Способы оплаты</h1>
            <p>Выберите удобный для вас способ оплаты заказа</p>
          </div>
        </div>
        <div className="payment-container">
          <div className="payment-method-card delivery">
            <div className="card-icon">
              <FaTruck />
            </div>
            <h2>Оплата через курьера</h2>
            <p>
              Оплачивайте заказ удобным способом при получении: наличными или
              банковской картой через мобильный терминал курьера.
            </p>
          </div>

          <div className="payment-method-card whatsapp">
            <div className="card-icon">
              <FaWhatsapp />
            </div>
            <h2>Оплата через WhatsApp</h2>
            <p>
              Быстрая оплата через WhatsApp. Мы поможем оформить заказ и
              предоставим все детали для оплаты.
            </p>
            <a href="https://wa.me/+77782673976" className="whatsapp-button">
              <FaWhatsapp /> Написать в WhatsApp
            </a>
          </div>

          <div className="payment-method-card kaspi">
            <div className="card-icon">
              <FaCreditCard />
            </div>
            <h2>Kaspi перевод</h2>
            <p>
              Быстрый перевод через Kaspi Gold. После оформления заказа
              переведите сумму по номеру:
            </p>
            <strong className="kaspi-number">+7 705 454 13 49</strong>
          </div>
        </div>

        <div className="info-section">
          <div className="help-card">
            <FaQuestionCircle />
            <h3>Нужна помощь?</h3>
            <p>Наши специалисты готовы ответить на ваши вопросы</p>
            <a href="tel:+77782673976" className="contact-btn">
              <FaPhoneAlt /> Позвонить
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}

export default PaymentPage;
