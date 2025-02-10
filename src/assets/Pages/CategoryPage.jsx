import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductList from '../components/ProductList';

function CategoryPage() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const mainCategory = segments[0] || '';
  const subCategory = segments[1] || '';

  return (
    <>
      <Header />
      <ProductList category={mainCategory} subCategory={subCategory} />
      <Footer />
    </>
  );
}

export default CategoryPage;