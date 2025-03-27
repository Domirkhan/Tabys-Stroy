import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import products from '../../data/Products';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { CartContext } from '../../context/CartContext';
import '../../assets/styles/ProductDetail.css';
import BottomNav from '../components/BottomNav';

function ProductDetail() {
  const { category, subCategory, productName } = useParams();
  const { addToCart } = useContext(CartContext);
  
  // Поиск товара с приведением всех значений к нижнему регистру
  const product = products.find(p =>
    p.category.trim().toLowerCase() === category.trim().toLowerCase() &&
    p.subCategory.trim().toLowerCase() === subCategory.trim().toLowerCase() &&
    p.name.trim().toLowerCase() === productName.trim().toLowerCase()
  );

  // Устанавливаем заголовок страницы
  useEffect(() => {
    document.title = product ? product.name : 'Продукт не найден';
  }, [product]);

  if (!product) {
    return (
      <>
        <Header />
        <div className="pd-container">
          <h2>Продукт не найден</h2>
        </div>
        <Footer />
      </>
    );
  }

  const images = product.images && product.images.length ? product.images : [product.image];
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(
    product.pricePerUnit ? Object.keys(product.pricePerUnit)[0] : ''
  );

  const handlePrev = () => {
    setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedUnit);
  };

  return (
    <>
        <Header />
        <section className="pd-section">
        <div className="pd-container">
        <h1 className="section-title-category">{product.name}</h1>
            <div className="pd-content">
            <div className="pd-images">
            <img 
                src={images[currentImage]} 
                alt={`${product.name} ${currentImage + 1}`} 
                className="pd-image"
            />
            {images.length > 1 && (
                <>
                <div className="pd-slider-controls">
                    <button onClick={handlePrev} className="pd-slider-btn prev">‹</button>
                    <button onClick={handleNext} className="pd-slider-btn next">›</button>
                </div>
                <div className="pd-slider-dots">
                    {images.map((_, index) => (
                    <span 
                        key={index} 
                        className={`pd-slider-dot ${index === currentImage ? 'active' : ''}`}
                    />
                    ))}
                </div>
                </>
            )}
            </div>
            <div className="pd-info">
            <div className="pd-description">
                <h3>Описание</h3>
                {product.detailedDescription || product.description || 'Описание отсутствует.'}
                </div>
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="pd-specifications">
                    <h3>Характеристики</h3>
                    <ul>
                    {Object.entries(product.specifications).map(([key, value]) => (
                        <li key={key}>
                        <strong>{key}:</strong> {value}
                        </li>
                    ))}
                    </ul>
                </div>
                )}
                <div className="pd-purchase">
                <div className="pd-price">
                    {product.pricePerUnit ? (
                    <span className="pd-price">
                        {product.pricePerUnit[selectedUnit]} тг за {selectedUnit}
                    </span>
                    ) : (
                    <span className="pd-price">{product.price} тг</span>
                    )}
                </div>
                {product.pricePerUnit && (
                    <div className="pd-unit-selector">
                    <label htmlFor="unit">Выберите единицу:</label>
                    <select
                        id="unit"
                        value={selectedUnit}
                        onChange={(e) => setSelectedUnit(e.target.value)}
                    >
                        {Object.keys(product.pricePerUnit).map(unit => (
                        <option key={unit} value={unit}>
                            {unit}
                        </option>
                        ))}
                    </select>
                    </div>
                )}
                <div className="pd-quantity-selector">
                    <button onClick={handleDecrement} className="pd-quantity-btn">–</button>
                    <span className="pd-quantity-value">{quantity}</span>
                    <button onClick={handleIncrement} className="pd-quantity-btn">+</button>
                </div>
                <button onClick={handleAddToCart} className="pd-add-to-cart-btn">
                    Добавить в корзину
                </button>
                </div>
            </div>
            </div>
        </div>
        </section>
        <Footer />
        <BottomNav />
    </>
    );
}

export default ProductDetail;