import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import '../../assets/styles/Header.css';
import cartIcon from "../../assets/icon/cart.png";
import Products from "../../data/Products";
import Logo from "../icon/logo.png"
import Menu from "../icon/menu.png"

function Header() {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
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

  const openCatalog = () => {
    setIsCatalogOpen(true);
    setClosing(false);
  };

  const closeCatalog = () => {
    setClosing(true);
    setTimeout(() => {
      setIsCatalogOpen(false);
      setOpenCategory(null);
      setOpenSubCategory(null);
    }, 300);
  };

  const toggleCatalog = () => {
    if (isCatalogOpen) {
      closeCatalog();
    } else {
      openCatalog();
    }
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenSubCategory(null);
  };

  const toggleSubCategory = (subCategory) => {
    setOpenSubCategory(openSubCategory === subCategory ? null : subCategory);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="catalog-btn" onClick={toggleCatalog}>
              <img
                src={Menu}
                alt="menu"
              />
              <span>Каталог</span>
            </div>
            <div className="logo">
            <img className='logotipe' src={Logo} alt="" />
              <a href="/Tabys-Stroy/">TABYS STROY</a>
            </div>
            <div className="search" style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Поиск"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="search-btn"></button>
              {searchQuery && filteredProducts.length > 0 && (
                <div className="search-suggestions">
                  <ul>
                    {filteredProducts.map(product => (
                      <li key={product.id}>
                        <Link 
                          to={`/${product.category}/${product.subCategory}`} 
                          onClick={() => {
                            handleSearchSelect(product);
                            if (isCatalogOpen) {
                              closeCatalog();
                            }
                          }}
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {searchQuery && filteredProducts.length === 0 && (
                <div className="search-suggestions">
                  <p style={{ padding: "0.5rem" }}>Ничего не найдено</p>
                </div>
              )}
            </div>
            <div className="header-actions">
              <Link to="/cart" className="cart">
                <img src={cartIcon} alt="cart" />
                <span className="cart-count">{totalQuantity}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <button className="mobile-menu-btn">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23333' d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3V4zm0 7h18v2H3V4z'/%3E%3C/svg%3E"
                alt="menu"
              />
            </button>
            <nav className="main-nav">
              <Link to="/about">О нас</Link>
              <Link to="/payment">Оплата</Link>
              <Link to="/delivery">Доставка</Link>
              <Link to="/contacts">Контакты</Link>
            </nav>
            <div className="lang-phone">
              <a href="tel:+78008008080" className="phone">+7(705) 454-13-49</a>
            </div>
          </div>
        </div>
      </header>
      {isCatalogOpen && (
        <div className="catalog-overlay" onClick={closeCatalog}>
          <div className={`catalog-sidebar ${closing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            
            <button className="close-btn" onClick={closeCatalog}>X</button>
            <h2>Каталог</h2>
            {/* Категория "Сантехника" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'plumbing' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('plumbing')}>
                  <span className="category-title">Сантехника</span>
                  <span className="arrow">{openCategory === 'plumbing' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'plumbing' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/plumbing/Трубы" onClick={closeCatalog}>
                          Трубы
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Фитинги" onClick={closeCatalog}>
                          Фитинги
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Шланги" onClick={closeCatalog}>
                          Шланги
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Запорно-регулирующая арматура" onClick={closeCatalog}>
                          Запорно-регулирующая арматура
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Канализация" onClick={closeCatalog}>
                          Канализация
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Унитазы и биде" onClick={closeCatalog}>
                          Унитазы и биде
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Мебель для ванной" onClick={closeCatalog}>
                          Мебель для ванной
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Ванны и комплектующие" onClick={closeCatalog}>
                          Ванны и комплектующие
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Раковины" onClick={closeCatalog}>
                          Раковины
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Зеркала" onClick={closeCatalog}>
                          Зеркала
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Смесители для ванной и кухни" onClick={closeCatalog}>
                          Смесители для ванной и кухни
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Инструменты" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'tools' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('tools')}>
                  <span className="category-title">Инструменты</span>
                  <span className="arrow">{openCategory === 'tools' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'tools' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/tools/Наборы инструментов" onClick={closeCatalog}>
                          Наборы инструментов
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Отвертки" onClick={closeCatalog}>
                          Отвертки
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Плоскогубцы и пасатижи" onClick={closeCatalog}>
                          Плоскогубцы и пасатижи
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Гаичные ключи" onClick={closeCatalog}>
                          Гаичные ключи
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Головки и торцевые" onClick={closeCatalog}>
                          Головки и торцевые
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Ножи строительные" onClick={closeCatalog}>
                          Ножи строительные
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Ножницы" onClick={closeCatalog}>
                          Ножницы
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Бокорезы и кусачки" onClick={closeCatalog}>
                          Бокорезы и кусачки
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Болторезы" onClick={closeCatalog}>
                          Болторезы
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Пилы и ножовки" onClick={closeCatalog}>
                          Пилы и ножовки
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Молотки" onClick={closeCatalog}>
                          Молотки
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Кувалды" onClick={closeCatalog}>
                          Кувалды
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Ломы и гвоздодеры" onClick={closeCatalog}>
                          Ломы и гвоздодеры
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Кирки и лопаты" onClick={closeCatalog}>
                          Кирки и лопаты
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Столярные инструменты" onClick={closeCatalog}>
                          Столярные инструменты
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Зубилы и дыроколы" onClick={closeCatalog}>
                          Зубилы и дыроколы
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Экстракторы" onClick={closeCatalog}>
                          Экстракторы
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Мультитулы" onClick={closeCatalog}>
                          Мультитулы
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Кабелерезы и тросорезы" onClick={closeCatalog}>
                          Кабелерезы и тросорезы
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Электроинструменты" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'power-tools' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('power-tools')}>
                  <span className="category-title">Электроинструменты</span>
                  <span className="arrow">{openCategory === 'power-tools' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'power-tools' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/power-tools/Дрели-шуруповерты" onClick={closeCatalog}>
                          Дрели-шуруповерты
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Перфораторы" onClick={closeCatalog}>
                          Перфораторы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Болгарки" onClick={closeCatalog}>
                          Болгарки
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Шлифовальные машины" onClick={closeCatalog}>
                          Шлифовальные машины
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Фризеры" onClick={closeCatalog}>
                          Фризеры
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Электролобзики" onClick={closeCatalog}>
                          Электролобзики
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Электрорубанки" onClick={closeCatalog}>
                          Электрорубанки
                        </Link>
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'electric-saws' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('electric-saws')}>
                          <span>Электропилы</span>
                          <span className="arrow">{openSubCategory === 'electric-saws' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'electric-saws' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/power-tools/Электропилы" onClick={closeCatalog}>
                                Электропилы
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tools/Стабильные пилы" onClick={closeCatalog}>
                                Стабильные пилы
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tools/Торцевые пилы" onClick={closeCatalog}>
                                Торцевые пилы
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tools/Церкулярные пилы" onClick={closeCatalog}>
                                Церкулярные пилы
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tools/ Монтажные пилы" onClick={closeCatalog}>
                                Монтажные пилы
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                        <Link to="/power-tools/Граверы" onClick={closeCatalog}>
                          Граверы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Реноваторы" onClick={closeCatalog}>
                          Реноваторы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Краскопульты электрические" onClick={closeCatalog}>
                          Краскопульты электрические
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Гайкаверты" onClick={closeCatalog}>
                          Гайкаверты
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Фены строительные" onClick={closeCatalog}>
                          Фены строительные
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Миксеры" onClick={closeCatalog}>
                          Миксеры
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Штроборезы" onClick={closeCatalog}>
                          Штроборезы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Отбойные молотки" onClick={closeCatalog}>
                          Отбойные молотки
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Арматурорезы" onClick={closeCatalog}>
                          Арматурорезы 
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Точильные станки" onClick={closeCatalog}>
                          Точильные станки  
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Пневмостеплер" onClick={closeCatalog}>
                          Пневмостеплер 
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Вибратор " onClick={closeCatalog}>
                          Вибратор 
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Сварочные аппараты" onClick={closeCatalog}>
                          Сварочные аппараты
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Ножницы и баранострижеры электрические" onClick={closeCatalog}>
                          Ножницы и баранострижеры электрические
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Минимойки и промышленные пылесосы" onClick={closeCatalog}>
                          Минимойки и промышленные пылесосы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Пушки" onClick={closeCatalog}>
                          Пушки
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Компрессоры" onClick={closeCatalog}>
                          Компрессоры 
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/other-Прочие электроинструменты" onClick={closeCatalog}>
                          Прочие электроинструменты 
                        </Link>
                      </li>
                    </ul>
                  </div>  
                )}
              </li>
            </ul>
            {/*Категория Аксесуары для электроинструментов*/}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'power-tool-accessories' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('power-tool-accessories')}>
                  <span className="category-title">Аксессуары для электроинструментов</span>
                  <span className="arrow">{openCategory === 'power-tool-accessories' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'power-tool-accessories' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li className={`subcategory-item ${openSubCategory === 'sets-bits' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('sets-bits')}>
                          <span>Биты и наборы бит для шуруповерта</span>
                          <span className="arrow">{openSubCategory === 'sets-bits' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'sets-bits' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/power-tool-accessories/Наборы" onClick={closeCatalog}>
                                Наборы
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Биты" onClick={closeCatalog}>
                                Биты
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Магнитные биты" onClick={closeCatalog}>
                                Магнитные биты
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Битодержатели" onClick={closeCatalog}>
                                Битодержатели
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Биты торцевые" onClick={closeCatalog}>
                                Биты торцевые
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Биты шестигранные " onClick={closeCatalog}>
                                Биты шестигранные
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Биты шлицевые" onClick={closeCatalog}>
                                Биты шлицевые
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'drill-sets' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('drill-sets')}>
                          <span>Сверла и наборы сверл</span>
                          <span className="arrow">{openSubCategory === 'drill-sets' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'drill-sets' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/power-tool-accessories/По металу" onClick={closeCatalog}>
                                По металу
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/По дереву" onClick={closeCatalog}>
                                По дереву
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/По бетону" onClick={closeCatalog}>
                                По бетону
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/ По керамике и керамограниту и стеклу" onClick={closeCatalog}>
                                По керамике и керамограниту и стеклу
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Сверла универсальные" onClick={closeCatalog}>
                                Сверла универсальные
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'drills-picks' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('drills-picks')}>
                          <span>Буры, пики и зубила</span>
                          <span className="arrow">{openSubCategory === 'drills-picks' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'drills-picks' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/power-tool-accessories/Буры" onClick={closeCatalog}>
                                Буры
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Зубила и пики" onClick={closeCatalog}>
                                Зубила и пики
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'discs' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('discs')}>
                          <span> Диски отрезные, алмазные и пильные </span>
                          <span className="arrow">{openSubCategory === 'discs' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'discs' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/power-tool-accessories/Диски отрезные" onClick={closeCatalog}>
                                Диски отрезные
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Диски алмазные" onClick={closeCatalog}>
                                Диски алмазные
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Диски пильные" onClick={closeCatalog}>
                                Диски пильные
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'power-tool-crowns' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('power-tool-crowns')}>
                          <span>  Коронки для электроинструментов </span>
                          <span className="arrow">{openSubCategory === 'power-tool-crowns' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'power-tool-crowns' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/power-tool-accessories/Коронки алмазные" onClick={closeCatalog}>
                                Коронки алмазные
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Коронки по бетону" onClick={closeCatalog}>
                                Коронки по бетону
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Коронки по дереву" onClick={closeCatalog}>
                                Коронки по дереву
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'grinding-wheels' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('grinding-wheels')}>
                          <span>Шлифовальные круги и насадки</span>
                          <span className="arrow">{openSubCategory === 'grinding-wheels' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'grinding-wheels' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/power-tool-accessories/Круги шлифовальные и лепестковые" onClick={closeCatalog}>
                                Круги шлифовальные и лепестковые
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Чашки абдирочные и алмазные" onClick={closeCatalog}>
                                Чашки абдирочные и алмазные
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Круги полировальные, точильные и насадки" onClick={closeCatalog}>
                                Круги полировальные, точильные и насадки
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Опорные тарелки" onClick={closeCatalog}>
                                Опорные тарелки
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'milling-cutters' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('milling-cutters')}>
                          <span>Фрезы</span>
                          <span className="arrow">{openSubCategory === 'milling-cutters' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'milling-cutters' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/power-tool-accessories/Фрезы по дереву" onClick={closeCatalog}>
                                Фрезы по дереву
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tool-accessories/Борфрезы" onClick={closeCatalog}>
                                Борфрезы
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Пилки для электролобзиков" onClick={closeCatalog}>
                            Пилки для электролобзиков
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Насадки для граверов" onClick={closeCatalog}>
                            Насадки для граверов
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Патроны для дрелей" onClick={closeCatalog}>
                            Патроны для дрелей
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Насадки и кордщетки для электроинструментов" onClick={closeCatalog}>
                            Насадки и кордщетки для электроинструментов
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Аккумуляторы и зарядные устройства для электроинструмента" onClick={closeCatalog}>
                            Аккумуляторы и зарядные устройства для электроинструмента
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Прочие аксессуары для электроинструмента" onClick={closeCatalog}>
                            Прочие аксессуары для электроинструмента
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/*Категория Бензиновые техники */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'gasoline-technics' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('gasoline-technics')}>
                  <span className="category-title">Бензиновые техники</span>
                  <span className="arrow">{openCategory === 'gasoline-technics' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'gasoline-technics' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/gasoline-technics/Бензоэлектростанции" onClick={closeCatalog}>
                          Бензоэлектростанции
                        </Link>
                      </li>
                      <li>
                        <Link to="/gasoline-technics/Бензопилы" onClick={closeCatalog}>
                          Бензопилы
                        </Link>
                      </li>
                      <li>
                        <Link to="/gasoline-technics/Бензогазонокосилки" onClick={closeCatalog}>
                          Бензогазонокосилки
                        </Link>
                      </li>
                      <li>
                        <Link to="/gasoline-technics/Прочие бензиновые техники" onClick={closeCatalog}>
                          Прочие бензиновые техники
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/*Категория Электротовары*/}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'electrical-goods' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('electrical-goods')}>
                  <span className="category-title">Электротовары</span>
                  <span className="arrow">{openCategory === 'electrical-goods' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'electrical-goods' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li className={`subcategory-item ${openSubCategory === 'sockets' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('sockets')}>
                          <span>Розетки, выключатели и рамки</span>
                          <span className="arrow">{openSubCategory === 'sockets' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'sockets' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/electrical-goods/Розетки и выключатели" onClick={closeCatalog}>
                                Розетки и выключатели
                              </Link>
                            </li>
                            <li>
                              <Link to="/electrical-goods/Аксессуары и подрозетники" onClick={closeCatalog}>
                                Аксессуары и подрозетники
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'cable' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('cable')}>
                          <span>Кабель и монтаж</span>
                          <span className="arrow">{openSubCategory === 'cable' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'cable' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/electrical-goods/Силовые кабели, аудио, ТВ и интернет" onClick={closeCatalog}>
                                Силовые кабели, аудио, ТВ и интернет
                              </Link>
                            </li>
                            <li>
                              <Link to="/electrical-goods/Кабель-каналы и гофрированные трубы" onClick={closeCatalog}>
                                Кабель-каналы и гофрированные трубы
                              </Link>
                            </li>
                            <li>
                              <Link to="/electrical-goods/Распред коробки, изоляция и крепеж" onClick={closeCatalog}>
                                Распред коробки, изоляция и крепеж
                              </Link>
                            </li>
                        </ul>
                        )}
                      </li>
                      <li>
                        <Link to="/electrical-goods/Запчасти для светильников" onClick={closeCatalog}>
                            Запчасти для светильников
                        </Link>
                      </li>
                      <li>
                        <Link to="/electrical-goods/Электрощитовые оборудования" onClick={closeCatalog}>
                            Электрощитовые оборудования
                        </Link>
                      </li>
                      <li>
                        <Link to="/electrical-goods/Электромонтажные инструменты" onClick={closeCatalog}>
                            Электромонтажные инструменты
                        </Link>
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'extension-cords' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('extension-cords')}>
                          <span>Удлинители и сетевые фильтры</span>
                          <span className="arrow">{openSubCategory === 'extension-cords' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'extension-cords' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/electrical-goods/Удлинители, сетевые фильтры и шнуры" onClick={closeCatalog}>
                                Удлинители, сетевые фильтры и шнуры
                              </Link>
                            </li>
                            <li>
                              <Link to="/electrical-goods/Разветвители, переходники и колодки" onClick={closeCatalog}>
                                Разветвители, переходники и колодки
                              </Link>
                            </li>
                            <li>
                              <Link to="/electrical-goods/Аксессуары и комплектующие для удлинителей" onClick={closeCatalog}>
                                Аксессуары и комплектующие для удлинителей
                              </Link>
                            </li>
                        </ul>
                        )}
                      </li>
                      <li>
                        <Link to="/electrical-goods/Фонари" onClick={closeCatalog}>
                            Фонари
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/*Категория Освещение*/}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'Lighting' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('Lighting')}>
                  <span className="category-title">Освещение</span>
                  <span className="arrow">{openCategory === 'Lighting' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'Lighting' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li className={`subcategory-item ${openSubCategory === 'light' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('light')}>
                          <span>Лампочки</span>
                          <span className="arrow">{openSubCategory === 'light' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'light' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Lighting/Светодиодные лампы" onClick={closeCatalog}>
                                Светодиодные лампы
                              </Link>
                            </li>
                            <li>
                              <Link to="/Lighting/Декоративные, галогеновые и обычные лампы" onClick={closeCatalog}>
                                Декоративные, галогеновые и обычные лампы
                              </Link>
                            </li>
                            <li>
                              <Link to="/Lighting/Патроны для ламп" onClick={closeCatalog}>
                                Патроны для ламп
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'ceiling-lights' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('ceiling-lights')}>
                          <span>Потолочные светильники и люстры</span>
                          <span className="arrow">{openSubCategory === 'ceiling-lights' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'ceiling-lights' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Lighting/Потолочные светильники" onClick={closeCatalog}>
                                Потолочные светильники
                              </Link>
                            </li>
                            <li>
                              <Link to="/Lighting/Подвесные светильники" onClick={closeCatalog}>
                                Подвесные светильники
                              </Link>
                            </li>
                            <li>
                              <Link to="/Lighting/Точечные светильники" onClick={closeCatalog}>
                                Точечные светильники
                              </Link>
                            </li>
                            <li>
                              <Link to="/Lighting/Трекерные светильники и споты" onClick={closeCatalog}>
                                Трекерные светильники и споты
                              </Link>
                            </li>
                            <li>
                              <Link to="/Lighting/Люстры и подвесные лампы" onClick={closeCatalog}>
                                Люстры и подвесные лампы
                              </Link>
                            </li>
                        </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'wall-lights' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('wall-lights')}>
                          <span>Настенные светильники, лампы и бра</span>
                          <span className="arrow">{openSubCategory === 'wall-lights' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'wall-lights' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Lighting/Настенные светодиодные светильники" onClick={closeCatalog}>
                                Настенные светодиодные светильники
                              </Link>
                            </li>
                            <li>
                              <Link to="/Lighting/Настенные лампы и бра" onClick={closeCatalog}>
                                Настенные лампы и бра
                              </Link>
                            </li>
                        </ul>
                        )}
                      </li>
                      <li>
                        <Link to="/Lighting/Настольные лампы и торшеры" onClick={closeCatalog}>
                          Настольные лампы и торшеры
                        </Link>
                      </li>
                      <li>
                        <Link to="/Lighting/Ленты светодиодные" onClick={closeCatalog}>
                          Ленты светодиодные
                        </Link>
                      </li>
                      <li>
                        <Link to="/Lighting/Прожекторы" onClick={closeCatalog}>
                          Прожекторы
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/*Категория Декор*/}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'Decor' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('Decor')}>
                  <span className="category-title">Декор</span>
                  <span className="arrow">{openCategory === 'Decor' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'Decor' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li className={`subcategory-item ${openSubCategory === 'wallpaper' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('wallpaper')}>
                          <span>Обои</span>
                          <span className="arrow">{openSubCategory === 'wallpaper' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'wallpaper' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Decor/Декоративные обои" onClick={closeCatalog}>
                                Декоративные обои
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Обои под покраску" onClick={closeCatalog}>
                                Обои под покраску
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'decor-panels' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('decor-panels')}>
                          <span>Декор панели, гибкий мрамор, луверы</span>
                          <span className="arrow">{openSubCategory === 'decor-panels' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'decor-panels' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Decor/Декоративные ПВХ, МДФ, 3D панели" onClick={closeCatalog}>
                                Декоративные ПВХ, МДФ, 3D панели
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Гибкий мрамор" onClick={closeCatalog}>
                                Гибкий мрамор
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Луверы" onClick={closeCatalog}>
                                Луверы
                              </Link>
                            </li>
                        </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'profiles' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('profiles')}>
                          <span>Профили для панелей и углы ПВХ и МДФ</span>
                          <span className="arrow">{openSubCategory === 'profiles' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'profiles' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Decor/Профили для панелей" onClick={closeCatalog}>
                                Профили для панелей
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Углы ПВХ и МДФ" onClick={closeCatalog}>
                                Углы ПВХ и МДФ
                              </Link>
                            </li>
                        </ul>
                        )}
                      </li>
                      <li>
                        <Link to="/Decor/Плинтусы потолочные и молдинги" onClick={closeCatalog}>
                          Плинтусы потолочные и молдинги
                        </Link>
                      </li>
                      <li>
                        <Link to="/Decor/Карнизы" onClick={closeCatalog}>
                          Карнизы
                        </Link>
                      </li>
                      <li>
                        <Link to="/Decor/Декор обводы для труб и аксессуары" onClick={closeCatalog}>
                          Декор обводы для труб и аксессуары
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Краски, лаки, олифы и разбавители" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'paint' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('paint')}>
                  <span className="category-title">Краски, лаки, олифы и разбавители</span>
                  <span className="arrow">{openCategory === 'paint' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'paint' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/paint/Dulux" onClick={closeCatalog}>
                          Dulux
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/San Marito" onClick={closeCatalog}>
                          San Marito
                        </Link>
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'acrylic-paints' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('acrylic-paints')}>
                          <span> Акриловые краски и водоэмульсии</span>
                          <span className="arrow">{openSubCategory === 'acrylic-paints' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'acrylic-paints' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Decor/Интерьерные краски" onClick={closeCatalog}>
                                Интерьерные краски
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Фасадные краски" onClick={closeCatalog}>
                                Фасадные краски
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Универсальные краски" onClick={closeCatalog}>
                                Универсальные краски
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Колеровальные краски" onClick={closeCatalog}>
                                Колеровальные краски
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'Enamels' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('Enamels')}>
                          <span>Эмали</span>
                          <span className="arrow">{openSubCategory === 'Enamels' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'Enamels' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Decor/Эмали алкидные" onClick={closeCatalog}>
                                Эмали алкидные
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Эмали для пола и Нитроэмали" onClick={closeCatalog}>
                                Эмали для пола и Нитроэмали
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Эмали акриловые и для радиатора" onClick={closeCatalog}>
                              Эмали акриловые и для радиатора
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Эмали декоративные и термостойкие" onClick={closeCatalog}>
                                Эмали декоративные и термостойкие
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'aerosol-paints' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('aerosol-paints')}>
                          <span>Аэрозольные краски и специальные эмали</span>
                          <span className="arrow">{openSubCategory === 'aerosol-paints' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'aerosol-paints' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Decor/Аэрозольные краски" onClick={closeCatalog}>
                              Аэрозольные краски
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Специальные аэрозольные эмали" onClick={closeCatalog}>
                                Специальные аэрозольные эмали
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'varnishes' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('varnishes')}>
                          <span>Лаки, олифы и разбавители</span>
                          <span className="arrow">{openSubCategory === 'varnishes' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'varnishes' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/Decor/Лаки и олифы" onClick={closeCatalog}>
                              Лаки и олифы
                              </Link>
                            </li>
                            <li>
                              <Link to="/Decor/Разбавители" onClick={closeCatalog}>
                                Разбавители
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Напольные покрытия и плитки" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'floor-coverings' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('floor-coverings')}>
                  <span className="category-title">Напольные покрытия и плитки</span>
                  <span className="arrow">{openCategory === 'floor-coverings' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'floor-coverings' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li className={`subcategory-item ${openSubCategory === 'floor-covering' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('floor-covering')}>
                          <span>Напольные покрытия</span>
                          <span className="arrow">{openSubCategory === 'floor-covering' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'floor-covering' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/floor-coverings/Ламинат" onClick={closeCatalog}>
                                Ламинат
                              </Link>
                            </li>
                            <li>
                              <Link to="/floor-coverings/Линолеум" onClick={closeCatalog}>
                                Линолеум
                              </Link>
                            </li>
                            <li>
                              <Link to="/floor-coverings/Напольные плинтусы" onClick={closeCatalog}>
                                Напольные плинтусы
                              </Link>
                            </li>
                            <li>
                              <Link to="/floor-coverings/Комплектующие для плинтуса" onClick={closeCatalog}>
                                Комплектующие для плинтуса
                              </Link>
                            </li>
                            <li>
                              <Link to="/floor-coverings/Порожки для пола" onClick={closeCatalog}>
                                Порожки для пола
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                          <Link to="/floor-coverings/Подложки" onClick={closeCatalog}>
                            Подложки
                          </Link>
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'tiles' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('tiles')}>
                          <span>Плитки и керамогранит</span>
                          <span className="arrow">{openSubCategory === 'tiles' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'tiles' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/floor-coverings/Напольная плитка" onClick={closeCatalog}>
                                Напольная плитка
                              </Link>
                            </li>
                            <li>
                              <Link to="/floor-coverings/Керамическая плитка" onClick={closeCatalog}>
                                Керамическая плитка
                              </Link>
                            </li>
                            <li>
                              <Link to="/floor-coverings/Керамогранит" onClick={closeCatalog}>
                                Керамогранит
                              </Link>
                            </li>
                            <li>
                              <Link to="/floor-coverings/Бардюры" onClick={closeCatalog}>
                                Бардюры
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Стройматериалы" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'building-materials' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('building-materials')}>
                  <span className="category-title">Стройматериалы</span>
                  <span className="arrow">{openCategory === 'building-materials' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'building-materials' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li className={`subcategory-item ${openSubCategory === 'dry-mixes' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('dry-mixes')}>
                          <span>Сухие смеси и грунтовки</span>
                          <span className="arrow">{openSubCategory === 'dry-mixes' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'dry-mixes' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/building-materials/Штукатурки" onClick={closeCatalog}>
                                Штукатурки
                              </Link>
                            </li>
                            <li>
                              <Link to="/building-materials/Шпактлевки" onClick={closeCatalog}>
                                Шпактлевки
                              </Link>
                            </li>
                            <li>
                              <Link to="/building-materials/Смеси для пола и цемент" onClick={closeCatalog}>
                                Смеси для пола и цемент
                              </Link>
                            </li>
                            <li>
                              <Link to="/building-materials/Клеи и монтажно-кладочные смеси" onClick={closeCatalog}>
                                Клеи и монтажно-кладочные смеси
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                          <Link to="/building-materials/Грунтовки и праймеры" onClick={closeCatalog}>
                            Грунтовки и праймеры
                          </Link>
                      </li>
                      <li>
                          <Link to="/building-materials/Штукатурные сетки, серпянки и профили" onClick={closeCatalog}>
                            Штукатурные сетки, серпянки и профили
                          </Link>
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'sheet-materials' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('sheet-materials')}>
                          <span>Листовые материалы</span>
                          <span className="arrow">{openSubCategory === 'sheet-materials' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'sheet-materials' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/building-materials/Гипсокартоны" onClick={closeCatalog}>
                                Гипсокартоны
                              </Link>
                            </li>
                            <li>
                              <Link to="/building-materials/ОСБ фанеры" onClick={closeCatalog}>
                                ОСБ фанеры
                              </Link>
                            </li>
                            <li>
                              <Link to="/building-materials/Оргалит" onClick={closeCatalog}>
                                Оргалит
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                          <Link to="/building-materials/Профиль для гипсокартона и аксессуары" onClick={closeCatalog}>
                            Профиль для гипсокартона и аксессуары
                          </Link>
                      </li>
                      <li>
                          <Link to="/building-materials/Теплоизоляция" onClick={closeCatalog}>
                            Теплоизоляция
                          </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Строительные оборудования" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'construction-equipment' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('construction-equipment')}>
                  <span className="category-title">Строительные оборудования</span>
                  <span className="arrow">{openCategory === 'construction-equipment' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'construction-equipment' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                          <Link to="/construction-equipment/Бетономешалки" onClick={closeCatalog}>
                            Бетономешалки
                          </Link>
                      </li>
                      <li>
                          <Link to="/construction-equipment/Тачки строительные" onClick={closeCatalog}>
                            Тачки строительные
                          </Link>
                      </li>
                      <li>
                          <Link to="/construction-equipment/Стремянка" onClick={closeCatalog}>
                            Стремянка
                          </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Скобяные изделия" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'hardware' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('hardware')}>
                  <span className="category-title">Скобяные изделия</span>
                  <span className="arrow">{openCategory === 'hardware' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'hardware' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li className={`subcategory-item ${openSubCategory === 'screws' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('screws')}>
                          <span>Саморезы</span>
                          <span className="arrow">{openSubCategory === 'screws' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'screws' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/hardware/Саморезы для гипсокартон и дерева" onClick={closeCatalog}>
                                Саморезы для гипсокартон и дерева
                              </Link>
                            </li>
                            <li>
                              <Link to="/hardware/Саморезы кровельные" onClick={closeCatalog}>
                              Саморезы кровельные
                              </Link>
                            </li>
                            <li>
                              <Link to="/hardware/Саморезы по металу" onClick={closeCatalog}>
                                Саморезы по металу
                              </Link>
                            </li>
                            <li>
                              <Link to="/hardware/Саморезы с прессшайбой" onClick={closeCatalog}>
                                Саморезы с прессшайбой
                              </Link>
                            </li>
                            <li>
                              <Link to="/hardware/Монтажный шурупы" onClick={closeCatalog}>
                                Монтажный шурупы
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'Dowel-nails' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('Dowel-nails')}>
                          <span>Дюбель-гвозди</span>
                          <span className="arrow">{openSubCategory === 'Dowel-nails' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'Dowel-nails' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/hardware/Распорные, фасадные и потайные" onClick={closeCatalog}>
                                Распорные, фасадные и потайные
                              </Link>
                            </li>
                            <li>
                              <Link to="/hardware/Для гипсокартона и газобетона " onClick={closeCatalog}>
                                Для гипсокартона и газобетона 
                              </Link>
                            </li>
                            <li>
                              <Link to="/hardware/Для теплоизоляции и универсальные" onClick={closeCatalog}>
                                Для теплоизоляции и универсальные
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'anchors' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('anchors')}>
                          <span>Анкеры</span>
                          <span className="arrow">{openSubCategory === 'anchors' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'anchors' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/hardware/Анкеры клиновые, втулочные и забивные" onClick={closeCatalog}>
                                Анкеры клиновые, втулочные и забивные
                              </Link>
                            </li>
                            <li>
                              <Link to="/hardware/Анкеры клиновые, втулочные и забивные" onClick={closeCatalog}>
                                Анкеры клиновые, втулочные и забивные
                              </Link>
                            </li>
                            <li>
                                <Link to="/hardware/Анкеры с кольцом, с крюком и шпильки резбовые" onClick={closeCatalog}>
                                  Анкеры с кольцом, с крюком и шпильки резбовые
                                </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                          <Link to="/hardware/Болты, гайки и шайбы" onClick={closeCatalog}>
                            Болты, гайки и шайбы
                          </Link>
                      </li>
                      <li>
                          <Link to="/hardware/Гвозди" onClick={closeCatalog}>
                            Гвозди
                          </Link>
                      </li>
                      <li>
                          <Link to="/hardware/Заклепки и крепежные наборы" onClick={closeCatalog}>
                            Заклепки и крепежные наборы
                          </Link>
                      </li>
                      <li>
                          <Link to="/hardware/Конфирматы" onClick={closeCatalog}>
                            Конфирматы
                          </Link>
                      </li>
                      <li>
                          <Link to="/hardware/Перфорированные крепежные элементы" onClick={closeCatalog}>
                            Перфорированные крепежные элементы
                          </Link>
                      </li>
                      <li>
                          <Link to="/hardware/Хомуты и специальный крепеж" onClick={closeCatalog}>
                            Хомуты и специальный крепеж
                          </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Двери и фурнитура" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'doors' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('doors')}>
                  <span className="category-title">Двери и фурнитура</span>
                  <span className="arrow">{openCategory === 'doors' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'doors' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                          <Link to="/doors/Межкомнатные двери" onClick={closeCatalog}>
                            Межкомнатные двери
                          </Link>
                      </li>
                      <li>
                          <Link to="/doors/Гвозди" onClick={closeCatalog}>
                            Гвозди
                          </Link>
                      </li>
                      <li>
                          <Link to="/doors/Металлические входные двери" onClick={closeCatalog}>
                            Металлические входные двери
                          </Link>
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'door-handles' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('door-handles')}>
                          <span>Ручки для дверей</span>
                          <span className="arrow">{openSubCategory === 'door-handles' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'door-handles' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/doors/Ручки для межкомнатных дверей" onClick={closeCatalog}>
                                Ручки для межкомнатных дверей
                              </Link>
                            </li>
                            <li>
                              <Link to="/doors/Ручки для металлических входных дверей" onClick={closeCatalog}>
                              Ручки для металлических входных дверей
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                          <Link to="/doors/Замки, комплектующие и аксессуары" onClick={closeCatalog}>
                            Замки, комплектующие и аксессуары
                          </Link>
                      </li>
                      <li>
                          <Link to="/doors/Фурнитура для дверей" onClick={closeCatalog}>
                            Фурнитура для дверей
                          </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Отопление" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'heating' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('heating')}>
                  <span className="category-title">Отопление</span>
                  <span className="arrow">{openCategory === 'heating' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'heating' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li className={`subcategory-item ${openSubCategory === 'radiators' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('radiators')}>
                          <span>Радиаторы отопления и комплектующие</span>
                          <span className="arrow">{openSubCategory === 'radiators' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'radiators' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/heating/Радиаторы отопления" onClick={closeCatalog}>
                                Радиаторы отопления
                              </Link>
                            </li>
                            <li>
                              <Link to="/heating/Комлектующие и аксессуары" onClick={closeCatalog}>
                                Комлектующие и аксессуары
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                          <Link to="/heating/Отопительные котлы" onClick={closeCatalog}>
                            Отопительные котлы
                          </Link>
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'electric-heating' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('electric-heating')}>
                          <span>Электрический обогрев</span>
                          <span className="arrow">{openSubCategory === 'electric-heating' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'electric-heating' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/heating/Обогреватели, пушки, вентиляторы" onClick={closeCatalog}>
                                Обогреватели, пушки, вентиляторы
                              </Link>
                            </li>
                            <li>
                              <Link to="/heating/Электр Теплыйе полы и терморегуляторы" onClick={closeCatalog}>
                              Электр Теплыйе полы и терморегуляторы
                              </Link>
                            </li>
                            <li>
                              <Link to="/heating/Водяные теплые полы, коллекторы и насосы" onClick={closeCatalog}>
                              Водяные теплые полы, коллекторы и насосы
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                          <Link to="/heating/Полотенцесушители" onClick={closeCatalog}>
                            Полотенцесушители
                          </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Категория "Спецодежда и средства защиты" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'special-clothing' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('special-clothing')}>
                  <span className="category-title">Спецодежда и средства защиты</span>
                  <span className="arrow">{openCategory === 'special-clothing' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'special-clothing' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                          <Link to="/special-clothing/Спецодежда и обувь" onClick={closeCatalog}>
                              Спецодежда и обувь
                          </Link>
                      </li>
                      <li>
                          <Link to="/special-clothing/Перчатки и поясы" onClick={closeCatalog}>
                            Перчатки и поясы
                          </Link>
                      </li>
                      <li>
                          <Link to="/special-clothing/Средства защиты и респираторы" onClick={closeCatalog}>
                            Средства защиты и респираторы
                          </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;