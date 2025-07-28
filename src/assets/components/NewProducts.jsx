import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart"; // Добавляем импорт
import { toast } from "react-hot-toast"; // Добавляем импорт
import Slider from "react-slick";
import { FaShoppingCart } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/NewProducts.css";

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart(); // Добавляем хук
  const navigate = useNavigate();
  const sliderRef = useRef();

  useEffect(() => {
    getNewProducts();
  }, []);

  // Получение новых товаров
  const getNewProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/new-products`
      );
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Ошибка при получении новых товаров:", error);
    }
  };
  const handleAddToCart = (p, e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <section className="new-products-section">
      <div className="container">
        <div className="section-header-controls">
          <h2 className="section-title">Новинки</h2>
          <div className="slider-controls">
            <button
              className="slider-arrow prev"
              onClick={() => sliderRef.current.slickPrev()}
            >
              &#8249;
            </button>
            <button
              className="slider-arrow next"
              onClick={() => sliderRef.current.slickNext()}
            >
              &#8250;
            </button>
          </div>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {products.map((p) => (
            <div key={p._id} className="product-slide">
              <div
                className="card"
                onClick={() => navigate(`/product/${p.slug}`)}
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
                      onClick={(e) => handleAddToCart(p, e)}
                      disabled={p.availability === "Нет в наличии"}
                    >
                      <FaShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewProducts;
