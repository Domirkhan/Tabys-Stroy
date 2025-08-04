import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";
import Header from "../../layout/Header";
import '../../styles/Admin.css'

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState(0);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/order/all-orders`
      );
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при получении заказов");
    }
  };

  useEffect(() => {
    fetchOrders();
    const socket = io(import.meta.env.VITE_API);
    socket.on('newOrder', () => {
      setNewOrders(prev => prev + 1);
      fetchOrders();
    });
    return () => socket.disconnect();
  }, []);

  const handleOrderStatusChange = async (orderId, newOrderStatus, newPaymentStatus) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/order/update-order/${orderId}`,
        { orderStatus: newOrderStatus, paymentStatus: newPaymentStatus }
      );
      if (data.success) {
        toast.success("Статус заказа обновлен");
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error("Не удалось обновить статус");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="orders-container">
                <h1 className="orders-title">
                  Заказы
                  {newOrders > 0 && (
                    <span className="new-orders-badge">{newOrders} новых</span>
                  )}
                </h1>

                {orders.length === 0 ? (
                  <p>Нет заказов</p>
                ) : (
                  orders.map((order) => (
                    <div className="order-card" key={order._id}>
                      <div className="order-header">
                        <div className="order-info">
                          <p><strong>Заказ ID:</strong> {order._id}</p>
                          <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                          <p>
                            <strong>Общая сумма:</strong>{" "}
                            {order.promoCode && order.discountAmount > 0 ? (
                              <>
                                <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>
                                  {order.totalAmount + order.discountAmount} тг
                                </span>
                                <span style={{ color: "#ff0000", fontWeight: 600 }}>
                                  {order.totalAmount} тг
                                </span>
                              </>
                            ) : (
                              <span>{order.totalAmount} тг</span>
                            )}
                          </p>
                          {order.promoCode && order.discountAmount > 0 && (
                            <div style={{ color: "#4caf50", fontSize: "0.95em", marginTop: 2 }}>
                              Промокод <b>{order.promoCode}</b> применён: скидка {order.discountPercent}% (−{order.discountAmount} тг)
                              {order.promoInactive && (
                                <span style={{ color: "#ff0000", marginLeft: 5 }}>
                                  *Промокод не действует
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="order-info">
                          <p><strong>Клиент:</strong> {order.user?.name}</p>
                          <p><strong>Email:</strong> {order.user?.email}</p>
                          <p><strong>Телефон:</strong> {order.user?.phone || 'Не указан'}</p>
                        </div>
                        <div className="order-info">
                          <p>
                            <strong>Способ получения:</strong>{" "}
                            {order.deliveryMethod === "pickup" ? "Самовывоз" : "Доставка"}
                          </p>
                          {order.deliveryMethod === "delivery" && (
                            <p><strong>Адрес:</strong> {order.user?.address || "Не указан"}</p>
                          )}
                        </div>
                      </div>

                      <div className="order-items">
                        {order.orderItems.map((item, i) => (
                          <div className="product-card" key={i}>
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

                      <div className="status-controls">
                        <select
                          className="status-select"
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleOrderStatusChange(
                              order._id,
                              e.target.value,
                              order.paymentStatus
                            )
                          }
                        >
                          <option value="Не обработан">Не обработан</option>
                          <option value="В обработке">В обработке</option>
                          <option value="Отправлен">Отправлен</option>
                          <option value="Доставлен">Доставлен</option>
                          <option value="Отменён">Отменён</option>
                        </select>

                        <select
                          className="status-select"
                          value={order.paymentStatus}
                          onChange={(e) =>
                            handleOrderStatusChange(
                              order._id,
                              order.orderStatus,
                              e.target.value
                            )
                          }
                        >
                          <option value="Не оплачен">Не оплачен</option>
                          <option value="В обработке">В обработке</option>
                          <option value="Оплачен">Оплачен</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default AdminOrders;