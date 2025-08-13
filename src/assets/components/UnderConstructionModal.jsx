import React, { useState, useEffect } from "react";
import "../styles/UnderConstructionModal.css";

function UnderConstructionModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Если флаг закрытия не установлен в sessionStorage – показываем окно
    const modalClosed = sessionStorage.getItem("underConstructionClosed");
    if (!modalClosed) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("underConstructionClosed", "true");
  };

  if (!visible) return null;

  return (
    <div className="uc-modal-overlay">
      <div className="uc-modal">
        <button
          className="uc-close-btn"
          onClick={handleClose}
          aria-label="Закрыть"
        ></button>
        <h2 className="us-h2">Важное уведомление !</h2>
        <p className="uc-p">
          Мы рады что вы посетили наш сайт и мы надеемся на ваше дальнейшее
          сотруднечество. На данный момент не все товары доступны. Пожалуйста,
          уточняйте цены и наличие у менеджера через WhatsApp.
        </p>
        <a
          href="https://wa.me/77782673976"
          target="_blank"
          rel="noopener noreferrer"
          className="uc-wa-btn"
        >
          Написать в WhatsApp
        </a>
      </div>
    </div>
  );
}

export default UnderConstructionModal;
