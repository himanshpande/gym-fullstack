import React, { useState, useEffect } from 'react';
import './CartSidebar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BuyNow from '../Payment/BuyNow';


const CartSidebar = ({ cartItems, onClose }) => {
  const [showBuyNow, setShowBuyNow] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price);
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  const handleBuyNow = () => {
    setShowBuyNow(true);
  };

  const handleBuyNowClose = () => {
    setShowBuyNow(false);
    onClose(); // Optionally clear cart here
  };

  return (
    <>
      <div className="cart-sidebar" data-aos="fade-left">
        <div className="cart-header">
          <h3>🛒 Your Cart</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item-row">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <div className="cart-total-row">
                <span>Total ({cartItems.length} items):</span>
                <span className="total-price">{total} INR</span>
              </div>
              <button
                className="buy-btn"
                onClick={handleBuyNow}
                disabled={cartItems.length === 0}
              >
                Proceed to Buy
              </button>
            </div>
          </>
        )}
      </div>

      {showBuyNow && (
        <BuyNow totalAmount={total} onClose={handleBuyNowClose} />
      )}
    </>
  );
};

export default CartSidebar;