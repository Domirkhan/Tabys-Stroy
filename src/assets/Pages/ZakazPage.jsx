import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ZakazPage.css'; // Импортируем стили, как для OrderPage
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function ZakazPage() {
  const { orderId } = useParams();
  const orderData = JSON.parse(localStorage.getItem(`order_${orderId}`));

  if (!orderData) {
    return (
      <div className="order-page">
        <h1>Заказ не найден</h1>
      </div>
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
                <th>Сумма, тг</th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
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
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ZakazPage;