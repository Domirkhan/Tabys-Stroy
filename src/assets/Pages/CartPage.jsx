import React, { useState } from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../assets/styles/CartPage.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Состояние для выбора способа получения заказа: "delivery" или "pickup"
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  // Функция вычисления общей стоимости корзины
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        if (item.pricePerUnit && item.selectedUnit) {
          total += item.pricePerUnit[item.selectedUnit] * item.quantity;
        }
      });
      return `${total} тг`;
    } catch (error) {
      console.error("Ошибка при подсчете общей стоимости:", error);
      return "0 тг";
    }
  };

  // Обновление количества товара в корзине
  const updateCartItemQuantity = (pid, newQuantity) => {
    let myCart = [...cart];
    const index = myCart.findIndex(item => item._id === pid);
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

  // Оформление заказа с передачей выбранного способа получения
  const checkoutOrder = async () => {
    try {
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.pricePerUnit[item.selectedUnit],
          quantity: item.quantity,
          selectedUnit: item.selectedUnit
        })),
        totalAmount: cart.reduce((acc, item) => 
          acc + (item.pricePerUnit[item.selectedUnit] * item.quantity), 0
        ),
        deliveryMethod,
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

    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1">
            {`Здравствуйте, ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center">
            {cart?.length
              ? `В вашей корзине ${cart.length} ${cart.length > 1 ? "товара" : "товар"}`
              : "Ваша корзина пуста"}
          </h4>
          {cart?.length > 0 && (
            <>
              {cart.map((p, index) => (
                  <div key={`${p._id}-${index}`}>
                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      width="100px"
                      height="100px"
                    />
                  </div>
                  <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description?.substring(0, 30)}...</p>
                      {p.pricePerUnit && p.selectedUnit ? (
                        <p>Цена: {p.pricePerUnit[p.selectedUnit]} тг за {p.selectedUnit}</p>
                      ) : (
                        <p>Цена не указана</p>
                      )}
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => updateCartItemQuantity(p._id, p.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{p.quantity}</span>
                        <button
                          className="btn btn-secondary ms-2"
                          onClick={() => updateCartItemQuantity(p._id, p.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-2">
                        <p>Сумма: {p.pricePerUnit[p.selectedUnit] * p.quantity} тг</p>
                      </div>
                      <button
                      className="btn btn-danger mt-2"
                      onClick={() => removeCartItem(p._id, p.selectedUnit)}
                    >
                      Удалить
                    </button>
                    </div>
                </div>
                </div>
              ))}
              <div className="cart-summary text-center mt-4">
                <h4>Итого: {totalPrice()}</h4>
                <div className="delivery-method-selection mt-3">
                  <label htmlFor="deliveryMethod">
                    <strong>Выберите способ получения заказа:</strong>
                  </label>
                  <select
                    id="deliveryMethod"
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="form-control my-2"
                  >
                    <option value="delivery">Доставка</option>
                    <option value="pickup">Самовывоз</option>
                  </select>
                </div>
                {auth?.user ? (
                  <button className="btn btn-success order-btn" onClick={checkoutOrder}>
                    Оформить заказ
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/Login", {
                        state: "/cart",
                      })
                    }
                  >
                    Пожалуйста, войдите, чтобы оформить заказ
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default CartPage;