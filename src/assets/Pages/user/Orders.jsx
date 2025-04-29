import React, { useState, useEffect } from "react";

import UserMenu from "../../components/UserMenu";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    
      <div className="container-fluid p-3 m-3">
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
                    <strong>Общая сумма:</strong> {order.totalAmount} тг
                  </p>
                  <p>
                    <strong>Статус заказа:</strong> {order.orderStatus}
                  </p>
                  <p>
                    <strong>Статус оплаты:</strong> {order.paymentStatus}
                  </p>
                  <p>
                    <strong>Дата оформления:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p><strong>Адрес:</strong> {order.user.address || 'Не указан'}</p>
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
   
  );
};

export default Orders;