import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/styles/Product.css';
import Products from '../../data/Products';
import ProductCard from '../components/ProductCard';

function ProductN() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // IDs товаров, которые нужно отобразить в слайдере
  const productIds = [93.1, 91.1, 51.1, 51.3, 171.1, 171.3, 83.1, 50.1]; // замените на нужные ID
  const filteredProducts = Products.filter(product => productIds.includes(product.id));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
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
    <section className="product-section-2 py-20 bg-light-gray">
      <div className="container">
        <div className="slider-header">
          <h2 className="section-title text-3xl font-bold text-center mb-12">
            Новинки 
          </h2>
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
            <div 
              key={index} 
              className="product-slide"
              onClick={() => 
                navigate(`/${product.category}/${product.subCategory}/${encodeURIComponent(product.name)}`)
              }
            >
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default ProductN;