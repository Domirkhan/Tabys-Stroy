///// filepath: src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import RouterApp from './Routes';
import { CartProvider } from './context/cart.jsx';
import ErrorBoundary from '../src/assets/components/ErrorBoundary.jsx';
import { HelmetProvider } from "react-helmet-async";
import {AuthProvider} from '../src/context/auth.jsx'
import {registerSW} from 'virtual:pwa-register';
import { Toaster } from 'react-hot-toast';
import {SearchProvider } from '../src/context/search.jsx';

registerSW({immediate: true});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
    <SearchProvider>
    <ErrorBoundary>
      <CartProvider>
        <HelmetProvider>
          <RouterApp />
          <Toaster/>
        </HelmetProvider>
      </CartProvider>
    </ErrorBoundary>
    </SearchProvider>
  </AuthProvider>
</React.StrictMode>
);
document.getElementById("root")