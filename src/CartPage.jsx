// src/components/CartPage.js
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate the total price of items in the cart (if your product data has price)
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setTotal(totalPrice);
  }, [cart]);

  const handleRemoveFromCart = async (productId) => {
    try {
      // Send delete request to backend to remove product from cart
      await axios.delete('http://localhost:7000/cart/remove', { data: { productId } });
      removeFromCart(productId);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.productId}>
              <h3>{item.productName}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleRemoveFromCart(item.productId)}>
                Remove from Cart
              </button>
            </div>
          ))
        )}
      </div>
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default CartPage;
