import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import products from '../../data/Products';
import ProductPopup from './ProductPopup';
import '../../assets/styles/Product.css';

function ProductList({ category, subCategory }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);

  // Сброс сортировки при изменении категории или подкатегории
  useEffect(() => {
    setSortOrder('asc');
  }, [category, subCategory]);

  useEffect(() => {
    // Фильтрация продуктов
    let filtered = [...products];
    if (category && subCategory) {
      filtered = filtered.filter(product => 
        product.category === category && product.subCategory === subCategory
      );
    } else if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Сортировка отфильтрованных продуктов
    const sorted = filtered.sort((a, b) => {
      const priceA = a.pricePerUnit?.шт || 0;
      const priceB = b.pricePerUnit?.шт || 0;
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    setFilteredAndSortedProducts([...sorted]);
  }, [category, subCategory, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <section className="product-section">
      <div className="container">
        <h2 className="section-title-category">
          {subCategory ? `Товары подкатегории: ${subCategory}` : `Товары категории: ${category}`}
        </h2>
        <div className="sort-wrapper">
          <label htmlFor="sortOrder">Сортировка по:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Сначала дешевые</option>
            <option value="desc">Сначала дорогие</option>
          </select>
        </div>
        <div className="products-grid">
          {filteredAndSortedProducts.map(product => (
            <div
              key={product.id}
              id={`product-${product.id}`}
              className="product-card-wrapper"
              onClick={() => setSelectedProduct(product)}
            >
              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
            </div>
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