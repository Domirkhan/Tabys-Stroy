import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/styles/Product.css';
import Products from '../../data/Products';
import ProductCard from '../components/ProductCard';
import ProductPopup from '../components/ProductPopup';

function Product() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sliderRef = useRef(null);

  // IDs товаров, которые вы хотите отобразить в слайдере
  const productIds = [67, 2, 3, 4, 5]; // Замените на нужные вам ID

  const filteredProducts = Products.filter(product => productIds.includes(product.id));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Изменяем на 2 карточки
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Изменяем на 2 карточки
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
    <section className="product-section py-20 bg-light-gray">
      <div className="container">
        <div className="slider-header">
          <h2 className="section-title text-3xl font-bold text-center mb-12">Популярные товары</h2>
          <div className="slider-arrows">
            <button className="slider-arrow slider-arrow-prev" onClick={goToPrev}>
              &lt;
            </button>
            <button className="slider-arrow slider-arrow-next" onClick={goToNext}>
              &gt;
            </button>
          </div>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {filteredProducts.map((product, index) => (
            <div key={index} className="product-slide">
              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
            </div>
          ))}
        </Slider>
      </div>
      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

export default Product;