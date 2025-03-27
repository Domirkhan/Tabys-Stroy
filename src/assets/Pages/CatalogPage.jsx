import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Добавьте этот импорт
import plumbingIcon from '../../assets/icon/plumbing.png';
import toolsIcon from '../../assets/icon/tools.png';
import powerToolsIcon from '../../assets/icon/power-tools.png';
import accessoriesIcon from '../../assets/icon/accessories.png';
import gasIcon from '../../assets/icon/gas.png';
import electricalIcon from '../../assets/icon/electrical.png';
import lightingIcon from '../../assets/icon/lightingIcon.png';
import decorIcon from '../../assets/icon/Decor.png';
import paintIcon from '../../assets/icon/paint.png';
import floorIcon from '../../assets/icon/floor.png';
import buildingIcon from '../../assets/icon/building.png';
import constructionIcon from '../../assets/icon/construction.png';
import hardwareIcon from '../../assets/icon/hardware.png';
import doorsIcon from '../../assets/icon/doors.png';
import heatingIcon from '../../assets/icon/heating.png';
import specialIcon from '../../assets/icon/special.png';
import '../../assets/styles/CatalogPage.css';

// Импортируйте другие иконки и данные, если нужно
import "../../assets/styles/CatalogPage.css";
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import BottomNav from '../components/BottomNav';

function CatalogPage() {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  const closeCatalog = () => {
    console.log("Каталог закрыт");
  };
  return (
    <>
    <Header />
    <main className="main-content">
    <div className="catalog-page">
    <h1 className="section-title-category">Каталог</h1>
            {/* Категория "Сантехника" */}
            <ul className="category-list">
              <li className={`category-item ${openCategory === 'plumbing' ? 'open' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory('plumbing')}>
                  <img src={plumbingIcon} alt="Сантехника" className='icon'/>
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
                        <Link to="/plumbing/Шланги для смесителей и унитаза" onClick={closeCatalog}>
                          Шланги для смесителей и унитаза
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Запорно-регулирующая арматура" onClick={closeCatalog}>
                          Запорно-регулирующая арматура
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Канализационные трубы и комплектующие" onClick={closeCatalog}>
                          Канализационные трубы и комплектующие
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
                        <Link to="/plumbing/Сифон, гофра и шланги" onClick={closeCatalog}>
                          Сифон, гофра и шланги
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Переходники, ниппеля" onClick={closeCatalog}>
                          Переходники, ниппеля
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Смесители для ванной и кухни" onClick={closeCatalog}>
                          Смесители для ванной и кухни
                        </Link>
                      </li>
                      <li>
                        <Link to="/plumbing/Аксессуары для ванной" onClick={closeCatalog}>
                          Аксессуары для ванной
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
                  <img src={toolsIcon} alt="Инструменты" className='icon' />
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
                        <Link to="/tools/Столярные инструменты" onClick={closeCatalog}>
                          Столярные инструменты
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Малярные инструменты" onClick={closeCatalog}>
                          Малярные инструменты
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Бокорезы, кабелерезы, тросорезы" onClick={closeCatalog}>
                          Бокорезы, кабелерезы, тросорезы
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Ножи и ожницы" onClick={closeCatalog}>
                          Ножи и ожницы
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Ключи и головки" onClick={closeCatalog}>
                          Ключи и головки
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Пилы и ножовки" onClick={closeCatalog}>
                          Пилы и ножовки
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
                        <Link to="/tools/Молоток и кувалда" onClick={closeCatalog}>
                          Молоток и кувалда
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Ломы и гвоздодеры" onClick={closeCatalog}>
                          Ломы и гвоздодеры
                        </Link>
                      </li>
                      <li>
                        <Link to="/tools/Кирки, лопаты и грабли" onClick={closeCatalog}>
                          Кирки, лопаты и грабли
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
                  <img src={powerToolsIcon} alt="Электроинструменты" className='icon' />
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
                        <Link to="/power-tools/Перфораторы и отбойные молотки" onClick={closeCatalog}>
                          Перфораторы и отбойные молотки
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Болгарки и арматурорезы" onClick={closeCatalog}>
                          Болгарки и арматурорезы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Кафелерезы" onClick={closeCatalog}>
                          Кафелерезы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Шлифовальные машины" onClick={closeCatalog}>
                          Шлифовальные машины
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Фрезеры и граверы" onClick={closeCatalog}>
                          Фрезеры и граверы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Электролобзики и электропилы" onClick={closeCatalog}>
                          Электролобзики и электропилы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Краскопульты электрические" onClick={closeCatalog}>
                          Краскопульты электрические
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Фены строительные" onClick={closeCatalog}>
                          Фены строительные
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Миксеры и вибратор" onClick={closeCatalog}>
                          Миксеры и вибратор
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Штроборезы" onClick={closeCatalog}>
                          Штроборезы
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Пневмостеплер" onClick={closeCatalog}>
                          Пневмостеплер
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tools/Сварочные аппараты" onClick={closeCatalog}>
                          Сварочные аппараты
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
                        <Link to="/power-tools/Прочие электроинструменты" onClick={closeCatalog}>
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
                  <img src={accessoriesIcon} alt="Аксессуары для электроинструментов" className='icon' />
                  <span className="category-title">Аксессуары для электроинструментов</span>
                  <span className="arrow">{openCategory === 'power-tool-accessories' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'power-tool-accessories' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/power-tool-accessories/Биты и наборы бит" onClick={closeCatalog}>
                            Биты и наборы бит
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Сверла и наборы сверл" onClick={closeCatalog}>
                            Сверла и наборы сверл
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Буры, пики и зубила" onClick={closeCatalog}>
                            Буры, пики и зубила
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Диски отрезные, алмазные и пильные" onClick={closeCatalog}>
                            Диски отрезные, алмазные и пильные
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Коронки для электроинструментов" onClick={closeCatalog}>
                            Коронки для электроинструментов
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Шлифовальные круги и насадки" onClick={closeCatalog}>
                            Шлифовальные круги и насадки
                        </Link>
                      </li>
                      <li>
                        <Link to="/power-tool-accessories/Пилки для электролобзиков" onClick={closeCatalog}>
                            Пилки для электролобзиков
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
                  <img src={gasIcon} alt="Бензиновые техники" className='icon' />
                  <span className="category-title">Бензиновые техники</span>
                  <span className="arrow">{openCategory === 'gasoline-technics' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'gasoline-technics' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/gasoline-technics/Генераторы" onClick={closeCatalog}>
                          Генераторы
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
                  <img src={electricalIcon} alt="Электротовары" className='icon' />
                  <span className="category-title">Электротовары</span>
                  <span className="arrow">{openCategory === 'electrical-goods' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'electrical-goods' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/electrical-goods/Розетки, выключатели и рамки" onClick={closeCatalog}>
                            Розетки, выключатели и рамки
                        </Link>
                      </li>
                      <li>
                        <Link to="/electrical-goods/Кабель и монтаж" onClick={closeCatalog}>
                            Кабель и монтаж
                        </Link>
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
                      <li>
                        <Link to="/electrical-goods/Фонари и прочие товары" onClick={closeCatalog}>
                            Фонари и прочие товары
                        </Link>
                      </li>
                      <li>
                        <Link to="/electrical-goods/Удленители и сетевые фильтры" onClick={closeCatalog}>
                            Удленители и сетевые фильтры
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
                  <img src={lightingIcon} alt="Освещение" className='icon' />
                  <span className="category-title">Освещение</span>
                  <span className="arrow">{openCategory === 'Lighting' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'Lighting' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/Lighting/Лампочки и патроны для ламп" onClick={closeCatalog}>
                          Лампочки и патроны для ламп
                        </Link>
                      </li>
                      <li>
                        <Link to="/Lighting/Потолочные светильники" onClick={closeCatalog}>
                          Потолочные светильники
                        </Link>
                      </li>
                      <li>
                        <Link to="/Lighting/Люстры" onClick={closeCatalog}>
                          Люстры
                        </Link>
                      </li>
                      <li>
                        <Link to="/Lighting/Настенные светильники, лампы и бра" onClick={closeCatalog}>
                          Настенные светильники, лампы и бра
                        </Link>
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
                  <img src={decorIcon} alt="Декор" className='icon' />
                  <span className="category-title">Декор</span>
                  <span className="arrow">{openCategory === 'Decor' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'Decor' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                    <li>
                        <Link to="/Decor/Обои" onClick={closeCatalog}>
                          Обои
                        </Link>
                    </li>
                    <li>
                        <Link to="/Decor/Декоротивные панели и гибкий мрамор" onClick={closeCatalog}>
                          Декоротивные панели и гибкий мрамор
                        </Link>
                    </li>
                    <li>
                        <Link to="/Decor/Декоротивные решетки и луверы" onClick={closeCatalog}>
                          Декоротивные решетки и луверы
                        </Link>
                    </li>
                    <li>
                        <Link to="/Decor/Профили для панелей и углы" onClick={closeCatalog}>
                          Профили для панелей и углы
                        </Link>
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
                        <Link to="/Decor/Прочие элементы и аксессуары" onClick={closeCatalog}>
                          Прочие элементы и аксессуары
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
                  <img src={paintIcon} alt="Краски, лаки, олифы и разбавители" className='icon' />
                  <span className="category-title">Краски, лаки, олифы и разбавители</span>
                  <span className="arrow">{openCategory === 'paint' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'paint' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                        <Link to="/paint/Интерьерные акриловые краски" onClick={closeCatalog}>
                          Интерьерные акриловые краски
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/Фасадные акриловые краски" onClick={closeCatalog}>
                          Фасадные акриловые краски
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/Универсальные акриловые краски" onClick={closeCatalog}>
                          Универсальные акриловые краски
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/Эмали алкидные" onClick={closeCatalog}>
                          Эмали алкидные
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/Эмали для пола" onClick={closeCatalog}>
                          Эмали для пола
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/Эмали акриловые, эмали для радиатора" onClick={closeCatalog}>
                          Эмали акриловые, эмали для радиатора
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/Эмали декоротивные и термостойкие" onClick={closeCatalog}>
                          Эмали декоротивные и термостойкие
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/Аэрозольные краски и специальные эмали" onClick={closeCatalog}>
                          Аэрозольные краски и специальные эмали
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/Лаки и олифы" onClick={closeCatalog}>
                          Лаки и олифы
                        </Link>
                      </li>
                      <li>
                        <Link to="/paint/Разбиватели" onClick={closeCatalog}>
                          Разбиватели
                        </Link>
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
                  <img src={floorIcon} alt="Напольные покрытия и плитки" className='icon' />
                  <span className="category-title">Напольные покрытия и плитки</span>
                  <span className="arrow">{openCategory === 'floor-coverings' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'floor-coverings' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
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
                      <li>
                          <Link to="/floor-coverings/Подложки" onClick={closeCatalog}>
                            Подложки
                          </Link>
                      </li>
                      <li>
                          <Link to="/floor-coverings/Напольная плитка" onClick={closeCatalog}>
                            Напольная плитка
                          </Link>
                      </li>
                      <li>
                          <Link to="/floor-coverings/Керамическая плитка и бордюры" onClick={closeCatalog}>
                            Керамическая плитка и бордюры
                          </Link>
                      </li>
                      <li>
                          <Link to="/floor-coverings/Керамогранит" onClick={closeCatalog}>
                            Керамогранит
                          </Link>
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
                  <img src={buildingIcon} alt="Стройматериалы" className='icon' />
                  <span className="category-title">Стройматериалы</span>
                  <span className="arrow">{openCategory === 'building-materials' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'building-materials' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                          <Link to="/building-materials/Штукатурки и шпаклевки" onClick={closeCatalog}>
                            Штукатурки и шпаклевки
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
                      <li>
                          <Link to="/building-materials/Гипсокартоны" onClick={closeCatalog}>
                            Гипсокартоны
                          </Link>
                      </li>
                      <li>
                          <Link to="/building-materials/ОСБ фанеры и Оргалит" onClick={closeCatalog}>
                            ОСБ фанеры и Оргалит
                          </Link>
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
                      <li>
                          <Link to="/building-materials/Монтажная пена" onClick={closeCatalog}>
                            Монтажная пена
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
                  <img src={constructionIcon} alt="Строительные оборудования" className='icon' />
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
                  <img src={hardwareIcon} alt="Скобяные изделия" className='icon' />
                  <span className="category-title">Скобяные изделия</span>
                  <span className="arrow">{openCategory === 'hardware' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'hardware' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                          <Link to="/hardware/Шурупы" onClick={closeCatalog}>
                            Шурупы
                          </Link>
                      </li>
                      <li>
                          <Link to="/hardware/Монтажные шурупы" onClick={closeCatalog}>
                            Монтажные шурупы
                          </Link>
                      </li>
                      <li>
                          <Link to="/hardware/Саморезы" onClick={closeCatalog}>
                            Саморезы
                          </Link>
                      </li>
                      <li>
                          <Link to="/hardware/Дюбель-гвозди" onClick={closeCatalog}>
                            Дюбель-гвозди
                          </Link>
                      </li>
                      <li>
                          <Link to="/hardware/Анкеры" onClick={closeCatalog}>
                            Анкеры
                          </Link>
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
                  <img src={doorsIcon} alt="Двери и фурнитура" className='icon' />
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
                          <Link to="/doors/Металлические входные двери" onClick={closeCatalog}>
                            Металлические входные двери
                          </Link>
                      </li>
                      <li>
                          <Link to="/doors/Ручки для межкомнатных дверей" onClick={closeCatalog}>
                            Ручки для межкомнатных дверей
                          </Link>
                      </li>
                      <li>
                          <Link to="/doors/Ручки для входных дверей" onClick={closeCatalog}>
                            Ручки для входных дверей
                          </Link>
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
                  <img src={heatingIcon} alt="Отопление" className='icon' />
                  <span className="category-title">Отопление</span>
                  <span className="arrow">{openCategory === 'heating' ? '▲' : '▼'}</span>
                </div>
                {openCategory === 'heating' && (
                  <div className="subcategory-wrapper">
                    <ul className="subcategory-list">
                      <li>
                          <Link to="/heating/Радиаторы отопления и комплектующие" onClick={closeCatalog}>
                            Радиаторы отопления и комплектующие
                          </Link>
                      </li>
                      <li>
                          <Link to="/heating/Отопительные котлы" onClick={closeCatalog}>
                            Отопительные котлы
                          </Link>
                      </li>
                      <li>
                          <Link to="/heating/Обогреватели, пушки и вентиляторы" onClick={closeCatalog}>
                            Обогреватели, пушки и вентиляторы
                          </Link>
                      </li>
                      <li>
                          <Link to="/heating/Электрический теплый пол и терморегулятор" onClick={closeCatalog}>
                          Электрический теплый пол и терморегулятор
                          </Link>
                      </li>
                      <li>
                          <Link to="/heating/Воденые теплые полы, коллекторы и насосы" onClick={closeCatalog}>
                          Воденые теплые полы, коллекторы и насосы
                          </Link>
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
                  <img src={specialIcon} alt="Спецодежда и средства защиты" className='icon' />
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
    </main>
    <Footer />
    <BottomNav />
    </>
  );
}

export default CatalogPage;