import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";
import notificationSound from "../../sounds/notification-sound.mp3";// Импортируем звук
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    successfulOrders: 0,
    cancelledOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });

  const [socket, setSocket] = useState(null);
  const audio = new Audio(notificationSound ); 
  useEffect(() => {
    // Запрашиваем разрешение на уведомления при загрузке
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const newSocket = io(import.meta.env.VITE_API);
    setSocket(newSocket);

    newSocket.on('newOrder', (data) => {
      // Проигрываем звук с обработкой ошибок
      audio.play().catch(err => {
        console.error('Ошибка воспроизведения звука:', err);
      });
      
     // Показываем уведомление
     if (Notification.permission === "granted") {
      new Notification("Новый заказ!", {
        body: `Поступил заказ на сумму ${data.totalAmount} тг`,
        icon: "/logo.png",
        silent: true // Отключаем стандартный звук уведомления
      });
    }
      
      // Обновляем статистику
      getStats();
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const getStats = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/stats/admin`
      );
      if (data?.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при получении статистики");
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Статистика</h1>
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center mb-3">
                <div className="card-body">
                  <h3 className="card-title">Всего заказов</h3>
                  <p className="card-text display-4">{stats.totalOrders}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-3 bg-success text-white">
                <div className="card-body">
                  <h3 className="card-title">Успешных заказов</h3>
                  <p className="card-text display-4">{stats.successfulOrders}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-3 bg-danger text-white">
                <div className="card-body">
                  <h3 className="card-title">Отменённых заказов</h3>
                  <p className="card-text display-4">{stats.cancelledOrders}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="card text-center mb-3 bg-info text-white">
                <div className="card-body">
                  <h3 className="card-title">Всего пользователей</h3>
                  <p className="card-text display-4">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card text-center mb-3 bg-warning text-dark">
                <div className="card-body">
                  <h3 className="card-title">Общая выручка</h3>
                  <p className="card-text display-4">{stats.totalRevenue} ₸</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;