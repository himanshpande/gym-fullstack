import React, { useEffect } from 'react';
import './BuyNow.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BuyNow = ({ totalAmount, onClose }) => {
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const handleConfirmPayment = () => {
    alert('✅ Payment Successful!');
    onClose();
  };

  return (
    <div className="buy-now-overlay">
      <div className="buy-now-box" data-aos="zoom-in">
        <h2>💳 Checkout</h2>
        <p>Total Payable Amount: <strong>{totalAmount} INR</strong></p>

        <div className="payment-options">
          <button className="payment-method">UPI</button>
          <button className="payment-method">Credit/Debit Card</button>
          <button className="payment-method">Net Banking</button>
          <button className="payment-method">Cash on Delivery</button>
        </div>

        <div className="payment-actions">
          <button className="pay-btn" onClick={handleConfirmPayment}>Confirm Payment</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
