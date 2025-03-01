import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ZakazPage.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function ZakazPage() {
  const location = useLocation();
  console.log('Location:', location);

  // Получаем параметры из location.search вместо location.hash
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get('data');

  console.log('data:', data);

  if (!data) {
    return (
      <>
        <Header />
        <div className="content">
          <div className="order-page">
            <h1>Заказ не найден</h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  let orderData;
  try {
    orderData = JSON.parse(decodeURIComponent(data));
    console.log('Decoded order data:', orderData);
  } catch (error) {
    console.error('Ошибка при декодировании данных заказа:', error);
    return (
      <>
        <Header />
        <div className="content">
          <div className="order-page">
            <h1>Ошибка при обработке данных заказа</h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="content">
        <div className="order-page">
          <h1>Информация о заказе</h1>
          <div className="order-summary">
            <h2>Товары:</h2>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Наименование</th>
                  <th>Цена, тг</th>
                  <th>Кол-во</th>
                  <th>Ед. изм.</th>
                  <th>Сумма, тг</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Общая сумма: {orderData.totalPrice} тг</h2>
            <h3>Данные покупателя:</h3>
            <p>Город: {orderData.customer.city}</p>
            <p>Адрес: {orderData.customer.address}</p>
            <p>Телефон: {orderData.customer.phone}</p>
            <p>ФИО: {orderData.customer.fio}</p>
            <h3>Доставка и оплата:</h3>
            <p>Способ оплаты: {orderData.delivery.paymentMethod === 'cash' ? 'Наличными' : 'Оплата картой'}</p>
            <p>Способ доставки: {orderData.delivery.deliveryMethod === 'delivery' ? 'Доставка' : 'Самовывоз'}</p>
            <p>Примечание: {orderData.delivery.note || 'Нет'}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ZakazPage;