import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/NewProducts.css';

const NewProducts = () => {
  const [products, setProducts] = useState([]);
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
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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
        <div className="section-header">
          <h2 className="section-title">Новинки</h2>
          <div className="slider-controls">
            <button className="slider-arrow prev" onClick={goToPrev}>
              &#8249;
            </button>
            <button className="slider-arrow next" onClick={goToNext}>
              &#8250;
            </button>
          </div>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {products.map((product) => (
            <div key={product._id} className="product-slide">
              <ProductCard
                product={{
                  ...product,
                  image: `${import.meta.env.VITE_API}/api/v1/product/product-photo/${product._id}`
                }}
                onClick={() => 
                  navigate(`/${product.category.slug}/${product.subcategory?.slug}/${product.slug}`)
                }
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewProducts;