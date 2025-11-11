import React, { useState } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/register.css";
import BottomNav from "../../components/BottomNav";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] =  useState("");

  const navigate = useNavigate();

  // Обработчик изменения номера телефона
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Удаляем все нецифровые символы
    value = value.replace(/\D/g, '');
    
    // Форматируем номер
    if (value.length > 0) {
      if (value.length <= 1) {
        value = '+7' + value;
      } else {
        value = '+7' + value.substring(1);
      }
    }
    
    // Ограничиваем длину
    if (value.length > 12) {
      value = value.substring(0, 12);
    }
    
    setPhone(value);
  };

  // Валидация формы
  const validateForm = () => {
    // Проверка формата телефона
    const phoneRegex = /^\+7\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Введите корректный номер телефона в формате +7XXXXXXXXXX");
      return false;
    }

    // Проверка пароля
    if (password.length < 6) {
      toast.error("Пароль должен содержать минимум 6 символов");
      return false;
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Введите корректный email адрес");
      return false;
    }

    return true;
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
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
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">Регистрация</h4>
            <div className="mb-3">
              <label>Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Введите ваше имя"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Введите ваш email"
                required
              />
            </div>
            <div className="mb-3">
              <label>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Введите ваш пароль"
                required
                minLength={6}
              />
            </div>
            <div className="mb-3">
              <label>Телефон</label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="form-control"
                placeholder="+7XXXXXXXXXX"
                required
                pattern="\+7\d{10}"
              />
            </div>
            <div className="mb-3">
              <label>Город и адрес</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="form-control"
                placeholder="Жезказган, Алашахана 10"
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