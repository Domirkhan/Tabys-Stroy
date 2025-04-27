import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearch } from '../../../context/search';
import '../../styles/MobileSearch.css';

const MobileSearch = () => {
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
      setValues({ ...values, keyword: product.name, results: [product] });
      
      // Переходим на страницу продукта используя slug
      navigate(`/product/${product.slug}`);
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
        setSuggestions(data.products || []);
      } catch (error) {
        console.log(error);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [values.keyword]);

  return (
    <div className="mobile-search-wrapper">
      <form className="mobile-search-form" onSubmit={handleSubmit}>
        <input
          className="mobile-search-input"
          type="search"
          placeholder="Поиск товаров..."
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="mobile-search-button" type="submit">
          <svg 
            className="search-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </form>
      
      {values.keyword.trim() !== "" && (
        <div className="mobile-search-suggestions">
          {suggestions.length > 0 ? (
            <>
              <div className="suggestions-title">Возможно, вы искали:</div>
              <ul>
                {suggestions.map((product) => (
                  <li 
                    key={product._id} 
                    onClick={() => handleSuggestionClick(product)}
                  >
                    <div className="suggestion-item">
                      <img 
                        src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        className="suggestion-image"
                      />
                      <div className="suggestion-details">
                        <div className="suggestion-name">{product.name}</div>
                        <div className="suggestion-price">{product.price} ₸</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="no-suggestions">
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileSearch;