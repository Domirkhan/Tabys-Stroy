import React, { useState, useRef } from 'react';
import '../../assets/styles/Product.css';
import Products from '../../data/Products';
import ProductCard from '../components/ProductCard';
import ProductPopup from '../components/ProductPopup';

function Product() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Скорость прокрутки
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="product-section py-20 bg-light-gray">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold text-center mb-12">Популярные товары</h2>
        <div
          className="products-grid"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {Products.map((product, index) => (
            <ProductCard key={index} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </div>
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