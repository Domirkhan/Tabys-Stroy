import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import Header from "../layout/Header";
import "../styles/SubCategory.css";
import Footer from "../layout/Footer";
import BottomNav from "../components/BottomNav";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
const SubCategoryProduct = () => {
  const [cart, setCart] = useCart();
  const { subcategory, slug } = useParams(); // subcategory - категория, slug - подкатегория
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState({});

  // Используем slug как идентификатор подкатегории
  const subcatSlug = slug ? slug : subcategory;

  useEffect(() => {
    if (subcatSlug) {
      getProductsBySubcategory();
    }
  }, [subcatSlug]);

  const getProductsBySubcategory = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/api/v1/product/product-subcategory/${subcatSlug}`
      );
      setProducts(data?.products || []);
      setSubcategoryData(data?.subcategory || {});
    } catch (error) {
      console.error("Error fetching subcategory products:", error);
    }
  };
  // Заменить существующий обработчик onClick на:
  const handleAddToCart = (p) => {
    const [firstUnit] = Object.keys(p.pricePerUnit);

    // Проверяем есть ли товар с такой же единицей измерения
    const existingItem = cart.find(
      (item) => item._id === p._id && item.selectedUnit === firstUnit
    );

    if (existingItem) {
      toast.error(`Товар с единицей измерения ${firstUnit} уже в корзине`);
      return;
    }

    const cartItem = {
      ...p,
      selectedUnit: firstUnit,
      quantity: 1,
      price: p.pricePerUnit[firstUnit],
    };

    setCart([...cart, cartItem]);
    localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
    toast.success("Товар добавлен в корзину");
  };

  return (
    <>
      <Header />
      <div className="container-sub mt-3">
        <h4 className="section-title-category">
          {subcategoryData?.name || subcatSlug}
        </h4>
        <div className="row-subcategory">
          {products?.map((p) => (
            <div
              className="card"
              key={p._id}
              onClick={() => navigate(`/product/${p.slug}`)} // Добавляем навигацию при клике на карточку
            >
              <img
                src={`${
                  import.meta.env.VITE_API
                }/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-title-text">{p.name}</div>
                <p
                  className={`availability-status ${
                    p.availability === "Есть в наличии"
                      ? "in-stock"
                      : p.availability === "Нет в наличии"
                      ? "out-of-stock"
                      : p.availability === "Под заказ"
                      ? "on-order"
                      : "check-availability"
                  }`}
                >
                  {p.availability || "Уточнить наличие"}
                </p>
                <div className="card-footer">
                  <div className="price-and-status">
                    {p.pricePerUnit && Object.entries(p.pricePerUnit)[0] && (
                      <p className="current-price">
                        {Object.entries(p.pricePerUnit)[0][1]} тг/
                        {Object.entries(p.pricePerUnit)[0][0]}
                      </p>
                    )}
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(p);
                    }}
                    disabled={p.availability === "Нет в наличии"}
                  >
                    <FaShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default SubCategoryProduct;
