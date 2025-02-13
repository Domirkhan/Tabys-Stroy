//// filepath: src/assets/Pages/OrderPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../layout/Header.jsx';
import Footer from '../layout/Footer.jsx';
import '../styles/OrderPage.css';

function OrderPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get('data');
  let order = null;

  try {
    order = data ? JSON.parse(data) : null;
  } catch (error) {
    return (
      <>
        <Header />
        <div className="order-page container">
          <p>Ошибка загрузки данных заказа.</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="order-page container">
          <p>Данные заказа отсутствуют.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="order-page container">
        <h1>Детали заказа</h1>
        <div className="order-table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Название товара</th>
                <th>Цена, тг</th>
                <th>Количество</th>
                <th>Сумма, тг</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-summary">
          <h2>Общая сумма: {order.totalPrice} тг</h2>
          <h3>Данные покупателя</h3>
          <p>
            <strong>Город:</strong> {order.customer.city}
          </p>
          <p>
            <strong>Адрес:</strong> {order.customer.address}
          </p>
          <p>
            <strong>Телефон:</strong> {order.customer.phone}
          </p>
          <p>
            <strong>ФИО:</strong> {order.customer.fio}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderPage;