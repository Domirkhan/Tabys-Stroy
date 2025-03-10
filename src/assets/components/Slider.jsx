import React, { useState, useEffect } from "react";
import "../../assets/styles/Slider.css";

const slides = [
  {
    image: "https://avatars.mds.yandex.net/i?id=673d9dd7b0697b9b9af7fc359a54cd0f_l-5233858-images-thumbs&n=13",
    title: "КАЧЕСТВЕННЫЕ СТРОИТЕЛЬНЫЕ МАТЕРИАЛЫ",
    link: "#"
  },
  {
    image: "https://en.idei.club/uploads/posts/2023-06/1686421166_en-idei-club-p-construction-materials-paint-dizain-krasiv-12.jpg",
    title: "ВСЕ ДЛЯ РЕМОНТА И СТРОИТЕЛЬСТВА",
    link: "#"
  }
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-content">
            <h2>{slide.title}</h2>
          </div>
        </div>
      ))}
      {/* <button className="prev" onClick={goToPrevious}>
        &#10094;
      </button>
      <button className="next" onClick={goToNext}>
        &#10095;
      </button> */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slider;