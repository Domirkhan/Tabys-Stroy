import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import products from '../../data/Products';
import '../../assets/styles/Product.css';

function ProductList({ category, subCategory }) {
  const navigate = useNavigate();

  if (!category) {
    return (
      <section className="product-section">
        <div className="container">
          <h2 className="section-title-category">Выберите категорию</h2>
        </div>
      </section>
    );
  }

  // Фильтрация товаров с приведением к нижнему регистру
  const filteredProducts = products.filter(product => {
    const cat = category.trim().toLowerCase();
    const subCat = subCategory ? subCategory.trim().toLowerCase() : null;
    const prodCat = product.category.trim().toLowerCase();

    if (prodCat !== cat) return false;

    if (subCat) {
      const prodSubCat = product.subCategory.trim().toLowerCase();
      return prodSubCat === subCat;
    }
    return true;
  });

  return (
    <section className="product-section">
      <div className="container">
        <h2 className="section-title-category">
          {subCategory
            ? `Товары подкатегории: ${subCategory}`
            : `Товары категории: ${category}`}
        </h2>
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={`${product.id}-${product.category}-${product.subCategory}-${index}`}
              id={`product-${product.id}`}
              className="product-card-wrapper"
              onClick={() =>
                navigate(`/${category}/${subCategory}/${product.name}`)
              }
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;