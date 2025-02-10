///// filepath: src/assets/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductPopup from './ProductPopup';
import productsData from '../../data/product.json';

function ProductList({ category, subCategory }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Объект переводов для сабкатегорий
  const subCategoryNames = {
    "dulux": "Dulux",
    "san-marino": "San Marino",
    "ceiling-paint": "Краска для потолков",
    "wall-paint": "Краска для стен",
    "varnish": "Лаки",
    "emulsion": "Водоэмульсия",
    "solvents": "Растворители",
    "drills": "Дрели-шуруповерты",
    "hammer-drills": "Перфораторы",
    "grinders": "Болгарки",
    "sanders": "Шлифовальные машины",
    "angle-grinders": "Фризеры",
    "jigsaws": "Электролобзики",
    "planers": "Электрорубанки",
    "sets": "Наборы бит",
    "bits": "Биты",
    "magnetic-bits": "Магнитные биты",
    "holders": "Битодержатели",
    "angle-bits": "Биты торцевые",
    "hex-bits": "Биты шестигранные",
    "slot-bits": "Биты шлицевые",
    "screwdrivers": "Отвертки",
    "pliers": "Плоскогубцы и пасатижи",
    "wrenches": "Гаичные ключи",
    "sockets": "Головки и торцевые",
    "knives": "Ножи строительные",
    "scissors": "Ножницы",
    "cutters": "Бокорезы и кусачки",
    "bolt-cutters": "Болторезы",
    "saws": "Пилы и ножовки",
    "hammers": "Молотки",
    "sledgehammers": "Кувалды",
    "crowbars": "Ломы и гвоздодеры",
    "picks": "Кирки и лопаты",
    "carpentry": "Столярные инструменты",
    "chisels": "Зубилы и дыроколы",
    "generators": "Бензоэлектростанции",
    "chainsaws": "Бензопилы",
    "lawn-mowers": "Бензогазонокосилки",
    "others": "Прочие бензиновые техники",
    "pipes": "Трубы",
    "fittings": "Фитинги",
    "toilets": "Унитазы и биде",
    "bathroom-furniture": "Мебель для ванной",
    "baths": "Ванны и комплектующие",
    "sinks": "Раковины",
    "mirrors": "Зеркала",
    "mixers": "Смесители для ванной и кухни",
  };

  const displaySubCategory = subCategory
    ? (subCategoryNames[subCategory] || subCategory)
    : '';

  useEffect(() => {
    let filtered = productsData;
    if (category) {
      filtered = filtered.filter(product => product.category === category);
      if (subCategory) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(subCategory.toLowerCase())
        );
      }
    }
    setProducts(filtered);
  }, [category, subCategory]);

  return (
    <>
      <section className="product-section py-20 bg-light-gray">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-3xl font-bold text-center mb-12">
            {subCategory 
              ? `Товары подкатегории: ${displaySubCategory}` 
              : `Товары категории: ${category}`}
          </h2>
          <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
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