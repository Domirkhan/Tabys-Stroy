import "../styles/Map.css";

function Map() {
  return (
    <div className="container">
      <div className="map">
        <h1 className="hero-title">Наше местоположение</h1>
        <p className="hero-subtitle">город: Жезказган, улица: Алашахана 8</p>
        <iframe
          className="map-url"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.785709728515!2d67.70759407670865!3d47.80498957425639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4217d7e7d84fc3bb%3A0x906dcbe3b43a463e!2z0YPQu9C40YbQsCDQkNC70LDRiNCw0YXQsNC90LAgOCwg0JbQtdC30LrQsNC30LPQsNC9IDEwMDAwMA!5e0!3m2!1sru!2skz!4v1733991759117!5m2!1sru!2skz"
          frameBorder="0"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
      <div className="map">
        <p className="hero-subtitle">город: Сатпаев, Проспект: Независимости 25А</p>
        <iframe
          className="map-url"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1810.9548753302302!2d67.53342982076869!3d47.90803172784913!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x423d650901b7012f%3A0x9eda9436c85a1e3a!2z0KLQsNCx0YvRgSDRgdGC0YDQvtC5!5e0!3m2!1sru!2skz!4v1740670568928!5m2!1sru!2skz"
          frameBorder="0"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
    </div>
  );
}

export default Map;