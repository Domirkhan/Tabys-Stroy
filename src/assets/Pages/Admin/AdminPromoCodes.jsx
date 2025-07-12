import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-hot-toast";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";

const AdminPromoCodes = () => {
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);

  // Получить список всех промокодов
  const fetchPromoCodes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/promo/all`);
      if (data.success) setPromoCodes(data.promoCodes);
    } catch (e) {
      toast.error("Ошибка при загрузке промокодов");
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  // Генерация промокода
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!code.trim() || !discountPercent) {
      toast.error("Заполните все поля");
      return;
    }
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/promo/generate`, {
        code: code.trim(),
        discountPercent: Number(discountPercent),
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      });
      if (data.success) {
        toast.success("Промокод создан");
        setCode("");
        setDiscountPercent("");
        setExpiresAt("");
        fetchPromoCodes();
      } else {
        toast.error(data.message || "Ошибка при создании промокода");
      }
    } catch (e) {
      toast.error("Ошибка при создании промокода");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Генерация промокода</h1>
              <form onSubmit={handleGenerate} style={{ maxWidth: 400 }}>
                <div className="mb-3">
                  <label>Промокод</label>
                  <input
                    type="text"
                    className="form-control"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Скидка (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={discountPercent}
                    onChange={e => setDiscountPercent(e.target.value)}
                    min={1}
                    max={100}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Дата окончания (необязательно)</label>
                  <input
                    type="date"
                    className="form-control"
                    value={expiresAt}
                    onChange={e => setExpiresAt(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Создать промокод
                </button>
              </form>

              <h2 className="mt-4">Список промокодов</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Код</th>
                    <th>Скидка (%)</th>
                    <th>Активен</th>
                    <th>Истекает</th>
                  </tr>
                </thead>
                <tbody>
                  {promoCodes.map((promo) => (
                    <tr key={promo._id}>
                      <td>{promo.code}</td>
                      <td>{promo.discountPercent}</td>
                      <td>{promo.isActive ? "Да" : "Нет"}</td>
                      <td>{promo.expiresAt ? new Date(promo.expiresAt).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default AdminPromoCodes;