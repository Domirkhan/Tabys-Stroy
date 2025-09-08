import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../styles/ContactsPage.css";
import "../styles/animations.css";
import "../styles/animations.css";
import { Helmet } from "react-helmet-async";
import BottomNav from "../components/BottomNav";
import {
  FaWhatsapp,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function ContactsPage() {
  return (
    <>
      <Helmet>
        <title>Tabys Stroy | Контакты</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Helmet>
      <Header />
      <main className="contact-content">
        <div className="contact-container">
          <div className="contact-section animate-fade-up">
            <div className="contact-content">
              <h1>Контакты</h1>
              <p>Свяжитесь с нами удобным для вас способом</p>
            </div>
          </div>
          <div className="contact-cards animate-fade-left delay-100">
            <div className="contact-card whatsapp">
              <div className="card-icon">
                <FaWhatsapp />
              </div>
              <h2>WhatsApp</h2>
              <div className="contact-links">
                <a href="https://wa.me/+77782673976">
                  +7 (778) 267-39-76 (Жезказган)
                </a>
              </div>
            </div>

            <div className="contact-card phone">
              <div className="card-icon">
                <FaPhoneAlt />
              </div>
              <h2>Телефоны</h2>
              <div className="contact-links">
                <a href="tel:+77782673976">+7 (778) 267-39-76 (Жезказган)</a>
              </div>
            </div>

            <div className="contact-card social">
              <div className="card-icon">
                <FaInstagram />
              </div>
              <h2>Instagram</h2>
              <div className="contact-links">
                <a
                  href="https://www.instagram.com/tabys_stroy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @tabys_stroy
                </a>
              </div>
            </div>

            <div className="contact-card email">
              <div className="card-icon">
                <FaEnvelope />
              </div>
              <h2>Email</h2>
              <div className="contact-links">
                <a href="mailto:tabys.stroy@gmail.com">tabys.stroy@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="location-section animate-fade-up delay-200">
            <div className="location-info">
              <div className="card-icon">
                <FaMapMarkerAlt />
              </div>
              <h2>Наши магазины</h2>
              <div className="locations">
                <div className="location-card">
                  <h3>Жезказган</h3>
                  <p className="hero-subtitle">
                    город: Жезказган, улица: Алашахана 8
                  </p>
                  <div className="map">
                    <iframe
                      className="map-url"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.785709728515!2d67.70759407670865!3d47.80498957425639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4217d7e7d84fc3bb%3A0x906dcbe3b43a463e!2z0YPQu9C40YbQsCDQkNC70LDRiNCw0YXQsNC90LAgOCwg0JbQtdC30LrQsNC30LPQsNC9IDEwMDAwMA!5e0!3m2!1sru!2skz!4v1733991759117!5m2!1sru!2skz"
                      frameBorder="0"
                      allowFullScreen=""
                      aria-hidden="false"
                      tabIndex="0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default ContactsPage;
