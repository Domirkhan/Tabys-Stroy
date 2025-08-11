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
  const { subcategory, slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState({});
  const [loading, setLoading] = useState(true);

  // Используем slug как идентификатор подкатегории
  const subcatSlug = slug ? slug : subcategory;

  // Получение продуктов по подкатегории
  const getProductsBySubcategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/api/v1/product/product-subcategory/${subcatSlug}`
      );
      setProducts(data?.products || []);
      setSubcategoryData(data?.subcategory || {});
    } catch (error) {
      console.error("Error fetching subcategory products:", error);
      toast.error("Ошибка при загрузке товаров");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subcatSlug) {
      getProductsBySubcategory();
    }
  }, [subcatSlug]);

  // Обработчик добавления в корзину
  const handleAddToCart = (product) => {
    try {
      const [firstUnit] = Object.keys(product.pricePerUnit);

      // Проверка наличия товара в корзине
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

      const updatedCart = [...cart, cartItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Ошибка при добавлении в корзину");
    }
  };

  // Функция для отображения статуса наличия
  const renderAvailabilityStatus = (availability) => {
    const statusClasses = {
      "Есть в наличии": "in-stock",
      "Нет в наличии": "out-of-stock",
      "Под заказ": "on-order",
      "Уточнить наличие": "check-availability",
    };

    return (
      <p
        className={`availability-status ${
          statusClasses[availability] || "check-availability"
        }`}
      >
        {availability || "Уточнить наличие"}
      </p>
    );
  };

  return (
    <>
      <Header />
      <div className="container-sub mt-3">
        <h4 className="section-title-category animate-fade-up">
          {subcategoryData?.name || subcatSlug}
        </h4>
        {loading ? (
          <div className="loading-spinner">Загрузка...</div>
        ) : (
          <div className="row-subcategory">
            {products?.map((product, index) => (
              <div
                className="card animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
                key={product._id}
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <img
                  src={`${
                    import.meta.env.VITE_API
                  }/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                  loading="lazy"
                />
                <div className="card-body">
                  <div className="card-title-text">{product.name}</div>
                  {renderAvailabilityStatus(product.availability)}
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
                        handleAddToCart(product);
                      }}
                      disabled={product.availability === "Нет в наличии"}
                    >
                      <FaShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default SubCategoryProduct;
