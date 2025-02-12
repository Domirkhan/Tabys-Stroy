//// filepath: src/assets/components/ProductList.jsx
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
        filtered = filtered.filter(product => 
          product.subCategory === subCategory
        );
      }
    }
    setFilteredProducts(filtered);
  }, [category, subCategory]);

  return (
    <>
      <section className="product-section">
        <div className="container">
          <h2 className="section-title">
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
      </section>
      
      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export default ProductList;