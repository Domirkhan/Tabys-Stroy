import React, { useState, useEffect } from "react";
import { useSearch } from "../../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    performSearch();
  };

  const performSearch = async () => {
    if (!values.keyword) return;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data.products });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuggestionClick = (product) => {
    try {
      // Получаем значения slug для категории и подкатегории
      const categorySlug = product.category?.slug || 
                          (typeof product.category === 'string' ? product.category : '');
      
      const subCategorySlug = product.subCategory?.slug || 
                             (typeof product.subCategory === 'string' ? product.subCategory : '');
  
      // Обновляем значения в поиске
      setValues({ ...values, keyword: product.name, results: [product] });
      
      // Проверяем наличие всех необходимых параметров
      if (!categorySlug || !product.slug) {
        console.error('Missing required slugs:', { categorySlug, productSlug: product.slug });
        return;
      }
  
      // Формируем URL
      const url = subCategorySlug 
        ? `/${categorySlug}/${subCategorySlug}/${product.slug}`
        : `/${categorySlug}/${product.slug}`;
  
      navigate(url);
      setSuggestions([]);
    } catch (error) {
      console.error('Error in handleSuggestionClick:', error);
    }
  };

  useEffect(() => {
    if (values.keyword.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/api/v1/product/search/${values.keyword}`
        );
        setSuggestions(data.products);
      } catch (error) {
        console.log(error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [values.keyword, setValues]);

  return (
    <div className="search-input-wrapper">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <div className="search-suggestions">
          <ul>
            {suggestions.map((product) => (
              <li 
                key={product._id} 
                onClick={() => handleSuggestionClick(product)}
                style={{ cursor: "pointer" }}
              >
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;