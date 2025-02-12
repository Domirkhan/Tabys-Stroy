//// filepath: src/assets/Pages/CategoryPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductList from '../components/ProductList';

function CategoryPage() {
  const { category, subCategory } = useParams();

  return (
    <>
      <Header />
      <ProductList category={category} subCategory={subCategory} />
      <Footer />
    </>
  );
}

export default CategoryPage;