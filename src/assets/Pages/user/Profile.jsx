import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    console.log("Auth user data:", auth?.user); // Добавим для отладки
    if (auth?.user) {
      const { name, email, phone, address } = auth.user;
      console.log("User address from auth:", address); // Добавим для отладки
      setName(name || "");
      setEmail(email || "");
      setPhone(phone || "");
      setAddress(address || "");
    }
  }, [auth?.user]);
  
  // Измените обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending update with address:", address); // Добавим для отладки
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address // Всегда отправляем адрес
        },
        {
          headers: {
            Authorization: auth?.token
          }
        }
      );
      
      if (data?.success) {
        console.log("Updated user data:", data.updatedUser); // Добавим для отладки
        setAuth({ ...auth, user: data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Профиль успешно обновлен");
      }
    } catch (error) {
      console.log("Update error:", error);
      toast.error("Ошибка при обновлении профиля");
    }
  };

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
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h4 className="title">Профиль</h4>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="Введите ваше имя"
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
                  disabled
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
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Обновить профиль
              </button>
            </form>
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

export default Profile;