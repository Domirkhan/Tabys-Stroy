import React, { useState } from 'react';
import '../../assets/styles/Header.css';
import cartIcon from "../../assets/icon/cart.png";

function Header() {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCatalog = () => {
        setIsCatalogOpen(!isCatalogOpen);
    };

    const toggleCategory = (category) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    return(
        <>
            <header className="header">
                <div className="header-top">
                    <div className="container">
                        <div className="catalog-btn" onClick={toggleCatalog}>
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='white' d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z'/%3E%3C/svg%3E" alt="menu" />
                            <span>Каталог</span>
                        </div>
                        <div className="logo">TABYS STROY</div>
                        <div className="search">
                            <input type="text" placeholder="Поиск" />
                            <button className="search-btn"></button>
                        </div>
                        <div className="header-actions">
                            <a href="#" className="action-btn compare"><span>Сравнить</span></a>
                            <a href="#" className="action-btn wishlist"><span>Избранное</span></a>
                            <a href="#" className="action-btn profile"><span>Профиль</span></a>
                            <div className="cart">
                            <img src={cartIcon} alt="" />
                                <span className="cart-count">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {isCatalogOpen && (
                <div className="catalog-overlay" onClick={toggleCatalog}>
                    <div className="catalog-sidebar" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={toggleCatalog}>X</button>
                        <h2>Категории</h2>
                        <ul className="category-list">
                            <li className={`category-item ${openCategory === 'paint' ? 'open' : ''}`} onClick={() => toggleCategory('paint')}>
                                <span className="category-title">Краска</span>
                                <span className="arrow">{openCategory === 'paint' ? '▲' : '▼'}</span>
                                <div className="subcategory-wrapper">
                                    <ul className="subcategory-list">
                                        <li>Dulux</li>
                                        <li>San Marino</li>
                                        <li>Краска для стен</li>
                                        <li>Краска для потолков</li>
                                        <li>Лаки</li>
                                        <li>Водоэмульсия</li>
                                        <li>Растворители</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`category-item ${openCategory === 'dry-mixes' ? 'open' : ''}`} onClick={() => toggleCategory('dry-mixes')}>
                                <span className="category-title">Сухие смеси</span>
                                <span className="arrow">{openCategory === 'dry-mixes' ? '▲' : '▼'}</span>
                                <div className="subcategory-wrapper">
                                    <ul className="subcategory-list">
                                        <li>Штукатурга</li>
                                        <li>Цемент</li>
                                        <li>Шпаклевка</li>
                                        <li>Гипс</li>
                                        <li>Клей</li>
                                        <li>Наливной пол</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`category-item ${openCategory === 'plumbing' ? 'open' : ''}`} onClick={() => toggleCategory('plumbing')}>
                                <span className="category-title">Сантехника</span>
                                <span className="arrow">{openCategory === 'plumbing' ? '▲' : '▼'}</span>
                                <div className="subcategory-wrapper">
                                    <ul className="subcategory-list">
                                        <li>Трубы</li>
                                        <li>Отвод, муфты</li>
                                        <li>Сместители</li>
                                        <li>Шланги</li>
                                        <li>Комплектующие для сместелей</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`category-item ${openCategory === 'power-tools' ? 'open' : ''}`} onClick={() => toggleCategory('power-tools')}>
                                <span className="category-title">Электроинструменты</span>
                                <span className="arrow">{openCategory === 'power-tools' ? '▲' : '▼'}</span>
                                <div className="subcategory-wrapper">
                                    <ul className="subcategory-list">
                                        <li>Шурупаверты</li>
                                        <li>Дрели</li>
                                        <li>Перфоратор</li>
                                        <li>Сварочный аппарат</li>
                                        <li>Гайкаверт</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`category-item ${openCategory === 'tools' ? 'open' : ''}`} onClick={() => toggleCategory('tools')}>
                                <span className="category-title">Инструменты</span>
                                <span className="arrow">{openCategory === 'tools' ? '▲' : '▼'}</span>
                                <div className="subcategory-wrapper">
                                    <ul className="subcategory-list">
                                        <li>Малаток</li>
                                        <li>Отвертка</li>
                                        <li>Пилы</li>
                                        <li>Топор</li>
                                        <li>Гайчные ключи</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`category-item ${openCategory === 'decorative-elements' ? 'open' : ''}`} onClick={() => toggleCategory('decorative-elements')}>
                                <span className="category-title">Декоративные элементы</span>
                                <span className="arrow">{openCategory === 'decorative-elements' ? '▲' : '▼'}</span>
                                <div className="subcategory-wrapper">
                                    <ul className="subcategory-list">
                                        <li>Гибкий мрамор</li>
                                        <li>Лувер</li>
                                        <li>Декор панели</li>
                                        <li>Галтели</li>
                                        <li>Обои</li>
                                        <li>Подсветки</li>
                                        <li>Люстры</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;