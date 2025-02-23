import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../styles/ContactsPage.css';
import Whatsapp from '../icon/whatsapp-1.png';
import Instagram from '../icon/instagram-1.png';
import Phone from '../icon/phone.png';
import Email from '../icon/email.png';

function ContactsPage() {
  return (
    <>
      <Header />
      <main className="contact-content">
        <div className="contact-container">
          <h1 className="section-title-category">Наши контакты</h1>
          <p>Свяжитесь с нами удобным для вас способом:</p>
          <div className="contact-info">
            <p>
              <img src={Whatsapp} alt="WhatsApp" className="icon" /> WhatsApp: <a href="https://wa.me/+77000000000">+7 (700) 000-00-00</a>
            </p>
            <p>
              <img src={Instagram} alt="Instagram" className="icon" /> Instagram: <a href="https://www.instagram.com/tabys_stroy" target="_blank" rel="noopener noreferrer">@tabys_stroy</a>
            </p>
            <p>
              <img src={Phone} alt="Телефон" className="icon" /> Телефон: <a href="tel:+77000000000">+7 (700) 000-00-00</a>
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