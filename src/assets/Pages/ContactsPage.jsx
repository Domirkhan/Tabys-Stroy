import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../styles/ContactsPage.css";
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
          <div className="contact-section">
            <div className="contact-content">
              <h1>Контакты</h1>
              <p>Свяжитесь с нами удобным для вас способом</p>
            </div>
          </div>
          <div className="contact-cards">
            <div className="contact-card whatsapp">
              <div className="card-icon">
                <FaWhatsapp />
              </div>
              <h2>WhatsApp</h2>
              <div className="contact-links">
                <a href="https://wa.me/+77782673976">
                  +7 (778) 267-39-76 (Жезказган)
                </a>
                <a href="https://wa.me/77082621972">
                  +7 (708) 262-19-72 (Сатпаев)
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
                <a href="tel:+77082621972">+7 (708) 262-19-72 (Сатпаев)</a>
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

          <div className="location-section">
            <div className="location-info">
              <div className="card-icon">
                <FaMapMarkerAlt />
              </div>
              <h2>Наши магазины</h2>
              <div className="locations">
                <div className="location-card">
                  <h3>Жезказган</h3>
                  <p>ул. Алашахана, 8</p>
                </div>
                <div className="location-card">
                  <h3>Сатпаев</h3>
                  <p>прс. Независивости, 25А</p>
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
