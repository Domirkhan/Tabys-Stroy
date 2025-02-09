import React, { useState } from 'react';
import '../../assets/styles/Header.css';
import cartIcon from "../../assets/icon/cart.png";

function Header() {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [openSubCategory, setOpenSubCategory] = useState(null);

    const toggleCatalog = () => {
        setIsCatalogOpen(!isCatalogOpen);
        if (isCatalogOpen) {
            setOpenCategory(null);
            setOpenSubCategory(null);
        }
    };

    const toggleCategory = (category) => {
        setOpenCategory(openCategory === category ? null : category);
        setOpenSubCategory(null);
    };

    const toggleSubCategory = (subCategory) => {
        setOpenSubCategory(openSubCategory === subCategory ? null : subCategory);
    };

    return (
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
                            <a href="#" className="action-btn compare">
                                <span>Сравнить</span>
                            </a>
                            <a href="#" className="action-btn wishlist">
                                <span>Избранное</span>
                            </a>
                            <a href="#" className="action-btn profile">
                                <span>Профиль</span>
                            </a>
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
                            <li className={`category-item ${openCategory === 'paint' ? 'open' : ''}`}>
                                <div className="category-header" onClick={() => toggleCategory('paint')}>
                                    <span className="category-title">Краска</span>
                                    <span className="arrow">{openCategory === 'paint' ? '▲' : '▼'}</span>
                                </div>
                                <div className="subcategory-wrapper">
                                    <ul className="subcategory-list">
                                        <li>
                                            <a href="/paint/dulux" onClick={(e) => e.stopPropagation()}>
                                                Dulux
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/paint/san-marino" onClick={(e) => e.stopPropagation()}>
                                                San Marino
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/paint/ceiling-paint" onClick={(e) => e.stopPropagation()}>
                                                Краска для потолков
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/paint/ceiling-paint" onClick={(e) => e.stopPropagation()}>
                                                Краска для стен
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/paint/varnish" onClick={(e) => e.stopPropagation()}>
                                                Лаки
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/paint/emulsion" onClick={(e) => e.stopPropagation()}>
                                                Водоэмульсия
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/paint/solvents" onClick={(e) => e.stopPropagation()}>
                                                Растворители
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <ul className="category-list">
                            <li className={`category-item ${openCategory === 'power-tools' ? 'open' : ''}`}>
                                <div className="category-header" onClick={() => toggleCategory('power-tools')}>
                                    <span className="category-title">Электроинструменты</span>
                                    <span className="arrow">{openCategory === 'power-tools' ? '▲' : '▼'}</span>
                                </div>
                                <div className="subcategory-wrapper">
                                    <ul className="subcategory-list">
                                        <li>
                                            <a href="/power-tools/drills" onClick={(e) => e.stopPropagation()}>
                                                Дрели-шуруповерты
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/hammer-drills" onClick={(e) => e.stopPropagation()}>
                                                Перфораторы
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/grinders" onClick={(e) => e.stopPropagation()}>
                                                Болгарки
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/sanders" onClick={(e) => e.stopPropagation()}>
                                                Шлифовальные машины
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/angle-grinders" onClick={(e) => e.stopPropagation()}>
                                                Фризеры
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/jigsaws" onClick={(e) => e.stopPropagation()}>
                                                Электролобзики
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/planers" onClick={(e) => e.stopPropagation()}>
                                                Электрорубанки
                                            </a>
                                        </li>
                                        <li className={`subcategory-item ${openSubCategory === 'wall-paint' ? 'open' : ''}`}>
                                            <div className="subcategory-header" onClick={() => toggleSubCategory('wall-paint')}>
                                                <a href="/paint/wall-paint" onClick={(e) => e.stopPropagation()}>
                                                    Электропилы
                                                </a>
                                                <span className="arrow">{openSubCategory === 'wall-paint' ? '▲' : '▼'}</span>
                                            </div>
                                            {openSubCategory === 'wall-paint' && (
                                                <ul className="subsubcategory-list">
                                                    <li>
                                                        <a href="/paint/wall-paint/type1" onClick={(e) => e.stopPropagation()}>
                                                            Электропилы
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/paint/wall-paint/type2" onClick={(e) => e.stopPropagation()}>
                                                            Стабельные пилы
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/paint/wall-paint/type2" onClick={(e) => e.stopPropagation()}>
                                                            Торцевые пилы
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/paint/wall-paint/type2" onClick={(e) => e.stopPropagation()}>
                                                            Церкулярные пилы
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/paint/wall-paint/type2" onClick={(e) => e.stopPropagation()}>
                                                            Монтажные пилы
                                                        </a>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                        <li>
                                            <a href="/power-tools/specials" onClick={(e) => e.stopPropagation()}>
                                                Граверы
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/renovators" onClick={(e) => e.stopPropagation()}>
                                                Реноваторы
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/sprayers" onClick={(e) => e.stopPropagation()}>
                                                Краскопульты электрические
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/gun-drivers" onClick={(e) => e.stopPropagation()}>
                                                Гайкаверты
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/construction-heaters" onClick={(e) => e.stopPropagation()}>
                                                Фены строительные
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/mixers" onClick={(e) => e.stopPropagation()}>
                                                Миксеры
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/power-tools/cutters" onClick={(e) => e.stopPropagation()}>
                                                Штроборезы
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <ul className="category-list">
                            <li className={`category-item ${openCategory === 'plumbing' ? 'open' : ''}`}>
                                <div className="category-header" onClick={() => toggleCategory('plumbing')}>
                                    <span className="category-title">Сантехника</span>
                                    <span className="arrow">{openCategory === 'plumbing' ? '▲' : '▼'}</span>
                                </div>
                                <div className="subcategory-wrapper">
                                    <ul className="subcategory-list">
                                        <li>
                                            <a href="/plumbing/#" onClick={(e) => e.stopPropagation()}>
                                                Трубы
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/plumbing/#" onClick={(e) => e.stopPropagation()}>
                                                Фитинги
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/plumbing/#" onClick={(e) => e.stopPropagation()}>
                                                Унитазы и биде
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/plumbing/#" onClick={(e) => e.stopPropagation()}>
                                                Мебель для ванной
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/plumbing/#" onClick={(e) => e.stopPropagation()}>
                                                Ванны и коплектующие
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/plumbing/#" onClick={(e) => e.stopPropagation()}>
                                                Раковины
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/plumbing/#" onClick={(e) => e.stopPropagation()}>
                                                Зеркала
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/plumbing/#" onClick={(e) => e.stopPropagation()}>
                                                Смесители для ванной и кухни
                                            </a>
                                        </li>
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