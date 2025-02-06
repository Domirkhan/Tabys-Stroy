import '../../assets/styles/Glav.css';
function Glav() {
    return(
        <>
         <div className="hero-section pt-32 pb-20 bg-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid-wrapper grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="hero-content">
                        <h1 className="hero-title">Все для ремонта и строительства — выгодные цены!</h1>
                        <p className="hero-subtitle">Более 10 000 товаров. Доставка по всему городу.</p>
                        <button className="hero-button">Перейти</button>
                    </div>
                    <div className="hero-image-wrapper relative">
                    <img
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800"
                        alt="Construction Materials"
                        className="hero-image"
                        />
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default Glav;