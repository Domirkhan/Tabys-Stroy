import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../styles/ZakazPage.css';
import { Bot } from 'lucide-react';
import BottomNav from '../components/BottomNav';

function ZakazPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get('data');
  console.log('Raw data from URL:', data);

  const [orderData, setOrderData] = React.useState(null);
  React.useEffect(() => {
    if (data) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(data));
        console.log('Decoded order data:', decodedData);
        setOrderData(decodedData);
      } catch (error) {
        console.error('Ошибка при декодировании данных:', error);
      }
    }
  }, [data]);

  if (!data) {
    console.warn('Параметр "data" отсутствует в URL.');
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

  if (!orderData || !orderData.items || orderData.items.length === 0 || !orderData.totalPrice || !orderData.customer || !orderData.delivery) {
    console.warn('Данные заказа пусты или некорректны.');
    return (
      <>
        <Header />
        <div className="content">
          <div className="order-page">
            <h1>Данные заказа отсутствуют или некорректны</h1>
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
                    <td>{item.name || 'Не указано'}</td>
                    <td>{item.price || 0}</td>
                    <td>{item.quantity || 0}</td>
                    <td>{item.unit || 'шт.'}</td>
                    <td>{item.subtotal || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Общая сумма: {orderData.totalPrice || 0} тг</h2>
            <h3>Данные покупателя:</h3>
            <p>Город: {orderData.customer.city || 'Не указано'}</p>
            <p>Адрес: {orderData.customer.address || 'Не указано'}</p>
            <p>Телефон: {orderData.customer.phone || 'Не указано'}</p>
            <p>ФИО: {orderData.customer.fio || 'Не указано'}</p>
            <h3>Доставка и оплата:</h3>
            <p>Способ оплаты: {orderData.delivery.paymentMethod === 'cash' ? 'Наличными' : 'Оплата картой'}</p>
            <p>Способ доставки: {orderData.delivery.deliveryMethod === 'delivery' ? 'Доставка' : 'Самовывоз'}</p>
            <p>Примечание: {orderData.delivery.note || 'Нет'}</p>
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
}

export default ZakazPage;