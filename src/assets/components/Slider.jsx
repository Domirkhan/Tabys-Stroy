import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Импорт useNavigate
import "../../assets/styles/Slider.css";

const slides = [
  {
    image: "https://sotni.ru/wp-content/uploads/2023/08/santekhnika-14.webp",
    title: "НАДЕЖНЫЕ ТРУБЫ ОТ ВЕДУЩИХ ПРОИЗВОДИТЕЛЕЙ",
    path: "/plumbing/Трубы" // Путь для этого слайда
  },
  {
    image: "https://sotni.ru/wp-content/uploads/2023/08/instrumenty-santekhnika-fon-2.webp",
    title: "фИТИНГИ ДЛЯ ВСЕХ ВИДОВ ТРУБ",
    path: "/plumbing/Фитинги" // Путь для второго слайда
  }
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Хук для переходов

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Функция для обработки клика по слайду
  const handleSlideClick = (path) => {
    navigate(path); // Переход на нужную страницу
  };

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          onClick={() => handleSlideClick(slide.path)} // Добавляем обработчик клика
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
