import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

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
            <h1>Заказы</h1>
            {orders.length === 0 ? (
              <p>Нет заказов</p>
            ) : (
              orders.map((order) => (
                <div className="border p-3 mb-3" key={order._id}>
                  <p>
                    <strong>Заказ ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Пользователь:</strong> {order.user?.name} (
                    {order.user?.email})
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
                          {item.name} - {item.quantity} x {item.price}
                        </p>
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
                        <option value="Not Processed">Not Processed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
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
                        <option value="Not Processed">Not Processed</option>
                        <option value="Processing">Processing</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
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