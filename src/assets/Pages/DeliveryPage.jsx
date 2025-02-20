import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../styles/DeliveryPage.css'; // опционально, для кастомизации стилей

function DeliveryPage() {
  return (
    <div className="delivery-page">
      <Header />
      <main className="main-content">
        <div className="delivery-container">
          <h1>Доставка в Жезказгане</h1>
          <p>
            Здесь вы узнаете, как происходит доставка и сколько она стоит.
          </p>
          <h2>Условия доставки</h2>
          <p>
            Заказы по городу Жезказган доставляются в течение 1-3 рабочих дней.
          </p>
          <ul>
            <li>
              Заказы от 100 000 тг – доставка бесплатная.
            </li>
            <li>
              Заказы менее 100 000 тг – стоимость доставки составляет от 3000 тг.
            </li>
          </ul>
          <h2>Как происходит доставка</h2>
          <p>
            Мы сотрудничаем с проверенными перевозчиками, что позволяет обеспечить своевременную и качественную доставку вашего заказа прямо до двери.
          </p>
          <p>
            Если у вас есть вопросы, звоните по телефону: <a href="tel:+77054541349">+7 700 555 3322</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DeliveryPage;