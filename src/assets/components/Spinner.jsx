import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login", delay = 5000 }) => {
  const [count, setCount] = useState(3);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Задержка перед началом отсчета
    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((prevValue) => --prevValue);
      }, 1000);

      if (count === 0) {
        setIsVisible(false);
        setTimeout(() => {
          navigate(`/${path}`, {
            state: location.pathname,
          });
        }, 2000); // Плавное исчезновение перед переходом
      }

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [count, navigate, location, path, delay]);

  return (
    <div className="loader-wrapper" style={{ opacity: isVisible ? 1 : 0 }}>
      <div className="loader-content">
        <div className="custom-loader"></div>
        <p className="loader-text">Подождите {count} секунд</p>
      </div>
      <style>
        {`
          .loader-wrapper {
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.95);
            transition: opacity 0.5s ease;
          }

          .loader-content {
            text-align: center;
          }

          .custom-loader {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #ff0000;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }

          .loader-text {
            color: #333;
            font-size: 1.2rem;
            margin: 0;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
