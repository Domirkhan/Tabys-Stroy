import React, { useState } from 'react';
import ProductCard from './ProductCard';
import products from '../../data/Products';
import ProductPopup from './ProductPopup';
import '../../assets/styles/Product.css';

function ProductList({ category, subCategory }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!category) {
    return (
      <section className="product-section">
        <div className="container">
          <h2 className="section-title-category">Выберите категорию</h2>
        </div>
      </section>
    );
  }

  // Отладочный лог. Проверьте, что параметры из URL корректны.
  console.log("Category:", category, "subCategory:", subCategory);

  // Фильтрация продуктов при каждом рендере (без useMemo)
  const filteredProducts = products.filter(product => {
    // Приводим все к нижнему регистру и убираем пробелы
    const cat = category.trim().toLowerCase();
    const subCat = subCategory ? subCategory.trim().toLowerCase() : null;

    // Приводим поля продукта к нижнему регистру
    const prodCat = product.category.trim().toLowerCase();
    if (prodCat !== cat) return false;

    if (subCat) {
      const prodSubCat = product.subCategory.trim().toLowerCase();
      return prodSubCat === subCat;
    }
    return true;
  });

  // Вывести результат фильтрации в консоль для отладки
  console.log("Filtered products:", filteredProducts);

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
            <div
              key={`${product.id}-${product.category}-${product.subCategory}-${Math.random()}`}
              id={`product-${product.id}`}
              className="product-card-wrapper"
              onClick={() => setSelectedProduct(product)}
            >
              <ProductCard
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
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