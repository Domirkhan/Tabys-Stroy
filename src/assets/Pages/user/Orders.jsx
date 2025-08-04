import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import BottomNav from "../../components/BottomNav";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/order/user-orders`
      );
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1 className="orders-title">История заказов</h1>
              {orders.length === 0 ? (
                <p className="no-orders">Заказы не найдены</p>
              ) : (
                orders.map((order) => (
                  <div className="order-card" key={order.orderId}>
                    <h5 className="order-id">Заказ #{order.orderId}</h5>
                    <div className="price-info">
                      <strong>Общая сумма:</strong>
                      {order.promoCode && order.discountAmount > 0 ? (
                        <>
                          <span className="original-price">
                            {order.totalAmount + order.discountAmount} тг
                          </span>
                          <span className="final-price">
                            {order.totalAmount} тг
                          </span>
                        </>
                      ) : (
                        <span className="total-price">{order.totalAmount} тг</span>
                      )}
                    </div>
                    {order.promoCode && order.discountAmount > 0 && (
                      <div className="promo-info">
                        Промокод <b>{order.promoCode}</b>: скидка {order.discountPercent}% 
                        (−{order.discountAmount} тг)
                      </div>
                    )}
                    <p className="order-status">
                      <strong>Статус заказа:</strong> {order.orderStatus}
                    </p>
                    <p className="payment-status">
                      <strong>Статус оплаты:</strong> {order.paymentStatus}
                    </p>
                    <p className="delivery-method">
                      <strong>Способ получения:</strong>{" "}
                      {order.deliveryMethod === 'pickup' ? 'Самовывоз' : 'Доставка'}
                    </p>
                    <p className="order-date">
                      <strong>Дата оформления:</strong>{" "}
                      {moment(order.createdAt).format('LLL')}
                    </p>
                    {order.deliveryMethod === 'delivery' && (
                      <p className="delivery-address">
                        <strong>Адрес доставки:</strong> {order.user.address || 'Не указан'}
                      </p>
                    )}

                    <div className="order-items">
                      {order.orderItems.map((item, index) => (
                        <div className="product-card" key={index}>
                          <img
                            src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item.product}`}
                            alt={item.name}
                            className="product-image"
                          />
                          <div className="product-info">
                            <h6 className="product-name">{item.name}</h6>
                            <p className="product-price">
                              {order.promoCode && 
                               !order.promoInactive && 
                               !order.excludedSubcategories?.includes(item.subcategory) ? (
                                <>
                                  <span className="original-price">
                                    {item.price} тг/{item.selectedUnit}
                                  </span>
                                  <span className="discounted-price">
                                    {Math.round(item.price * (1 - order.discountPercent/100))} тг/{item.selectedUnit}
                                  </span>
                                  <span style={{ fontSize: 12, color: "#4caf50" }}>
                                    −{order.discountPercent}%
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span>{item.price} тг/{item.selectedUnit}</span>
                                  {order.promoCode && 
                                   order.excludedSubcategories?.includes(item.subcategory) && (
                                    <div style={{
                                      backgroundColor: "#fff3e0",
                                      padding: "8px",
                                      borderRadius: "4px",
                                      marginTop: "8px",
                                      fontSize: "0.9rem",
                                      color: "#ff7043"
                                    }}>
                                      * Промокод не действует на данный товар
                                    </div>
                                  )}
                                </>
                              )}
                            </p>
                            <p className="product-quantity">
                              Количество: {item.quantity} {item.selectedUnit}
                            </p>
                            <p className="product-total">
                              Сумма: {
                                order.promoCode && !order.promoInactive ?
                                <>
                                  <span className="original-total">
                                    {item.quantity * item.price} тг
                                  </span>
                                  <span className="discounted-total">
                                    {Math.round(item.quantity * item.price * (1 - order.discountPercent/100))} тг
                                  </span>
                                </> :
                                `${item.quantity * item.price} тг`
                              }
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default Orders;