function Header() {
    return(
        <>
            <header className="header">
                <div className="header-top">
                    <div className="container">
                        <div className="logo">Tabys Stroy</div>
                        <div className="catalog-btn">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='white' d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z'/%3E%3C/svg%3E" alt="menu" />
                            <span>Каталог</span>
                        </div>
                        <div className="search">
                            <input type="text" placeholder="Поиск" />
                            <button className="search-btn"></button>
                        </div>
                        <div className="header-actions">
                            <a href="#" className="action-btn compare"><span>Сравнить</span></a>
                            <a href="#" className="action-btn wishlist"><span>Избранное</span></a>
                            <a href="#" className="action-btn profile"><span>Профиль</span></a>
                            <div className="cart">
                                <a href="#" className="action-btn cart-btn"><span>Корзина</span></a>
                                <span className="cart-count">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="container">
                        <button className="mobile-menu-btn">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23333' d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z'/%3E%3C/svg%3E" alt="menu" />
                        </button>
                        <nav className="main-nav">
                            <a href="#">О нас</a>
                            <a href="#">Оплата</a>
                            <a href="#">Доставка</a>
                            <a href="#">Контакты</a>
                        </nav>
                        <div className="lang-phone">
                            <select className="lang-select">
                                <option value="ru">RU</option>
                                <option value="kz">KZ</option>
                            </select>
                            <a href="tel:+78008008080" className="phone">+7(705) 454-13-49</a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;