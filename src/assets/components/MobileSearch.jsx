import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MobileSearch.css';

function MobileSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSelect = (product) => {
    const hash = `product-${product.id}`;
    navigate(`/${product.category}/${product.subCategory}#${hash}`);
    setSearchQuery("");

    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        element.classList.add('highlighted');
        setTimeout(() => {
          element.classList.remove('highlighted');
        }, 2000);
      } else {
        console.error(`Element with id ${hash} not found`);
      }
    }, 500); // Увеличиваем время задержки до 500 мс
  };

  const filteredProducts = Products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mobile-search">
      <input
        type="text"
        placeholder="Поиск..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className="search-btn" />
      {searchQuery && (
        <div className="search-suggestions">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map(product => (
                <li key={product.id}>
                  <Link
                    to={`/${product.category}/${product.subCategory}`}
                    onClick={() => handleSearchSelect(product)}
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ padding: '0.5rem' }}>Ничего не найдено</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileSearch;