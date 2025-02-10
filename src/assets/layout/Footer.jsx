import "../styles/Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Компания</h3>
            <nav className="footer-nav">
              <a href="#">О нас</a>
              <a href="#">Новости</a>
              <a href="#">Реквизиты</a>
              <a href="#">Вакансии</a>
              <a href="#">Контактная информация</a>
            </nav>
          </div>
          <div className="footer-column">
            <h3>Сервис</h3>
            <nav className="footer-nav">
              <a href="#">Как заказать</a>
              <a href="#">Оплата</a>
              <a href="#">Доставка</a>
              <a href="#">Скидки и бонусы</a>
              <a href="#">Возврат товаров</a>
            </nav>
          </div>
          <div className="footer-column">
            <h3>Сотрудничество</h3>
            <nav className="footer-nav">
              <a href="#">Оптовые заказы</a>
              <a href="#">Поставщикам</a>
            </nav>
          </div>
          <div className="footer-column">
            <h3>Контакты</h3>
            <div className="footer-contacts">
              <div className="footer-phones">
                <a href="tel:+77054541349">+7(705) 454-13-49</a>
                <a href="tel:+77054541349">+7(705) 454-13-49</a>
              </div>
              <p className="footer-address">г. Жезказган, ул. Алашахана, 8</p>
              <div className="social-links">
                <a href="#" className="social-link telegram"></a>
                <a href="#" className="social-link vk"></a>
                <a href="#" className="social-link youtube"></a>
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