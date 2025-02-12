//// filepath: src/assets/Pages/Product.jsx
import React, { useState } from 'react';
import '../../assets/styles/Product.css';
import Products from '../../data/Products';
import ProductCard from '../components/ProductCard';
import ProductPopup from '../components/ProductPopup';

function Product() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="product-section py-20 bg-light-gray">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold text-center mb-12">Популярные товары</h2>
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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