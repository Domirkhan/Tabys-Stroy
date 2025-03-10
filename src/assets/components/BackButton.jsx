import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBack} className="back-button">
     ❮
    </button>
  );
};

export default BackButton;