import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Функция получения всех пользователей
  const getAllUsersController = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/users`);
      if(data.success) {
        setUsers(data.users);
      } else {
        toast.error("Не удалось получить пользователей");
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка сервера при получении пользователей");
    }
  };

  useEffect(() => {
    getAllUsersController();
  }, []);

  return (
    <>
    <Header/>
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9 ">
        <h1 className="text-center">Список пользователей</h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Номер</th>
              <th>Адрес</th>
              <th>Роль</th>
              <th>Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.address}</td>
                <td>{u.role === 1 ? 'Админ' : 'Пользователь'}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Users;