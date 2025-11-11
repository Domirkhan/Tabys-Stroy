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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.user) {
      setFormData({
        name: auth.user.name || "",
        email: auth.user.email || "",
        password: "",
        phone: auth.user.phone || "",
        address: auth.user.address || ""
      });
    }
  }, [auth?.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      };

      if (formData.password) {
        updates.password = formData.password;
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/auth/profile`,
        updates,
        {
          headers: {
            Authorization: auth?.token
          }
        }
      );
      
      if (data?.success) {
        const updatedUser = {
          ...auth.user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        };

        const updatedAuth = {
          ...auth,
          user: updatedUser
        };

        setAuth(updatedAuth);
        localStorage.setItem("auth", JSON.stringify(updatedAuth));

        setFormData(prev => ({
          ...prev,
          password: ""
        }));

        toast.success("Профиль успешно обновлен");
        window.location.reload();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error.response?.data?.message || 
        "Ошибка при обновлении профиля"
      );
    } finally {
      setLoading(false);
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
                    <label>Имя</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Введите ваш email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Пароль</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Введите новый пароль (необязательно)"
                      minLength={6}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Телефон</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Введите ваш телефон"
                      required
                    />
                  </div>
                   <div className="mb-3">
                    <label>Город и адрес</label>
              <input
                type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Напиши свой город и адрес"
                required
              />
            </div>
            
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Обновление..." : "Обновить профиль"}
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