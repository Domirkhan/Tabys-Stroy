//// filepath: src/assets/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductPopup from './ProductPopup';
import products from '../../data/Products.jsx';

// Объект для перевода названий подкатегорий
const categoryTranslations = {
  'ceiling-paint': 'Краска для потолков',
  'wall-paint': 'Краска для стен',
  'dulux': 'Dulux',
  'san-marino': 'San Marino',
  'varnish': 'Лаки',
  'emulsion': 'Водоэмульсия',
  'solvents': 'Растворители',
  'drills': 'Дрели-шуруповерты', // Оставляем этот ключ
  'hammer-drills': 'Перфораторы',
  'grinders': 'Болгарки',
  'sanders': 'Шлифовальные машины',
  'angle-grinders': 'Фрезеры',
  'jigsaws': 'Электролобзики',
  'planers': 'Электрорубанки',
  'bit-sets': 'Наборы бит', // Изменяем ключ на уникальное значение
  'bits': 'Биты',
  'magnetic-bits': 'Магнитные биты',
  'holders': 'Битодержатели',
  'angle-bits': 'Биты торцевые',
  'hex-bits': 'Биты шестигранные',
  'slot-bits': 'Биты шлицевые',
  'cutters': 'Бокорезы и кусачки',
  'metal-drills': 'Сверла по металлу', // Изменяем ключ на уникальное значение
  'wood-drills': 'Сверла по дереву',
  'concrete-drills': 'Сверла по бетону',
  'generators': 'Бензоэлектростанции',
  'chainsaws': 'Бензопилы',
  'lawn-mowers': 'Бензогазонокосилки',
  'others': 'Прочие бензиновые техники',
  'pipes': 'Трубы',
  'fittings': 'Фитинги',
  'toilets': 'Унитазы и биде',
  'bathroom-furniture': 'Мебель для ванной',
  'baths': 'Ванны и комплектующие',
  'sinks': 'Раковины',
  'mirrors': 'Зеркала',
  'mixers': 'Смесители для ванной и кухни'
};

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
    <section className="product-section">
      <div className="container">
        <h2 className="section-title-category">
          {subCategory 
            ? `Товары подкатегории: ${categoryTranslations[subCategory] || subCategory}`
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