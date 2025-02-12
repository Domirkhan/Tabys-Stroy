//// filepath: src/assets/Pages/ProductPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Products from '../../data/Products';
import ProductPopup from '../components/ProductPopup';

function ProductPage() {
  const { id } = useParams();
  const product = Products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <>
        <Header />
        <div className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
          <h2>Товар не найден</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '100px' }}>
        <ProductPopup product={product} />
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;