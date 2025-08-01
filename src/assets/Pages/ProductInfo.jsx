import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductInfo.css";
import { useCart } from "../../context/cart.jsx";
import { toast } from "react-hot-toast";
import Reviews from "../components/Reviews";
import Header from "../layout/Header.jsx";
import Footer from "../layout/Footer.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { FaShoppingCart } from "react-icons/fa";

const ProductInfo = () => {
  const [cart, setCart] = useCart();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (slug) {
      window.scrollTo(0, 0);
      getProduct();
    }
  }, [slug]);

  useEffect(() => {
    if (product?.pricePerUnit) {
      setSelectedUnit(Object.keys(product.pricePerUnit)[0]);
    }
  }, [product]);

const getProduct = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/api/v1/product/get-product/${slug}`
    );
    if (data?.product) {
      const productWithFixedPhotos = {
        ...data.product,
        photos: data.product.photos?.map((_, index) => (
          `${import.meta.env.VITE_API}/api/v1/product/product-photo/${data.product._id}?index=${index}`
        )) || []
      };
      setProduct(productWithFixedPhotos);
      getSimilarProduct(data.product._id, data.product.category?._id);
    }
  };

// Также обновим обработку похожих товаров
const getSimilarProduct = async (pid, cid) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/api/v1/product/related-product/${pid}/${cid}`
    );
    if (data?.products) {
      const productsWithPhotos = data.products.map(p => ({
        ...p,
        photos: p.photos?.map((_, index) => (
          `${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}?index=${index}`
        )) || []
      }));
      setRelatedProducts(productsWithPhotos);
    }
  };


  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.photos?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.photos?.length - 1 : prev - 1
    );
  };
  const addToCart = () => {
    // Проверяем, есть ли товар с такой же единицей измерения в корзине
    const existingItem = cart.find(
      (item) => item._id === product._id && item.selectedUnit === selectedUnit
    );

    if (existingItem) {
      toast.error(`Товар с единицей измерения ${selectedUnit} уже в корзине`);
      return;
    }

    const cartItem = {
      ...product,
      selectedUnit,
      quantity,
      price: product.pricePerUnit[selectedUnit],
    };

    setCart([...cart, cartItem]);
    localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
    toast.success("Товар добавлен в корзину");
    navigate("/cart");
  };
  const addRelatedToCart = (p) => {
    // Получаем первую доступную единицу измерения
    const [firstUnit] = Object.keys(p.pricePerUnit);

    // Проверяем, есть ли товар с такой же единицей измерения в корзине
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
      <div className="row container mt-2 product-details">
        <h1 className="section-title-category">Детали продукта</h1>
        <div className="col-md-6 product-image-container">
          <div className="product-image-slider">
            <img
              src={
                product.photos?.[currentImageIndex] || // Используем текущий индекс для photos
                `${import.meta.env.VITE_API}/api/v1/product/product-photo/${data.product._id}?index=${index}`
              }
              className="product-main-image"
              alt={product.name}
              height="300"
              width="350px"
            />
            {product.photos?.length > 1 && (
              <>
                <button className="slider-btn prev" onClick={prevImage}>
                  ‹
                </button>
                <button className="slider-btn next" onClick={nextImage}>
                  ›
                </button>
                <div className="image-dots">
                  {product.photos?.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">{product.name}</h1>
          <h6>Описание: </h6>
          {product.description}
          {product.characteristics && product.characteristics.length > 0 && (
            <div>
              <h6>Характеристика:</h6>
              <ul>
                {product.characteristics.map((char, index) => (
                  <li key={index}>
                    {char.key} : {char.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="price-section">
            <h2 className="price-amount">
              {product.pricePerUnit && selectedUnit
                ? `${product.pricePerUnit[selectedUnit]} тг за ${selectedUnit}`
                : ""}
            </h2>

            <div className="unit-quantity-selector">
              <div className="unit-selector">
                <label>Выберите единицу:</label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                >
                  {product.pricePerUnit &&
                    Object.keys(product.pricePerUnit).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                </select>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
            </div>
            <button
              className="btn btn-secondary ms-1"
              onClick={addToCart}
              disabled={product.availability === "Нет в наличии"}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
        <Reviews productId={product?._id} />
      </div>
      <hr />
      <div className="container">
        <div className="similar-products">
          <h6>Похожие товары</h6>
          {relatedProducts.length < 1 ? (
            <p className="text-center">нету похожих товаров</p>
          ) : (
            <div className="d-flex flex-wrap">
              {relatedProducts.map((p) => (
                <div
                  className="card"
                  key={p._id}
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  <img
                    src={p.photos?.[0]}
                    className="card-img-top"
                    alt={p.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${
                        import.meta.env.VITE_API
                      }/api/v1/product/product-photo/${p._id}`;
                    }}
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
                        {p.pricePerUnit &&
                          Object.entries(p.pricePerUnit)[0] && (
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
                          addRelatedToCart(p);
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
          )}
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default ProductInfo;
