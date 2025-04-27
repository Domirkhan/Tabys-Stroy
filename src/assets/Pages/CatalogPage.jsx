import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import BottomNav from '../components/BottomNav';
import '../../assets/styles/CatalogPage.css';
import useCategory from '../hooks/useCategory';
import { Helmet } from "react-helmet-async";

function CatalogPage() {
  const [openCategory, setOpenCategory] = useState(null);
  const { categories, subcategories, loading, error } = useCategory();

  const toggleCategory = (categorySlug) => {
    setOpenCategory(openCategory === categorySlug ? null : categorySlug);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="main-content">
          <div className="catalog-page">
            <h1 className="section-title-category">Загрузка...</h1>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="main-content">
          <div className="catalog-page">
            <h1 className="section-title-category">Ошибка загрузки каталога</h1>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tabys Stroy | Каталог</title>
      </Helmet>
      <Header />
      <main className="main-content">
        <div className="catalog-page">
          <h1 className="section-title-category">Каталог</h1>
          <div className="catalog-grid">
            {categories?.map((category) => (
              <div key={category._id} className="catalog-category">
                <div 
                  className="catalog-category-header"
                  onClick={() => toggleCategory(category.slug)}
                >
                  {category.iconUrl && (
                    <img 
                      src={`${import.meta.env.VITE_API}${category.iconUrl}`}
                      alt={category.name}
                      className="category-icon"
                    />
                  )}
                  <span className="category-name">{category.name}</span>
                  <span className={`category-arrow ${openCategory === category.slug ? 'open' : ''}`}>
                    ›
                  </span>
                </div>
                <div className={`subcategories ${openCategory === category.slug ? 'active' : ''}`}>
                  {subcategories
                    ?.filter(sub => sub.category && sub.category._id === category._id)
                    .map((sub) => (
                      <Link
                        key={sub._id}
                        to={`/${category.slug}/${sub.slug}`}
                        className="subcategory-link"
                      >
                        {sub.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default CatalogPage;