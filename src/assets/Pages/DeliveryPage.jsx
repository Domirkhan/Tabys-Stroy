import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../styles/DeliveryPage.css";
import { Helmet } from "react-helmet-async";
import BottomNav from "../components/BottomNav";
import { FaTruck, FaPhoneAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";

function DeliveryPage() {
  return (
    <>
      <Helmet>
        <title>Tabys Stroy | Доставка</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Helmet>
      <Header />
      <main className="delivery-content">
        <div className="delivery-container">
          <div className="contact-section">
            <div className="contact-content">
              <h1>Доставка</h1>
              <p>Узнайте о условиях доставки и стоимости</p>
            </div>
          </div>
          <div className="delivery-cards">
            <div className="delivery-card">
              <div className="card-icon">
                <FaTruck />
              </div>
              <h2>Зона доставки</h2>
              <p>Доставляем заказы по городам:</p>
              <ul>
                <li>Жезказган</li>
                <li>Сатпаев</li>
                <li>Близлежащие районы</li>
              </ul>
            </div>

            <div className="delivery-card">
              <div className="card-icon">
                <FaClock />
              </div>
              <h2>Сроки доставки</h2>
              <p>Доставка осуществляется в течение:</p>
              <ul>
                <li>1-3 рабочих дней по городу</li>
                <li>2-5 рабочих дней в область</li>
              </ul>
            </div>

            <div className="delivery-card">
              <div className="card-icon">
                <FaMoneyBillWave />
              </div>
              <h2>Стоимость</h2>
              <p>Стоимость доставки зависит от суммы заказа:</p>
              <ul>
                <li>Бесплатно при заказе от 100 000 тг</li>
                <li>От 3000 тг при заказе до 100 000 тг</li>
              </ul>
            </div>
          </div>

          <div className="delivery-section">
            <div className="help-card">
              <FaPhoneAlt />
              <h3>Остались вопросы?</h3>
              <p>Наши специалисты готовы ответить на ваши вопросы</p>
              <a href="tel:+77782673976" className="contact-btn">
                <FaPhoneAlt /> +7 (778) 267-39-76
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default DeliveryPage;
