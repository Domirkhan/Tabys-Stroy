//// filepath: /c:/Users/damir/Tabys-Stroy/src/assets/Pages/CategoryPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductList from '../components/ProductList';
import MobileSearch from '../components/MobileSearch';

function CategoryPage() {
  const { category, subCategory } = useParams();
  // Если нужно отобразить подкатегорию (если есть) или основную категорию
  const titleText = subCategory ? subCategory : category;
  const title = `Tabys Stroy | ${titleText}`;

  return (
    <>
    <Header />
    <div className="app-container">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <MobileSearch />
      <main className="main-content">
        <ProductList category={category} subCategory={subCategory} />
      </main>
    </div>
    <Footer />
    </>
  );
}

export default CategoryPage;