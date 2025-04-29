import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client"; // Добавляем импорт

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
     // Подписка на новые заказы
     const socket = io(import.meta.env.VITE_API);
     socket.on('newOrder', () => {
       setNewOrders(prev => prev + 1);
       fetchOrders(); // Обновляем список заказов
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
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
        <h1>
            Заказы 
            {newOrders > 0 && (
              <span className="badge bg-danger ms-2">{newOrders} новых</span>
            )}
          </h1>
          {orders.length === 0 ? (
            <p>Нет заказов</p>
          ) : (
            orders.map((order) => (
              <div className="border p-3 mb-3" key={order._id}>
                <p>
                  <strong>Заказ ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Пользователь:</strong> {order.user?.name} ({order.user?.email})
                </p>
                <p>
                <p>
                  <strong>Адрес:</strong> {order.user?.address}
                </p>
                <strong>Способ получения:</strong>{" "}
                {order.deliveryMethod === "pickup" ? "Самовывоз" : "Доставка"}
              </p>
              {order.deliveryMethod === "delivery" && (
                <p>
                  <strong>Адрес доставки:</strong> {order.user?.address || "Не указан"}
                </p>
              )}
                <p>
                  <strong>Телефон:</strong> {order.user?.phone || 'Не указан'}
                </p>
               
                <p>
                    <strong>Дата оформления:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                <p>
                  <strong>Общая сумма:</strong> {order.totalAmount}
                </p>
                <p>
                  <strong>Статус заказа:</strong> {order.orderStatus}
                </p>
                <p>
                  <strong>Статус оплаты:</strong> {order.paymentStatus}
                </p>
                <div>
                  <h5>Товары:</h5>
                  {order.orderItems.map((item, i) => (
                    <div key={i}>
                      <p>
                        <strong>Название:</strong> {item.name}
                      </p>
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
                <div className="mt-2">
                  <label>
                    Обновить статус заказа:{" "}
                    <select
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
                  </label>
                </div>
                <div className="mt-2">
                  <label>
                    Обновить статус оплаты:{" "}
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        handleOrderStatusChange(
                          order._id,
                          order.orderStatus,
                          e.target.value
                        )
                      }
                    >
                      <option value="Не обработан">Не обработан</option>
                      <option value="В обработке">В обработке</option>
                      <option value="Оплачен">Оплачен</option>
                      <option value="Не оплачен">Не оплачен</option>
                    </select>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;