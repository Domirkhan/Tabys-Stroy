import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import BottomNav from '../components/BottomNav';
import '../../assets/styles/CatalogPage.css';

function CatalogPage() {
  const [catalog, setCatalog] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/v1/catalog`);
        if (response.data && response.data.categories) {
          setCatalog(response.data.categories);
        } else {
          console.error("Неверный формат данных каталога:", response.data);
        }
      } catch (error) {
        console.error("Ошибка получения каталога:", error);
      }
    };
    fetchCatalog();
  }, []);

  const toggleCategory = (categorySlug) => {
    setOpenCategory(openCategory === categorySlug ? null : categorySlug);
  };

  const closeCatalog = () => {
    console.log("Каталог закрыт");
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="catalog-page">
          <h1 className="section-title-category">Каталог</h1>
          <ul className="category-list">
            {catalog.map((category) => (
              <li
                key={category.slug}
                className={`category-item ${openCategory === category.slug ? 'open' : ''}`}
              >
                <div
                  className="category-header"
                  onClick={() => toggleCategory(category.slug)}
                >
                  <img src={category.iconUrl} alt={category.name} className="icon" />
                  <span className="category-title">{category.name}</span>
                  <span className="arrow">
                    {openCategory === category.slug ? '▲' : '▼'}
                  </span>
                </div>
                {openCategory === category.slug && category.subcategories && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      {category.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <Link to={`/${category.slug}/${sub.slug}`} onClick={closeCatalog}>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default CatalogPage;