// src/context/CartContext.js
import  { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProductIndex = prevCart.findIndex(item => item.productId === product.productId);

      if (existingProductIndex !== -1) {
        updatedCart[existingProductIndex].quantity += product.quantity;
      } else {
        updatedCart.push(product);
      }

      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
