import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Добавляем небольшую задержку для гарантированной прокрутки
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
