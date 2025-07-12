import React, { useState } from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../assets/styles/CartPage.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNav from "../components/BottomNav";
import { DeleteOutlined } from '@ant-design/icons';

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Состояние для выбора способа получения заказа: "delivery" или "pickup"
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  // --- ПРОМОКОД ---
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null); // { code, discountPercent }
  const [promoError, setPromoError] = useState("");

  // Функция вычисления общей стоимости корзины (без скидки)
  const calcTotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      if (item.pricePerUnit && item.selectedUnit) {
        total += item.pricePerUnit[item.selectedUnit] * item.quantity;
      }
    });
    return total;
  };

  // Итоговая сумма с учетом скидки
  const totalWithDiscount = () => {
    const total = calcTotal();
    if (promo && promo.discountPercent > 0) {
      const discount = Math.round(total * promo.discountPercent / 100);
      return { total: total - discount, discount, percent: promo.discountPercent };
    }
    return { total, discount: 0, percent: 0 };
  };

  // Проверка и применение промокода
  const handleApplyPromo = async () => {
    setPromoError("");
    if (!promoInput.trim()) {
      setPromo(null);
      setPromoError("Введите промокод");
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/promo/check`,
        { code: promoInput.trim() }
      );
      if (data.success && data.promo && data.promo.discountPercent > 0) {
        setPromo({
          code: data.promo.code,
          discountPercent: data.promo.discountPercent,
        });
        toast.success(`Промокод применён! Скидка ${data.promo.discountPercent}%`);
      } else {
        setPromo(null);
        setPromoError(data.message || "Промокод не найден или неактивен");
        toast.error(data.message || "Промокод не найден или неактивен");
      }
    } catch (e) {
      setPromo(null);
      setPromoError("Ошибка при проверке промокода");
      toast.error("Ошибка при проверке промокода");
    }
  };

  // Сброс промокода
  const handleRemovePromo = () => {
    setPromo(null);
    setPromoInput("");
    setPromoError("");
  };

  const updateCartItemQuantity = (pid, selectedUnit, newQuantity) => {
    let myCart = [...cart];
    const index = myCart.findIndex(item =>
      item._id === pid &&
      item.selectedUnit === selectedUnit
    );
    if (index !== -1) {
      myCart[index].quantity = newQuantity > 0 ? newQuantity : 1;
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    }
  };

  // Удаление товара из корзины
  const removeCartItem = (pid, selectedUnit) => {
    try {
      let myCart = [...cart];
      const index = myCart.findIndex(item =>
        item._id === pid &&
        item.selectedUnit === selectedUnit
      );
      if (index > -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
        toast.success("Товар удалён из корзины");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Оформление заказа с учетом промокода и скидки
  const checkoutOrder = async () => {
    try {
     const { total, discount } = totalWithDiscount();
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.pricePerUnit[item.selectedUnit],
          quantity: item.quantity,
          selectedUnit: item.selectedUnit
        })),
        totalAmount: total,
        deliveryMethod,
        promoCode: promo?.code || null,
        discountPercent: promo?.discountPercent || 0,
        discountAmount: discount || 0,
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/order/create-order`,
        orderData
      );
      if (data.success) {
        toast.success("Заказ создан. Ожидайте подтверждения администратора.");
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/dashboard/user/orders");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при оформлении заказа");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="cart-container">
          <div className="cart-content">
            <h1 className="cart-title">
              Корзина {cart?.length > 0 && <span>({cart.length})</span>}
            </h1>

            {cart?.length > 0 ? (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={`${item._id}-${index}`} className="cart-item">
                      <div className="item-image">
                        <img
                          src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item._id}`}
                          alt={item.name}
                        />
                      </div>

                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>

                        <div className="item-price">
                          {item.pricePerUnit && item.selectedUnit && (
                            <span>{item.pricePerUnit[item.selectedUnit]} тг/{item.selectedUnit}</span>
                          )}
                        </div>

                        <div className="item-controls">
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn"
                              onClick={() => updateCartItemQuantity(
                                item._id,
                                item.selectedUnit,
                                item.quantity - 1
                              )}
                            >
                              −
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                              className="quantity-btn"
                              onClick={() => updateCartItemQuantity(
                                item._id,
                                item.selectedUnit,
                                item.quantity + 1
                              )}
                            >
                              +
                            </button>
                          </div>

                          <div className="item-total">
                            {item.pricePerUnit[item.selectedUnit] * item.quantity} тг
                          </div>

                          <button
                            className="remove-btn"
                            onClick={() => removeCartItem(item._id, item.selectedUnit)}
                          >
                            <DeleteOutlined /> Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- ПРОМОКОД --- */}
                <div className="promo-section" style={{ margin: "1.5rem 0" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", maxWidth: 350 }}>
                    <input
                      type="text"
                      placeholder="Промокод"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      className="promo-input"
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        fontSize: "1rem"
                      }}
                      disabled={!!promo}
                    />
                    {!promo ? (
                      <button
                        className="checkout-btn"
                        style={{ width: 120, padding: "0.5rem", fontSize: "1rem" }}
                        onClick={handleApplyPromo}
                      >
                        Применить
                      </button>
                    ) : (
                      <button
                        className="login-btn"
                        style={{ width: 120, padding: "0.5rem", fontSize: "1rem", background: "#eee" }}
                        onClick={handleRemovePromo}
                      >
                        Убрать
                      </button>
                    )}
                  </div>
                  {promo && (
                    <div style={{ color: "#4caf50", marginTop: 8 }}>
                      Промокод <b>{promo.code}</b> применён: скидка {promo.discountPercent}% (−{totalWithDiscount().discount} тг)
                    </div>
                  )}
                  {promoError && (
                    <div style={{ color: "#ff0000", marginTop: 8 }}>{promoError}</div>
                  )}
                </div>

                <div className="cart-summary">
                  <div className="delivery-method">
                    <select
                      value={deliveryMethod}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                    >
                      <option value="delivery">Доставка</option>
                      <option value="pickup">Самовывоз</option>
                    </select>
                  </div>

                  <div className="total">
                    <span>Итого:</span>
                    <span className="total-amount">
                      {promo && promo.discountPercent > 0 ? (
                        <>
                          <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>
                            {calcTotal()} тг
                          </span>
                          <span style={{ color: "#ff0000", fontWeight: 600 }}>
                            {totalWithDiscount().total} тг
                          </span>
                        </>
                      ) : (
                        <>{calcTotal()} тг</>
                      )}
                    </span>
                  </div>

                  {auth?.user ? (
                    <button className="checkout-btn" onClick={checkoutOrder}>
                      Оформить заказ
                    </button>
                  ) : (
                    <button
                      className="login-btn"
                      onClick={() => navigate("/Login", { state: "/cart" })}
                    >
                      Войти для оформления
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <p>Ваша корзина пуста</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default CartPage;