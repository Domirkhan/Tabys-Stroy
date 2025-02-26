import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../assets/styles/CartPage.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Deletebtn from '../../assets/icon/delete.png';
import { Helmet } from 'react-helmet-async';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const [orderData, setOrderData] = useState({
    city: '',
    address: '',
    phone: '',
    fio: '',
  });
  const [deliveryData, setDeliveryData] = useState({
    paymentMethod: 'cash',
    deliveryMethod: 'delivery',
    note: '',
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const [isCartOpen, setIsCartOpen] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const handleOrderInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleDeliveryInputChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
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
      delivery: deliveryData,
    };

    // Формируем URL с данными заказа в query-параметре "data"
    const orderLink = `${window.location.origin}/Tabys-Stroy/#/zakaz?data=${encodeURIComponent(JSON.stringify(orderDetails))}`;
    // Без сокращения – данные будут доступны всем
    const fullOrderLink = orderLink;

    const message =
      `Новый заказ:\n\n` +
      orderDetails.items
        .map(i => `${i.name} — ${i.quantity} шт. x ${i.price} тг = ${i.subtotal} тг`)
        .join('\n') +
      `\n\nОбщая сумма: ${totalPrice} тг\n\n` +
      `Данные покупателя:\nГород: ${orderData.city}\nАдрес: ${orderData.address}\nТелефон: ${orderData.phone}\nФИО: ${orderData.fio}\n\n` +
      `Доставка и оплата:\nСпособ оплаты: ${deliveryData.paymentMethod}\nСпособ доставки: ${deliveryData.deliveryMethod}\nПримечание: ${deliveryData.note}\n\n` +
      `Подробности заказа: ${fullOrderLink}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77054541349?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
  };

  return (
    <>
      <Helmet>
        <title>Tabys Stroy | Корзина</title>
      </Helmet>
      <Header />
      <div className="app-container">
        <main className="main-content">
          <div className="cart-page container">
            <h1 className="section-title-category">Корзина</h1>
            {cartItems.length === 0 ? (
              <div className="empty-cart">В корзине нет товаров</div>
            ) : (
              <form onSubmit={handleOrderSubmit}>
                <Section title="1. Ваша корзина" isOpen={isCartOpen} toggle={() => setIsCartOpen(!isCartOpen)}>
                  <div className="cart-items">
                    {cartItems.map(item => (
                      <div key={item.product.id} className="cart-item">
                        <div className="cart-item-top">
                          <img src={item.product.image} alt={item.product.name} className="item-image" />
                          <div className="item-info">
                            <span className="item-name">{item.product.name}</span>
                          </div>
                        </div>
                        <div className="cart-item-bottom">
                          <div className="quantity-controls">
                            <button 
                              className="quantity-btn" 
                              onClick={() => updateQuantity(item.product.id, item.quantity > 1 ? item.quantity - 1 : 1)}
                              disabled={item.quantity <= 1}
                            >
                              &minus;
                            </button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button 
                              className="quantity-btn" 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className="item-total">{item.product.price * item.quantity} тг</div>
                          <button className="delete-btn" onClick={() => removeFromCart(item.product.id)}>
                            <img src={Deletebtn} alt="Удалить" className="delete-icon" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">Итог: {totalPrice} тг</div>
                </Section>

                <Section title="2. Контактные данные" isOpen={isContactOpen} toggle={() => setIsContactOpen(!isContactOpen)}>
                  <div className="contact-details">
                    <label>
                      Город:
                      <input type="text" name="city" value={orderData.city} onChange={handleOrderInputChange} required />
                    </label>
                    <label>
                      Адрес:
                      <input type="text" name="address" value={orderData.address} onChange={handleOrderInputChange} required />
                    </label>
                    <label>
                      Телефон:
                      <input type="text" name="phone" value={orderData.phone} onChange={handleOrderInputChange} required />
                    </label>
                    <label>
                      ФИО:
                      <input type="text" name="fio" value={orderData.fio} onChange={handleOrderInputChange} required />
                    </label>
                  </div>
                </Section>

                <Section title="3. Доставка и оплата" isOpen={isDeliveryOpen} toggle={() => setIsDeliveryOpen(!isDeliveryOpen)}>
                  <div className="delivery-details">
                    <label className="payment-method">
                      Способ оплаты:
                      <div className="radio-group">
                        <label>
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="cash" 
                            checked={deliveryData.paymentMethod === 'cash'} 
                            onChange={handleDeliveryInputChange} 
                          />
                          Наличными
                        </label>
                        <label>
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="card" 
                            checked={deliveryData.paymentMethod === 'card'} 
                            onChange={handleDeliveryInputChange} 
                          />
                          Оплата картой
                        </label>
                      </div>
                    </label>
                    <label className="delivery-method">
                      Способ доставки:
                      <div className="radio-group">
                        <label>
                          <input 
                            type="radio" 
                            name="deliveryMethod" 
                            value="delivery" 
                            checked={deliveryData.deliveryMethod === 'delivery'} 
                            onChange={handleDeliveryInputChange} 
                          />
                          Доставка
                        </label>
                        <label>
                          <input 
                            type="radio" 
                            name="deliveryMethod" 
                            value="pickup" 
                            checked={deliveryData.deliveryMethod === 'pickup'} 
                            onChange={handleDeliveryInputChange} 
                          />
                          Самовывоз
                        </label>
                      </div>
                    </label>
                    <label>
                      Примечание:
                      <textarea name="note" value={deliveryData.note} onChange={handleDeliveryInputChange} />
                    </label>
                  </div>
                </Section>

                <div className="submit-section">
                  <button type="submit" className="order-btn">Оформить заказ</button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

const Section = ({ title, isOpen, toggle, children }) => {
  return (
    <section className="checkout-section">
      <header className="section-header" onClick={toggle}>
        <h2>{title}</h2>
        <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span>
      </header>
      <div className={`section-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </section>
  );
};

export default CartPage;
