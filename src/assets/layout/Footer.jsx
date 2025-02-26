import "../styles/Footer.css";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Компания</h3>
            <nav className="footer-nav">
              <Link to="/about">О нас</Link>
              {/* <Link to="/news">Новости</Link>
              <Link to="/details">Реквизиты</Link>
              <Link to="/jobs">Вакансии</Link> */}
              <Link to="/contacts">Контакты</Link>
            </nav>
          </div>
          <div className="footer-column">
            <h3>Сервис</h3>
            <nav className="footer-nav">
              {/* <Link to="/How-to-order">Как заказать</Link> */}
              <Link to="/payment">Оплата</Link>
              <Link to="/delivery">Доставка</Link>
              {/* <Link to="/bonus">Скидки и бонусы</Link>
              <Link to="/Return">Возврат товаров</Link> */}
            </nav>
          </div>
          {/* <div className="footer-column">
            <h3>Сотрудничество</h3>
            <nav className="footer-nav">
              <Link to="/Return">Оптовые заказы</Link>
              <Link to="/Return">Поставщикам</Link>
            </nav>
          </div> */}
          <div className="footer-column">
            <h3>Контакты</h3>
            <div className="footer-contacts">
              <div className="footer-phones">
                <a href="tel:+77054541349">+7(705) 454-13-49</a>
                <a href="tel:+77054541349">+7(705) 454-13-49</a>
              </div>
              <p className="footer-address">г. Жезказган, ул. Алашахана, 8</p>
              <div className="social-links">
                <a href="https://wa.me/+77054541349" className="social-link whatsapp"></a>
                <a href="https://instagram.com/tabys_stroy" className="social-link instagram"></a>
                <a href="https://t.me/+77054541349" className="social-link telegram"></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            2025 © Tabys Stroy - магазин товаров для ремонта и строительства, отделочные материалы, инструменты
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;