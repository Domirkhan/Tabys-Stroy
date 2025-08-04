import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/card.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  if (!product) {
    return null;
  }

  const handleNavigateToProduct = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const [firstUnit] = Object.keys(product.pricePerUnit);

    const existingItem = cart.find(
      (item) => item._id === product._id && item.selectedUnit === firstUnit
    );

    if (existingItem) {
      toast.error(`Товар с единицей измерения ${firstUnit} уже в корзине`);
      return;
    }

    const cartItem = {
      ...product,
      selectedUnit: firstUnit,
      quantity: 1,
      price: product.pricePerUnit[firstUnit],
    };

    setCart([...cart, cartItem]);
    localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
    toast.success("Товар добавлен в корзину");
  };

  return (
    <div className="card" onClick={handleNavigateToProduct}>
      <img
        src={
          product.photo
            ? `${import.meta.env.VITE_API}/api/v1/product/product-photo/${
                product._id
              }`
            : product.image || "/default_image.jpg"
        }
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <div className="card-title-text">{product.name}</div>
        <p
          className={`availability-status ${
            product.availability === "Есть в наличии"
              ? "in-stock"
              : product.availability === "Нет в наличии"
              ? "out-of-stock"
              : product.availability === "Под заказ"
              ? "on-order"
              : "check-availability"
          }`}
        >
          {product.availability || "Уточнить наличие"}
        </p>
        <div className="card-footer">
          <div className="price-and-status">
            {product.pricePerUnit &&
              Object.entries(product.pricePerUnit)[0] && (
                <p className="current-price">
                  {Object.entries(product.pricePerUnit)[0][1]} тг/
                  {Object.entries(product.pricePerUnit)[0][0]}
                </p>
              )}
          </div>
          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(e);
            }}
            disabled={product.availability === "Нет в наличии"}
          >
            <FaShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
