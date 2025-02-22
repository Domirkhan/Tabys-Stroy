import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import products from '../../data/Products';
import ProductPopup from './ProductPopup';
import '../../assets/styles/Product.css';

function ProductList({ category, subCategory }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

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

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sortedProducts);
  };

  // Функция вызывается при выборе товара в поиске.
  // Она обновляет URL hash, чтобы сработал эффект прокрутки и подсветки.
  const handleSearchSelect = (product) => {
    const hash = `product-${product.id}`;
    window.location.hash = hash;

    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      setTimeout(() => {
        element.classList.add('highlighted');
        setTimeout(() => {
          element.classList.remove('highlighted');
        }, 2000);
      }, 100);
    }
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
          {filteredProducts.map(product => (
            <div
              key={product.id}
              id={`product-${product.id}`} // назначаем идентификатор для прокрутки
              className="product-card-wrapper"
              onClick={() => {
                // При клике обновляем hash, чтобы скроллился к выбранной карточке,
                // а также открываем попап с информацией о товаре.
                handleSearchSelect(product);
                setSelectedProduct(product);
              }}
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