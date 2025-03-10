import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../styles/ContactsPage.css';
import Whatsapp from '../icon/whatsapp-1.png';
import Instagram from '../icon/instagram-1.png';
import Phone from '../icon/phone.png';
import Email from '../icon/email.png';
import { Helmet } from 'react-helmet-async';

function ContactsPage() {
  return (
    <>
        <Helmet>
        <title>Tabys Stroy | Контакты</title>
        </Helmet>
      <Header />
      <main className="contact-content">
        <div className="contact-container">
          <h1 className="section-title-category">Наши контакты</h1>
          <p>Свяжитесь с нами удобным для вас способом:</p>
          <div className="contact-info">
            <p>
              <img src={Whatsapp} alt="WhatsApp" className="icon" /> WhatsApp - Жезказган: <a href="https://wa.me/+77782673976">+7(778) 267-39-76</a>
            </p>
            <p>
              <img src={Whatsapp} alt="WhatsApp" className="icon" /> WhatsApp - Сатпаев: <a href="https://wa.me/77082621972">+7(708) 262-19-72</a>
            </p>
            <p>
              <img src={Instagram} alt="Instagram" className="icon" /> Instagram: <a href="https://www.instagram.com/tabys_stroy" target="_blank" rel="noopener noreferrer">@tabys_stroy</a>
            </p>
            <p>
              <img src={Phone} alt="Телефон" className="icon" /> Телефон - Жезказган: <a href="tel:+77782673976">+7(778) 267-39-76</a>
            </p>
            <p>
              <img src={Phone} alt="Телефон" className="icon" /> Телефон - Сатпаев: <a href="tel:+77082621972">+7(708) 262-19-72</a>
            </p>
            <p>
              <img src={Email} alt="Email" className="icon" /> Email: <a href="mailto:info@tabys-stroy.kz">info@tabys-stroy.kz</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ContactsPage;