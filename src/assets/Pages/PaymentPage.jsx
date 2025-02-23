import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../styles/PaymentPage.css';

function PaymentPage() {
  return (
    <>
      <Header />
      <main className="payment-content">
      <h1 className="section-title-category">Оплата</h1>
        <div className="payment-container">
          <div className="payment-method-page">
            <h2>Оплата через курьера</h2>
            <p>Вы можете оплатить заказ наличными или картой при получении у курьера.</p>
          </div>
          <div className="payment-method-page">
            <h2>Оплата через WhatsApp</h2>
            <p>Свяжитесь с нами в WhatsApp для уточнения деталей и перевода.</p>
            <a href="https://wa.me/77054541349" className="whatsapp-button">Написать в WhatsApp</a>
          </div>
          <div className="payment-method">
            <h2>Перевод на номер Kaspi</h2>
            <p>Переведите сумму заказа на номер Kaspi и отправьте подтверждение.</p>
            <p><strong>Номер Kaspi: +7 705 454 13 49</strong></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PaymentPage;