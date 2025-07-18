import React, { useState, useEffect } from 'react';
import './BuyNow.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PaymentPage from './Pay';

const BuyNow = ({ totalAmount, onClose, cartItems = [] }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleProceedToPayment = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = (response) => {
    console.log('Payment successful:', response);
    alert('✅ Payment Successful! Thank you for your purchase.');
    onClose();
  };

  const handlePaymentBack = () => {
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <PaymentPage
        cart={cartItems}
        total={totalAmount}
        onBack={handlePaymentBack}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className="buy-now-overlay">
      <div className="buy-now-box" data-aos="zoom-in">
        <h2>💳 Checkout</h2>
        <p>Total Payable Amount: <strong>₹{totalAmount}</strong></p>

        <div className="payment-options">
          <button 
            className={`payment-method ${selectedPaymentMethod === 'razorpay' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodSelect('razorpay')}
          >
            💳 Credit/Debit Card
          </button>
          <button 
            className={`payment-method ${selectedPaymentMethod === 'upi' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodSelect('upi')}
          >
            📱 UPI Payment
          </button>
          <button 
            className={`payment-method ${selectedPaymentMethod === 'netbanking' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodSelect('netbanking')}
          >
            🏦 Net Banking
          </button>
          <button 
            className={`payment-method ${selectedPaymentMethod === 'cod' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodSelect('cod')}
          >
            💰 Cash on Delivery
          </button>
        </div>

        <div className="payment-actions">
          <button 
            className="pay-btn" 
            onClick={handleProceedToPayment}
            disabled={!selectedPaymentMethod}
          >
            Proceed to Payment
          </button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
