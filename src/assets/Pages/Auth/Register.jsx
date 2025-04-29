import React, { useState } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/register.css"; // Импортируем CSS файл для стилей
import BottomNav from "../../components/BottomNav";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address, // Убедитесь, что адрес отправляется
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Что-то пошло не так");
    }
  };

  return (
    <>
    <Header />
    <div className="container">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Регистрация</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              placeholder="Введите ваше имя"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Введите ваш email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Введите ваш пароль"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone1"
              placeholder="Введите ваш телефон"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress1"
              placeholder="Введите ваш адрес"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Зарегистрироваться
          </button>
        </form>
      </div>
      </div>
      <BottomNav />
      <Footer />
      </>
  );
};

export default Register;