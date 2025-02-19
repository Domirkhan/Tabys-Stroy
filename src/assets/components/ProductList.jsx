import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductPopup from './ProductPopup';
import products from '../../data/Products.jsx';

function ProductList({ category, subCategory }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(product => product.category === category);
      if (subCategory) {
        filtered = filtered.filter(product => product.subCategory === subCategory);
      }
    }
    setFilteredProducts(filtered);
  }, [category, subCategory]);

  useEffect(() => {
    // Добавляем небольшую задержку, чтобы дать время на рендеринг элементов
    const timeoutId = setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.substring(1); // Убираем # из начала
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    }, 500); // Задержка в 500мс

    return () => clearTimeout(timeoutId);
  }, [filteredProducts]);

  return (
    <section className="product-section">
      <div className="container">
        <h2 className="section-title-category">
          {subCategory 
            ? `Товары подкатегории: ${subCategory}`
            : `Товары категории: ${category}`}
        </h2>
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
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

export default ProductList;