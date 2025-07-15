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
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [excludedCategories, setExcludedCategories] = useState([]);

  const calcTotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      if (item.pricePerUnit && item.selectedUnit) {
        total += item.pricePerUnit[item.selectedUnit] * item.quantity;
      }
    });
    return total;
  };

  const getDiscountForItem = (item) => {
    if (
      promo &&
      promo.discountPercent > 0 &&
      item.subcategory &&
      (!promo.excludedSubcategories ||
        !promo.excludedSubcategories.includes(item.subcategory._id))
    ) {
      return promo.discountPercent;
    }
    return 0;
  };

  const getDiscountedPrice = (item) => {
    const discount = getDiscountForItem(item);
    const price = item.pricePerUnit[item.selectedUnit];
    if (discount > 0) {
      return Math.round(price * (1 - discount / 100));
    }
    return price;
  };

  const totalWithDiscount = () => {
    let total = 0;
    let discount = 0;
    cart?.forEach((item) => {
      const price = item.pricePerUnit[item.selectedUnit];
      const itemTotal = price * item.quantity;
      const discountPercent = getDiscountForItem(item);
      if (discountPercent > 0) {
        const itemDiscount = Math.round((itemTotal * discountPercent) / 100);
        total += itemTotal - itemDiscount;
        discount += itemDiscount;
      } else {
        total += itemTotal;
      }
    });
    return { total, discount, percent: promo?.discountPercent || 0 };
  };

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
      const total = calcTotal();
      if (data.success && data.promo && data.promo.discountPercent > 0) {
        const minAmount = data.promo.minAmount || 0;
        if (total < minAmount) {
          setPromo(null);
          setPromoError(`Промокод действует от ${minAmount} тг`);
          toast.error(`Промокод действует от ${minAmount} тг`);
          return;
        }

        // Получаем названия исключенных подкатегорий
        const excludedSubcategoryNames = cart
          .filter(
            (item) =>
              item.subcategory &&
              data.promo.excludedSubcategories.includes(item.subcategory._id)
          )
          .map((item) => item.subcategory.name)
          .filter((value, index, self) => self.indexOf(value) === index);

        setExcludedCategories(excludedSubcategoryNames);
        setPromo({
          code: data.promo.code,
          discountPercent: data.promo.discountPercent,
          minAmount: minAmount,
          excludedSubcategories: data.promo.excludedSubcategories || [],
        });

        // Показываем сообщение с исключенными категориями
        if (excludedSubcategoryNames.length > 0) {
          toast.success(
            `Промокод применён! Скидка ${data.promo.discountPercent}%
             Не действует на категории: ${excludedSubcategoryNames.join(", ")}`
          );
        } else {
          toast.success(`Промокод применён! Скидка ${data.promo.discountPercent}%`);
        }
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

  const handleRemovePromo = () => {
    setPromo(null);
    setPromoInput("");
    setPromoError("");
    setExcludedCategories([]);
  };

  const updateCartItemQuantity = (pid, selectedUnit, newQuantity) => {
    let myCart = [...cart];
    const index = myCart.findIndex(
      (item) => item._id === pid && item.selectedUnit === selectedUnit
    );
    if (index !== -1) {
      myCart[index].quantity = newQuantity > 0 ? newQuantity : 1;
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    }
  };

  const removeCartItem = (pid, selectedUnit) => {
    try {
      let myCart = [...cart];
      const index = myCart.findIndex(
        (item) => item._id === pid && item.selectedUnit === selectedUnit
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

  const checkoutOrder = async () => {
    try {
      const { total, discount } = totalWithDiscount();
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.pricePerUnit[item.selectedUnit],
          quantity: item.quantity,
          selectedUnit: item.selectedUnit,
          subcategory: item.subcategory,
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
                  {cart.map((item, index) => {
                    const discountPercent = getDiscountForItem(item);
                    const price = item.pricePerUnit[item.selectedUnit];
                    const discountedPrice = getDiscountedPrice(item);
                    const isExcluded = promo?.excludedSubcategories?.includes(item.subcategory?._id);

                    return (
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
                            {discountPercent > 0 ? (
                              <>
                                <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>
                                  {price} тг/{item.selectedUnit}
                                </span>
                                <span style={{ color: "#ff0000", fontWeight: 600 }}>
                                  {discountedPrice} тг/{item.selectedUnit}{" "}
                                  <span style={{ fontSize: 12, color: "#4caf50" }}>−{discountPercent}%</span>
                                </span>
                              </>
                            ) : (
                              <>
                                <span>{price} тг/{item.selectedUnit}</span>
                                {isExcluded && (
                                  <span style={{ color: "#ff7043", fontSize: "0.8rem", marginLeft: 8 }}>
                                    * Промокод не действует
                                  </span>
                                )}
                              </>
                            )}
                          </div>

                          <div className="item-controls">
                            <div className="quantity-controls">
                              <button
                                className="quantity-btn"
                                onClick={() => updateCartItemQuantity(item._id, item.selectedUnit, item.quantity - 1)}
                              >
                                −
                              </button>
                              <span className="quantity">{item.quantity}</span>
                              <button
                                className="quantity-btn"
                                onClick={() => updateCartItemQuantity(item._id, item.selectedUnit, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>

                            <div className="item-total">
                              {discountPercent > 0 ? (
                                <>
                                  <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>
                                    {price * item.quantity} тг
                                  </span>
                                  <span style={{ color: "#ff0000", fontWeight: 600 }}>
                                    {discountedPrice * item.quantity} тг
                                  </span>
                                </>
                              ) : (
                                <span>{price * item.quantity} тг</span>
                              )}
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
                    );
                  })}
                </div>

                <div className="promo-section" style={{ margin: "1.5rem 0" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", maxWidth: 350 }}>
                    <input
                      type="text"
                      placeholder="Промокод"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="promo-input"
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        fontSize: "1rem",
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
                    <div style={{ color: totalWithDiscount().discount > 0 ? "#4caf50" : "#ff0000", marginTop: 8 }}>
                      {totalWithDiscount().discount > 0 && (
                        <>
                          <div>
                            Промокод <b>{promo.code}</b> применён: скидка {promo.discountPercent}% 
                            (−{totalWithDiscount().discount} тг)
                          </div>
                          {excludedCategories.length > 0 && (
                            <div style={{ color: "#ff7043", fontSize: "0.9rem", marginTop: 4 }}>
                              * Промокод не действует на категории: {excludedCategories.join(", ")}
                            </div>
                          )}
                        </>
                      )}
                      {totalWithDiscount().discount === 0 && (
                        <>Промокод применяется только при сумме заказа от {promo.minAmount || 0} тг</>
                      )}
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
                      {promo && promo.discountPercent > 0 && totalWithDiscount().discount > 0 ? (
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