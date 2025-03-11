import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable"; // Подключаем библиотеку
import "../../assets/styles/Slider.css";
import slide1 from "../image/Slider/slide-1.png";
import slide2 from "../image/Slider/slide-2.png";

const slides = [
  {
    image: slide1,
    title: "НАДЕЖНЫЕ ТРУБЫ ОТ ВЕДУЩИХ ПРОИЗВОДИТЕЛЕЙ",
    path: "/plumbing/Трубы"
  },
  {
    image: slide2,
    title: "ФИТИНГИ ДЛЯ ВСЕХ ВИДОВ ТРУБ",
    path: "/plumbing/Фитинги"
  }
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length),
    onSwipedRight: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length),
    trackMouse: true // Поддержка свайпов мышью (для тестов на ПК)
  });

  const handleSlideClick = () => {
    navigate(slides[currentIndex].path);
  };

  return (
    <div className="slider" {...handlers}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          onClick={handleSlideClick}
        >
          <div className="slide-content">
            <h2>{slide.title}</h2>
          </div>
        </div>
      ))}

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
