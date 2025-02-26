///// filepath: src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import RouterApp from './Routes';
import { CartProvider } from './context/CartContext.jsx';
import ErrorBoundary from '../src/assets/components/ErrorBoundary.jsx';
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <CartProvider>
      <HelmetProvider>
        <RouterApp />
    </HelmetProvider>
      </CartProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
document.getElementById("root")