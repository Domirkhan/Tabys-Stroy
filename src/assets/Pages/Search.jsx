import React from "react";
import { useSearch } from "../../context/search";
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {Array.isArray(values?.results) && values.results.length > 0
              ? `Found ${values.results.length} products`
              : "No Products Found"}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {Array.isArray(values?.results) &&
              values.results.map((p) => {
                // Проверяем и получаем значения напрямую из объекта
                const categorySlug = typeof p.category === 'object' ? p.category?.slug : p.category;
                const subCategorySlug = typeof p.subCategory === 'object' ? p.subCategory?.slug : p.subCategory;
                
                return (
                  <ProductCard
                    key={p._id}
                    product={{
                      ...p,
                      image: `${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`,
                    }}
                    onClick={() => navigate(`/${categorySlug}/${subCategorySlug}/${p.slug}`)}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;