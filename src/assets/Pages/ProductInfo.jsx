import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductInfo.css";
import { useCart } from "../../context/cart.jsx";
import { toast } from "react-hot-toast";

const ProductInfo = () => {
  const [cart, setCart] = useCart();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      getProduct();
    }
  }, [slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product/${slug}`
      );
      if (data?.product) {
        // Добавляем базовый URL к путям изображений
        const productWithFullImagePaths = {
          ...data.product,
          photos: data.product.photos?.map(photo => 
            photo.startsWith('http') ? photo : `${import.meta.env.VITE_API}/${photo}`
          )
        };
        setProduct(productWithFullImagePaths);
        getSimilarProduct(data.product._id, data.product.category?._id);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      if (data?.products) {
        // Добавляем базовый URL к путям изображений похожих продуктов
        const productsWithFullImagePaths = data.products.map(product => ({
          ...product,
          photos: product.photos?.map(photo =>
            photo.startsWith('http') ? photo : `${import.meta.env.VITE_API}/${photo}`
          )
        }));
        setRelatedProducts(productsWithFullImagePaths);
      }
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (product.photos?.length - 1) ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (product.photos?.length - 1) : prev - 1
    );
  };

  return (
    <>
      <div className="row container mt-2 product-details">
        <div className="col-md-6 product-image-container">
          <div className="product-image-slider">
          <img
            src={product.photos?.[currentImageIndex] || `${import.meta.env.VITE_API}/api/v1/product/product-photo/${product._id}`}
            className="product-main-image"
            alt={product.name}
            height="300"
            width="350px"
          />
            {product.photos?.length > 1 && (
              <>
                <button className="slider-btn prev" onClick={prevImage}>‹</button>
                <button className="slider-btn next" onClick={nextImage}>›</button>
                <div className="image-dots">
                  {product.photos?.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <h6>Subcategory: {product?.subcategory?.name}</h6>
          {product.characteristics && product.characteristics.length > 0 && (
            <div>
              <h6>Characteristics:</h6>
              <ul>
                {product.characteristics.map((char, index) => (
                  <li key={index}>
                    {char.key}: {char.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.pricePerUnit && Object.keys(product.pricePerUnit).length > 0 && (
            <div>
              <h6>Цены за единицу:</h6>
              <ul>
                {Object.entries(product.pricePerUnit).map(([unit, price]) => (
                  <li key={unit}>
                    {unit}: {price} тг
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
              className="btn btn-secondary ms-1"
              onClick={() => {
              setCart([...cart, p]);
              localStorage.setItem(
               "cart",
               JSON.stringify([...cart, p])
               );
               toast.success("Item Added to cart");
               }}
               >
              ADD TO CART
        </button>       
      </div>
      <hr />
      <div className="row container similar-products">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 ? (
          <p className="text-center">No Similar Products found</p>
        ) : (
          <div className="d-flex flex-wrap">
            {relatedProducts.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                    src={p.photos?.[0] || `${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description?.substring(0, 30)}...
                  </p>
                  {p.price && <p className="card-text">Цена: {p.price} тг</p>}
                  {p.pricePerUnit && Object.entries(p.pricePerUnit)[0] && (
                    <p className="card-text">
                      Цена: {Object.entries(p.pricePerUnit)[0][1]} тг за {Object.entries(p.pricePerUnit)[0][0]}
                    </p>
                  )}
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Подробнее
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductInfo;