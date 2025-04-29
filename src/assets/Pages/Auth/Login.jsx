import React, { useState } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth";
import "../../styles/login.css"; // Импортируем CSS файл для стилей
import BottomNav from "../../components/BottomNav";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
    <Header />
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Вход в аккаунт</h4>

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

          {/* Ссылка "Забыли пароль?" */}
          <div className="mb-2 text-end">
            <button
              type="button"
              className="btn btn-link p-0"
              style={{color: "#ff0000", textDecoration: "underline"}}
              onClick={() => navigate("/forgot-password")}
            >
              Забыли пароль?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Войти
          </button>

          {/* Добавляем кнопку регистрации */}
          <div className="mt-3 text-center">
            <p>Нет аккаунта?</p>
            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={() => navigate("/register")}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  <BottomNav />
  <Footer />
  </>
  );
};

export default Login;