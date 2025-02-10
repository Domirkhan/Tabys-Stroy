///// filepath: src/assets/Pages/CartPage.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../assets/styles/CartPage.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [orderData, setOrderData] = useState({
    city: '',
    address: '',
    phone: '',
    fio: '',
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const newOrderData = { ...orderData, [e.target.name]: e.target.value };
    setOrderData(newOrderData);
    console.log('Обновлённые данные заказа:', newOrderData);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const orderDetails = {
      items: cartItems.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      })),
      totalPrice,
      customer: orderData,
    };

    console.log('Данные заказа:', orderDetails);

    // Формируем ссылку с учетом базового пути и русскоязычного маршрута /zakaz
    const basePath = '/Tabys-Stroy';
    const orderLink = `${window.location.origin}${basePath}/zakaz?data=${encodeURIComponent(JSON.stringify(orderDetails))}`;

    const message =
      `Новый заказ:\n\n` +
      orderDetails.items
        .map(i => `${i.name} — ${i.quantity} шт. x ${i.price} тг = ${i.subtotal} тг`)
        .join('\n') +
      `\n\nОбщая сумма: ${totalPrice} тг\n\n` +
      `Данные покупателя:\n` +
      `Город: ${orderData.city}\n` +
      `Адрес: ${orderData.address}\n` +
      `Телефон: ${orderData.phone}\n` +
      `ФИО: ${orderData.fio}\n\n` +
      `Подробности заказа: ${orderLink}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77054541349?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="cart-page container">
          <h1 className="cart-title">Корзина</h1>
          {cartItems.length === 0 ? (
            <p className="empty-cart">В корзине нет товаров</p>
          ) : (
            <>
              <div className="cart-table-wrapper">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Товар</th>
                      <th>Цена, тг</th>
                      <th>Кол-во</th>
                      <th>Сумма, тг</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.product.id}>
                        <td>{item.product.name}</td>
                        <td>{item.product.price}</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.product.id, parseInt(e.target.value) || 1)
                            }
                          />
                        </td>
                        <td>{item.product.price * item.quantity}</td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cart-items-mobile">
                {cartItems.map(item => (
                  <div key={item.product.id} className="cart-item">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="cart-item-details">
                      <div>
                        <span>{item.product.name}</span>
                        <span>{item.product.price} тг</span>
                      </div>
                      <div>
                        <span>Кол-во:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.product.id, parseInt(e.target.value) || 1)
                          }
                        />
                      </div>
                      <div>
                        <span>Сумма:</span>
                        <span>{item.product.price * item.quantity} тг</span>
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        className="delete-btn"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="total-amount">Общая сумма: {totalPrice} тг</p>
              <form onSubmit={handleOrderSubmit} className="order-form">
                <input
                  type="text"
                  name="city"
                  placeholder="Город"
                  value={orderData.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Адрес"
                  value={orderData.address}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Номер телефона"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="fio"
                  placeholder="ФИО"
                  value={orderData.fio}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="order-btn">
                  Оформить заказ
                </button>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;