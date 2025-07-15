import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-hot-toast";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";
import { Select } from "antd";

const AdminPromoCodes = () => {
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const [minAmount, setMinAmount] = useState(""); 
const { Option } = Select;
const [subcategories, setSubcategories] = useState([]);
const [excludedSubcategories, setExcludedSubcategories] = useState([]);

useEffect(() => {
  axios.get(`${import.meta.env.VITE_API}/api/v1/subcategory/get-subcategory`)
    .then(({ data }) => setSubcategories(data.subcategories || []));
}, []);
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
      minAmount: minAmount ? Number(minAmount) : 0,
      excludedSubcategories: excludedSubcategories // Добавляем выбранные подкатегории
    });
    if (data.success) {
      toast.success("Промокод создан");
      setCode("");
      setDiscountPercent("");
      setExpiresAt("");
      setMinAmount("");
      setExcludedSubcategories([]); // Сбрасываем выбранные подкатегории
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
              <div className="promocodes-container">
                <h1 className="promocodes-title">Генерация промокода</h1>
                <form onSubmit={handleGenerate} className="promocode-form">
                  <div className="form-group">
                    <label>Промокод</label>
                    <input
                      type="text"
                      className="form-control"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
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
                  <div className="form-group">
                    <label>Дата окончания (необязательно)</label>
                    <input
                      type="date"
                      className="form-control"
                      value={expiresAt}
                      onChange={e => setExpiresAt(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                  <label>Минимальная сумма заказа (тг)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={minAmount}
                    onChange={e => setMinAmount(e.target.value)}
                    min={0}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Не применять к подкатегориям</label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Выберите подкатегории"
                    value={excludedSubcategories}
                    onChange={setExcludedSubcategories}
                  >
                    {subcategories.map(sc => (
                      <Option key={sc._id} value={sc._id}>{sc.name}</Option>
                    ))}
                  </Select>
                </div>
                  <button className="btn promocode-btn" type="submit">
                    Создать промокод
                  </button>
                </form>

                 <h2 className="promocodes-list-title">Список промокодов</h2>
                <div className="table-responsive">
                  <table className="table promocodes-table">
                    <thead>
                      <tr>
                        <th>Код</th>
                        <th>Скидка (%)</th>
                        <th>Активен</th>
                        <th>Истекает</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {promoCodes.map((promo) => (
                        <tr key={promo._id}>
                          <td>{promo.code}</td>
                          <td>{promo.discountPercent}</td>
                          <td>
                            <span className={promo.isActive ? "promo-active" : "promo-inactive"}>
                              {promo.isActive ? "Да" : "Нет"}
                            </span>
                          </td>
                          <td>
                            {promo.expiresAt
                              ? new Date(promo.expiresAt).toLocaleDateString()
                              : "—"}
                          </td>
                          <td>
                            <button
                              className="delete-promo-btn"
                              onClick={async () => {
                                if (window.confirm("Удалить этот промокод?")) {
                                  try {
                                    await axios.delete(`${import.meta.env.VITE_API}/api/v1/promo/delete/${promo._id}`);
                                    toast.success("Промокод удалён");
                                    fetchPromoCodes();
                                  } catch {
                                    toast.error("Ошибка при удалении промокода");
                                  }
                                }
                              }}
                            >
                              Удалить
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <style>
                  {`
                  .delete-promo-btn {
                    background: #fff0f0;
                    color: #ff0000;
                    border: none;
                    border-radius: 6px;
                    padding: 0.3rem 1rem;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.2s, color 0.2s;
                  }
                  .delete-promo-btn:hover {
                    background: #ff0000;
                    color: #fff;
                  }
                  .promocodes-container {
                    background: #fff;
                    border-radius: 14px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
                    padding: 2rem 1.5rem 1.5rem 1.5rem;
                    margin-bottom: 2rem;
                  }
                  .promocodes-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #ff0000;
                    margin-bottom: 2rem;
                    letter-spacing: 1px;
                  }
                  .promocode-form {
                    max-width: 400px;
                    margin-bottom: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.1rem;
                  }
                  .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                  }
                  .form-control {
                    border: 1px solid #eee;
                    border-radius: 8px;
                    padding: 0.7rem 1rem;
                    font-size: 1rem;
                    outline: none;
                    transition: border 0.2s;
                  }
                  .form-control:focus {
                    border: 1.5px solid #ff0000;
                  }
                  .promocode-btn {
                    background: #ff0000;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    padding: 0.8rem 1.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 0.5rem;
                    transition: background 0.2s;
                  }
                  .promocode-btn:hover {
                    background: #d90000;
                  }
                  .promocodes-list-title {
                    font-size: 1.15rem;
                    font-weight: 600;
                    color: #222;
                    margin-bottom: 1rem;
                    margin-top: 2.5rem;
                  }
                  .promocodes-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
                  }
                  .promocodes-table th, .promocodes-table td {
                    padding: 0.8rem 1rem;
                    text-align: left;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 1rem;
                  }
                  .promocodes-table th {
                    background: #fafafa;
                    font-weight: 600;
                    color: #222;
                  }
                  .promocodes-table tr:last-child td {
                    border-bottom: none;
                  }
                  .promo-active {
                    color: #2563eb;
                    font-weight: 600;
                  }
                  .promo-inactive {
                    color: #e74c3c;
                  }
                  @media (max-width: 900px) {
                    .promocodes-title {
                      font-size: 1.1rem;
                    }
                    .promocodes-table th, .promocodes-table td {
                      font-size: 0.95rem;
                      padding: 0.6rem 0.5rem;
                    }
                  }
                  @media (max-width: 600px) {
                    .promocodes-container {
                      padding: 1rem 0.5rem;
                    }
                    .promocodes-title {
                      font-size: 1rem;
                    }
                    .promocodes-table th, .promocodes-table td {
                      font-size: 0.9rem;
                      padding: 0.5rem 0.3rem;
                    }
                  }
                  `}
                </style>
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

export default AdminPromoCodes;