import React from 'react';
import '../../assets/styles/About.css';
import { CheckCircle, Award, Clock, MapPin } from 'react-feather'; // Импортируем иконки
import Header from '../layout/Header'; // Импортируем Header
import Footer from '../layout/Footer';

function About() {
  return (
    <>
      <Header />
      <div className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-info">
              <h3 className="about-info-title">О нашем магазине</h3>
              <div className="about-info-text">
                <p>
                  История Табыс Строй началась с небольшого магазина строительных материалов. За 12 лет мы выросли в крупнейший строительный магазин региона с площадью более 2000 м² и собственным складским комплексом.
                </p>
                <p>
                  В нашем магазине вы найдете все необходимое для строительства и ремонта: от базовых строительных материалов до финишной отделки. Наши опытные консультанты помогут подобрать материалы под ваш бюджет и требования.
                </p>
                <div className="about-features">
                  {[
                    { icon: <CheckCircle className="about-icon" />, text: "Гарантия на все товары" },
                    { icon: <Award className="about-icon" />, text: "Только оригинальная продукция" },
                    { icon: <Clock className="about-icon" />, text: "Быстрая комплектация заказа" },
                    { icon: <MapPin className="about-icon" />, text: "Доставка по всему региону" },
                  ].map((item, index) => (
                    <div key={index} className="about-feature">
                      <div className="about-feature-icon">{item.icon}</div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-images">
              <img src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f" alt="Наш магазин" className="about-image" />
              <img src="https://images.unsplash.com/photo-1585201731775-0597e1be4bfb" alt="Наш склад" className="about-image" />
              <img src="https://images.unsplash.com/photo-1613243555988-441166d4d6fd" alt="Наши материалы" className="about-image" />
              <img src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f" alt="Наш ассортимент" className="about-image" />
            </div>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <h4 className="about-card-title">Наш ассортимент</h4>
              <p>В нашем магазине представлен широкий выбор строительных и отделочных материалов: цемент, кирпич, блоки, пиломатериалы, сухие смеси, краски и многое другое.</p>
            </div>
            <div className="about-card">
              <h4 className="about-card-title">Наши преимущества</h4>
              <ul>
                <li>Огромный выбор материалов</li>
                <li>Только проверенные производители</li>
                <li>Профессиональные консультации</li>
                <li>Доставка в день заказа</li>
                <li>Выгодные цены и акции</li>
              </ul>
            </div>
            <div className="about-card">
              <h4 className="about-card-title">Для наших клиентов</h4>
              <p>Мы работаем как с частными клиентами, так и с компаниями. Для постоянных клиентов действует система скидок и специальные условия на оптовые закупки.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;