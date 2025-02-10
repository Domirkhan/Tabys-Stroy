import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// Обновлённый путь к файлу CartContext
import { CartContext } from '../../context/CartContext';
import '../../assets/styles/Header.css';
import cartIcon from "../../assets/icon/cart.png";


function Header() {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);

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

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="catalog-btn" onClick={toggleCatalog}>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='white' d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z'/%3E%3C/svg%3E"
                alt="menu"
              />
              <span>Каталог</span>
            </div>
            <div className="logo"><a href="../../">TABYS STROY</a></div>
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
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23333' d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z'/%3E%3C/svg%3E"
                alt="menu"
              />
            </button>
            <nav className="main-nav">
              <a href="#">О нас</a>
              <a href="#">Оплата</a>
              <a href="#">Доставка</a>
              <a href="#">Контакты</a>
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
            <h2>Категории</h2>
            {/* Категория "Краска" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'paint' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('paint')}>
                  <span className="category-title">Краска</span>
                  <span className="arrow">{openCategory === 'paint' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'paint' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/paint/dulux" onClick={closeCatalog}>
                          Dulux
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/san-marino" onClick={closeCatalog}>
                          San Marino
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/ceiling-paint" onClick={closeCatalog}>
                          Краска для потолков
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/wall-paint" onClick={closeCatalog}>
                          Краска для стен
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/varnish" onClick={closeCatalog}>
                          Лаки
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/emulsion" onClick={closeCatalog}>
                          Водоэмульсия
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/solvents" onClick={closeCatalog}>
                          Растворители
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
                        <Link to="/power-tools/drills" onClick={closeCatalog}>
                          Дрели-шуруповерты
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/hammer-drills" onClick={closeCatalog}>
                          Перфораторы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/grinders" onClick={closeCatalog}>
                          Болгарки
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/sanders" onClick={closeCatalog}>
                          Шлифовальные машины
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/angle-grinders" onClick={closeCatalog}>
                          Фризеры
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/jigsaws" onClick={closeCatalog}>
                          Электролобзики
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/planers" onClick={closeCatalog}>
                          Электрорубанки
                        </Link>
                      </li>
                      <li className={`subcategory-item ${openSubCategory === 'wall-paint' ? 'open' : ''}`}>
                        <div className="subcategory-header" onClick={() => toggleSubCategory('wall-paint')}>
                          <span>Электропилы</span>
                          <span className="arrow">{openSubCategory === 'wall-paint' ? '▲' : '▼'}</span>
                        </div>
                        {openSubCategory === 'wall-paint' && (
                          <ul className="subsubcategory-list">
                            <li>
                              <Link to="/power-tools/wall-paint/type1" onClick={closeCatalog}>
                                Электропилы
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tools/wall-paint/type2" onClick={closeCatalog}>
                                Стабильные пилы
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tools/wall-paint/type3" onClick={closeCatalog}>
                                Торцевые пилы
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tools/wall-paint/type4" onClick={closeCatalog}>
                                Церкулярные пилы
                              </Link>
                            </li>
                            <li>
                              <Link to="/power-tools/wall-paint/type5" onClick={closeCatalog}>
                                Монтажные пилы
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                        <Link to="/power-tools/specials" onClick={closeCatalog}>
                          Граверы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/renovators" onClick={closeCatalog}>
                          Реноваторы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/sprayers" onClick={closeCatalog}>
                          Краскопульты электрические
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/gun-drivers" onClick={closeCatalog}>
                          Гайкаверты
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/construction-heaters" onClick={closeCatalog}>
                          Фены строительные
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/mixers" onClick={closeCatalog}>
                          Миксеры
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/cutters" onClick={closeCatalog}>
                          Штроборезы
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            {/* Остальные категории (Аксессуары, Инструменты, Бензиновые техники, Сантехника) аналогичным образом */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'power-tool-accessories' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('power-tool-accessories')}>
                  <span className="category-title">Аксессуары для электроинструментов</span>
                  <span className="arrow">{openCategory === 'power-tool-accessories' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'power-tool-accessories' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/power-tool-accessories/sets" onClick={closeCatalog}>
                          Наборы бит
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/bits" onClick={closeCatalog}>
                          Биты
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/magnetic-bits" onClick={closeCatalog}>
                          Магнитные биты
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/holders" onClick={closeCatalog}>
                          Битодержатели
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/angle-bits" onClick={closeCatalog}>
                          Биты торцевые
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/hex-bits" onClick={closeCatalog}>
                          Биты шестигранные
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/slot-bits" onClick={closeCatalog}>
                          Биты шлицевые
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/cutters" onClick={closeCatalog}>
                          Бокорезы и кусачки
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/drills" onClick={closeCatalog}>
                          Сверла по металлу
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/wood-drills" onClick={closeCatalog}>
                          Сверла по дереву
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/concrete-drills" onClick={closeCatalog}>
                          Сверла по бетону
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
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
                        <Link to="/tools/sets" onClick={closeCatalog}>
                          Наборы инструментов
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/screwdrivers" onClick={closeCatalog}>
                          Отвертки
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/pliers" onClick={closeCatalog}>
                          Плоскогубцы и пасатижи
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/wrenches" onClick={closeCatalog}>
                          Гаичные ключи
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/sockets" onClick={closeCatalog}>
                          Головки и торцевые
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/knives" onClick={closeCatalog}>
                          Ножи строительные
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/scissors" onClick={closeCatalog}>
                          Ножницы
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/cutters" onClick={closeCatalog}>
                          Бокорезы и кусачки
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/bolt-cutters" onClick={closeCatalog}>
                          Болторезы
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/saws" onClick={closeCatalog}>
                          Пилы и ножовки
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/hammers" onClick={closeCatalog}>
                          Молотки
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/sledgehammers" onClick={closeCatalog}>
                          Кувалды
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/crowbars" onClick={closeCatalog}>
                          Ломы и гвоздодеры
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/picks" onClick={closeCatalog}>
                          Кирки и лопаты
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/carpentry" onClick={closeCatalog}>
                          Столярные инструменты
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/chisels" onClick={closeCatalog}>
                          Зубилы и дыроколы
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
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
                        <Link to="/gasoline-technics/generators" onClick={closeCatalog}>
                          Бензоэлектростанции
                        </Link>
                      </li>
                      <li>
                        <Link to="/gasoline-technics/chainsaws" onClick={closeCatalog}>
                          Бензопилы
                        </Link>
                      </li>
                      <li>
                        <Link to="/gasoline-technics/lawn-mowers" onClick={closeCatalog}>
                          Бензогазонокосилки
                        </Link>
                      </li>
                      <li>
                        <Link to="/gasoline-technics/others" onClick={closeCatalog}>
                          Прочие бензиновые техники
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
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
                        <Link to="/plumbing/pipes" onClick={closeCatalog}>
                          Трубы
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/fittings" onClick={closeCatalog}>
                          Фитинги
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/toilets" onClick={closeCatalog}>
                          Унитазы и биде
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/bathroom-furniture" onClick={closeCatalog}>
                          Мебель для ванной
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/baths" onClick={closeCatalog}>
                          Ванны и комплектующие
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/sinks" onClick={closeCatalog}>
                          Раковины
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/mirrors" onClick={closeCatalog}>
                          Зеркала
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/mixers" onClick={closeCatalog}>
                          Смесители для ванной и кухни
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