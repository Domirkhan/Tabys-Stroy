import React from "react";
import { useSearch } from "../../context/search";
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNav from "../components/BottomNav";
import "../styles/Search.css";

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="search-page">
        <div className="container">
          <h1 className="search-title">Результаты поиска</h1>
          <div className="search-info">
            {Array.isArray(values?.results) && values.results.length > 0 ? (
              <h6>Найдено товаров: {values.results.length}</h6>
            ) : (
              <h6>Товары не найдены</h6>
            )}
          </div>
          <div className="search-results-grid">
            {Array.isArray(values?.results) &&
              values.results.map((p) => {
                const categorySlug = typeof p.category === 'object' ? p.category?.slug : p.category;
                const subCategorySlug = typeof p.subCategory === 'object' ? p.subCategory?.slug : p.subCategory;
                
                return (
                  <ProductCard
                    key={p._id}
                    product={{
                      ...p,
                      image: `${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`,
                      pricePerUnit: p.pricePerUnit // убедимся что это поле передается
                    }}
                    onClick={() => navigate(`/${categorySlug}/${subCategorySlug}/${p.slug}`)}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default Search;