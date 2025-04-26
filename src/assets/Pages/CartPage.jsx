import React from "react";

import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("kk-KZ", {
        style: "currency",
        currency: "KZT",
      });
    } catch (error) {
      console.log(error);
      return "0";
    }
  };

  // Обновление количества товара в корзине
  const updateCartItemQuantity = (pid, newQuantity) => {
    let myCart = [...cart];
    const index = myCart.findIndex((item) => item._id === pid);
    if (index !== -1) {
      // Не допускаем количество меньше 1
      myCart[index].quantity = newQuantity > 0 ? newQuantity : 1;
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    }
  };

  // Функция удаления товара из корзины
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Товар удалён из корзины");
    } catch (error) {
      console.log(error);
    }
  };

  // Функция оформления заказа
  const checkoutOrder = async () => {
    try {
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
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
                ? `В вашей корзине ${cart.length} ${
                    cart.length > 1 ? "товара" : "товар"
                  }`
                : "Ваша корзина пуста"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height="100px"
                  />
                </div>
                <div className="col-md-8" >
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}...</p>
                  <p>Price: {p.price}</p>
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
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center cart-summary ">
            <h2>Cart Summary</h2>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user? (
              <button className="btn btn-success" onClick={checkoutOrder}>
                Оплатить
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
        </div>
      </div>
    </>
  );
};

export default CartPage;