import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, unit) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.product.id === product.id && item.unit === unit);
      if (exist) {
        return prev.map(item =>
          item.product.id === product.id && item.unit === unit
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity, unit }];
      }
    });
  };

  const updateQuantity = (productId, quantity, unit) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.unit === unit ? { ...item, quantity } : item
      )
    );
  };

  const updateUnit = (productId, newUnit) => {
    setCartItems(prev => {
      const item = prev.find(item => item.product.id === productId && item.unit === newUnit);
      if (item) {
        return prev.map(i =>
          i.product.id === productId && i.unit === newUnit ? { ...i, unit: newUnit } : i
        );
      }
      return prev;
    });
  };

  const removeFromCart = (productId, unit) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId || item.unit !== unit));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, updateUnit, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}