import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import MobileSearch from '../components/MobileSearch';

import BottomNav from '../components/BottomNav';
import { Helmet } from "react-helmet-async";
// import ProductList from '../components/ProductList';
import SubCategoryProduct from '../Pages/SubCategoryProduct';

function CategoryPage() {
  const { category, subCategory } = useParams();
  // Используем subCategory, если оно есть, иначе category – для заголовка страницы
  const title = subCategory ? subCategory : category;

  return (
    <>
      <Header />
      <div className="app-container">
        <Helmet>
          <title>{`Tabys Stroy | ${title}`}</title>
        </Helmet>
        <MobileSearch />
        <main className="main-content">
          <SubCategoryProduct category={category} subCategory={subCategory} />
        </main>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
}

export default CategoryPage;