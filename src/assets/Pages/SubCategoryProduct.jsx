import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from '../../context/cart';
import Header from "../layout/Header";
import '../styles/SubCategory.css';
import Footer from "../layout/Footer";

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
        `${import.meta.env.VITE_API}/api/v1/product/product-subcategory/${subcatSlug}`
      );
      setProducts(data?.products || []);
      setSubcategoryData(data?.subcategory || {});
    } catch (error) {
      console.error("Error fetching subcategory products:", error);
    }
  };

  return (
    <>
    <Header/>
    <div className="container-sub mt-3">
      <h4 className="section-title-category">
      {subcategoryData?.name || subcatSlug}
      </h4>
      <h6 className="text-center">{products?.length} products found</h6>
      <div className="row">
        <div className="col-md-9 offset-1">
          <div className="d-flex">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-title-text">
                    <h5 className="product-title">{p.name}</h5>
                  </div>
                <div className="price-and-status">
                <p className="current-price">{p.price} тг</p>
                <p className={`availability-status ${p.availability === 'Есть в наличии' ? 'in-stock' : 'out-of-stock'}`}>
                    {p.availability || 'Уточнить наличие'}
                </p>
                </div>
                  <div className="card-buttons">
                    <button
                      className="details-btn"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Подробнее
                    </button>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("Товар добавлен в корзину");
                      }}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SubCategoryProduct;