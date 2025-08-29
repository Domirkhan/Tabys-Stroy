import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../styles/InstallGuide.css";
import BottomNav from "../components/BottomNav";

const InstallGuide = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Инструкция по установке веб-приложения</h1>
          </div>
        </div>

        <div className="install-guide">
          <div className="guide-container">
            <div className="guide-section">
              <h2>Установка на iPhone (iOS)</h2>
              <div className="guide-content">
                <video controls>
                  <source
                    src="/videos/ios-install-guide.mp4"
                    type="video/mp4"
                  />
                </video>
                <ol>
                  <li>Откройте Safari и перейдите на сайт tabys-stroy.kz</li>
                  <li>Нажмите кнопку "Поделиться" (Share)</li>
                  <li>Выберите "На экран «Домой»" (Add to Home Screen)</li>
                  <li>Нажмите "Добавить"</li>
                </ol>
              </div>
            </div>

            <div className="guide-section">
              <h2>Установка на Android</h2>
              <div className="guide-content">
                <video controls>
                  <source
                    src="/videos/android-install-guide.mp4"
                    type="video/mp4"
                  />
                </video>
                <ol>
                  <li>Откройте Chrome и перейдите на сайт tabys-stroy.kz</li>
                  <li>Нажмите на три точки в верхнем правом углу</li>
                  <li>Выберите "Установить приложение"</li>
                  <li>Нажмите "Установить"</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="help-card">
              <FaPhoneAlt />
              <h3>Остались вопросы?</h3>
              <p>Наши специалисты готовы ответить на ваши вопросы</p>
              <a href="tel:+77782673976" className="contact-btn">
                <FaPhoneAlt /> +7 (778) 267-39-76
              </a>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default InstallGuide;
