import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Products from '../../data/Products';
import '../styles/MobileSearch.css';

function MobileSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
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
                    onClick={() => setSearchQuery('')}
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