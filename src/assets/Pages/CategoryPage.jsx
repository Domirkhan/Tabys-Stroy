//// filepath: src/assets/Pages/CategoryPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductList from '../components/ProductList';
import MobileSearch from '../components/MobileSearch';

function CategoryPage() {
  const { category, subCategory } = useParams();

  return (
    <div className="app-container">
      <Header />
      <MobileSearch />
      <main className="main-content">
        <ProductList category={category} subCategory={subCategory} />
      </main>
      <Footer />
    </div>
  );
}

export default CategoryPage;