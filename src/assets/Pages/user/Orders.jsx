import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/order/user-orders`
      );
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Ошибка при получении заказов:", error);
      toast.error("Ошибка при получении заказов");
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

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
              <h1>История заказов</h1>
              {orders.length === 0 ? (
                <p>Заказы не найдены</p>
              ) : (
                orders.map((order) => (
                  <div className="border p-3 mb-3" key={order._id}>
                    <h5>Заказ ID: {order._id}</h5>
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
                    <br />
                    Итоговая цена: <span style={{ color: "#ff0000", fontWeight: 600 }}>{order.totalAmount} тг</span>
                  </div>
                )}
                    <p>
                      <strong>Статус заказа:</strong> {order.orderStatus}
                    </p>
                    <p>
                      <strong>Статус оплаты:</strong> {order.paymentStatus}
                    </p>
                    <p>
                      <strong>Способ получения:</strong>{" "}
                      {order.deliveryMethod === 'pickup' ? 'Самовывоз' : 'Доставка'}
                    </p>
                    <p>
                      <strong>Дата оформления:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    {order.deliveryMethod === 'delivery' && (
                      <p>
                        <strong>Адрес доставки:</strong> {order.user.address || 'Не указан'}
                      </p>
                    )}
                    <div className="row">
                      {order.orderItems.map((item, i) => (
                        <div className="col-md-4" key={i}>
                          <div className="card">
                            <img
                              src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item.product}`}
                              alt={item.name}
                              className="card-img-top"
                              style={{
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="card-body">
                              <h6 className="card-title">{item.name}</h6>
                              <p className="card-text">
                                Цена: {item.price} тг за {item.selectedUnit}
                              </p>
                              <p className="card-text">
                                Количество: {item.quantity} {item.selectedUnit}
                              </p>
                              <p className="card-text">
                                Сумма: {item.price * item.quantity} тг
                              </p>
                            </div>
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