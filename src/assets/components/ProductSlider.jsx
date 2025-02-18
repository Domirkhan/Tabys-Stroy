//// filepath: /c:/Users/damir/Tabys-Stroy/src/assets/components/ProductSlider.jsx
import React, { useRef, useState } from 'react';
import ProductCard from './ProductCard';
import Products from '../../data/Products';
import ProductPopup from './ProductPopup';
import '../styles/ProductSlider.css';

function ProductSlider({ title, filterFn }) {
  const sliderRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const filteredProducts = Products.filter(filterFn);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="product-slider-section">
      {title && <h2 className="slider-title">{title}</h2>}
      <div className="slider-container">
        <button className="slider-nav prev" onClick={scrollLeft}>&#8249;</button>
        <div className="slider-wrapper" ref={sliderRef}>
          {filteredProducts.map(product => (
            <div key={product.id} className="slider-item">
              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
            </div>
          ))}
        </div>
        <button className="slider-nav next" onClick={scrollRight}>&#8250;</button>
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

export default ProductSlider;