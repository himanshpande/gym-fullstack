import { useState, useEffect } from 'react';
import { CreditCard, ShoppingCart, ArrowLeft, CheckCircle, XCircle, Smartphone, QrCode, Lock, Shield } from 'lucide-react';

const PaymentPage = ({ cart = [], total = 0, onBack, onPaymentSuccess }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Initialize Razorpay payment
  const initializeRazorpayPayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    
    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    try {
      // Create order on backend
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculatedTotal + Math.round(calculatedTotal * 0.18),
          currency: 'INR',
          customerInfo,
          cartItems: sampleCart
        }),
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'FitZone Academy',
        description: 'Gym Courses Purchase',
        image: 'https://your-logo-url.com/logo.png', // Replace with your logo
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('/api/payment/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              }),
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              setPaymentStatus('success');
              if (onPaymentSuccess) {
                onPaymentSuccess(response);
              }
            } else {
              setPaymentStatus('failed');
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setPaymentStatus('failed');
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        notes: {
          address: customerInfo.address,
          courses: sampleCart.map(item => item.name).join(', ')
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            setPaymentStatus('cancelled');
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      setPaymentStatus('failed');
      alert('Failed to initialize payment. Please try again.');
    }
  };

  // Handle form submission
  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      if (selectedPaymentMethod === 'razorpay') {
        await initializeRazorpayPayment();
      } else if (selectedPaymentMethod === 'upi') {
        // For UPI, you would typically generate a UPI payment link
        // This is a simplified example
        const upiLink = `upi://pay?pa=your-upi-id@paytm&pn=FitZone Academy&am=${total}&cu=INR&tn=Gym Courses Payment`;
        window.location.href = upiLink;
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Sample cart data for demo
  const sampleCart = cart.length > 0 ? cart : [
    {
      id: 1,
      name: "Strength Training Mastery",
      price: "1199",
      image: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2022/11/Strength-training-programs.jpg",
      category: "Strength",
      duration: "8 weeks"
    },
    {
      id: 2,
      name: "Cardio Blast Revolution",
      price: "1099",
      image: "https://tse1.mm.bing.net/th/id/OIP.LXfQEBUswD7U0kg0LSZFvQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Cardio",
      duration: "6 weeks"
    }
  ];

  const calculatedTotal = total > 0 ? total : sampleCart.reduce((sum, item) => sum + parseInt(item.price), 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Cart
        </button>
        <h1 style={styles.title}>Secure Checkout</h1>
        <div style={styles.securityBadge}>
          <Shield size={16} />
          <span>SSL Secured</span>
        </div>
      </div>

      <div style={styles.content}>
        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <h2 style={styles.sectionTitle}>
            <ShoppingCart size={20} />
            Order Summary
          </h2>
          
          <div style={styles.cartItems}>
            {sampleCart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div style={styles.itemInfo}>
                  <h4 style={styles.itemName}>{item.name}</h4>
                  <p style={styles.itemMeta}>{item.category} • {item.duration}</p>
                </div>
                <span style={styles.itemPrice}>₹{item.price}</span>
              </div>
            ))}
          </div>

          <div style={styles.totalSection}>
            <div style={styles.totalRow}>
              <span>Subtotal:</span>
              <span>₹{calculatedTotal}</span>
            </div>
            <div style={styles.totalRow}>
              <span>GST (18%):</span>
              <span>₹{Math.round(calculatedTotal * 0.18)}</span>
            </div>
            <div style={styles.totalRowFinal}>
              <span>Total:</span>
              <span>₹{calculatedTotal + Math.round(calculatedTotal * 0.18)}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div style={styles.paymentForm}>
          <h2 style={styles.sectionTitle}>
            <CreditCard size={20} />
            Payment Details
          </h2>

          <form onSubmit={handlePayment}>
            {/* Customer Information */}
            <div style={styles.formSection}>
              <h3 style={styles.formSectionTitle}>Customer Information</h3>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Address</label>
                <textarea
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Enter your address"
                  rows="3"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div style={styles.formSection}>
              <h3 style={styles.formSectionTitle}>Payment Method</h3>
              
              <div style={styles.paymentMethods}>
                <div 
                  style={{
                    ...styles.paymentMethod,
                    ...(selectedPaymentMethod === 'razorpay' ? styles.paymentMethodSelected : {})
                  }}
                  onClick={() => setSelectedPaymentMethod('razorpay')}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={selectedPaymentMethod === 'razorpay'}
                    onChange={() => setSelectedPaymentMethod('razorpay')}
                  />
                  <CreditCard size={20} />
                  <div>
                    <strong>Razorpay</strong>
                    <p>Credit/Debit Card, Net Banking, UPI, Wallets</p>
                  </div>
                </div>

                <div 
                  style={{
                    ...styles.paymentMethod,
                    ...(selectedPaymentMethod === 'upi' ? styles.paymentMethodSelected : {})
                  }}
                  onClick={() => setSelectedPaymentMethod('upi')}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={selectedPaymentMethod === 'upi'}
                    onChange={() => setSelectedPaymentMethod('upi')}
                  />
                  <Smartphone size={20} />
                  <div>
                    <strong>UPI Direct</strong>
                    <p>Pay directly with UPI apps</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            {paymentStatus && (
              <div style={{
                ...styles.statusMessage,
                ...(paymentStatus === 'success' ? styles.successMessage : 
                   paymentStatus === 'failed' ? styles.errorMessage : styles.cancelMessage)
              }}>
                {paymentStatus === 'success' && (
                  <>
                    <CheckCircle size={20} />
                    Payment successful! Thank you for your purchase.
                  </>
                )}
                {paymentStatus === 'failed' && (
                  <>
                    <XCircle size={20} />
                    Payment failed. Please try again.
                  </>
                )}
                {paymentStatus === 'cancelled' && (
                  <>
                    <XCircle size={20} />
                    Payment cancelled by user.
                  </>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                ...styles.payButton,
                ...(isProcessing ? styles.payButtonDisabled : {})
              }}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div style={styles.spinner}></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock size={20} />
                  Pay ₹{calculatedTotal + Math.round(calculatedTotal * 0.18)}
                </>
              )}
            </button>
          </form>

          <div style={styles.securityInfo}>
            <p style={styles.securityText}>
              <Shield size={16} />
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0
  },
  securityBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 12px',
    backgroundColor: '#e8f5e8',
    color: '#2d7d2d',
    borderRadius: '5px',
    fontSize: '14px'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  orderSummary: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    height: 'fit-content'
  },
  paymentForm: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px'
  },
  cartItems: {
    marginBottom: '20px'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 0',
    borderBottom: '1px solid #eee'
  },
  itemImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 5px 0'
  },
  itemMeta: {
    fontSize: '14px',
    color: '#666',
    margin: 0
  },
  itemPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#007bff'
  },
  totalSection: {
    borderTop: '2px solid #eee',
    paddingTop: '15px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '16px'
  },
  totalRowFinal: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#007bff',
    borderTop: '1px solid #eee'
  },
  formSection: {
    marginBottom: '30px'
  },
  formSectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
    resize: 'vertical'
  },
  paymentMethods: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    border: '2px solid #eee',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  paymentMethodSelected: {
    borderColor: '#007bff',
    backgroundColor: '#f0f8ff'
  },
  payButton: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'background-color 0.3s ease'
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #ffffff',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  statusMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  cancelMessage: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    border: '1px solid #ffeaa7'
  },
  securityInfo: {
    textAlign: 'center',
    marginTop: '20px'
  },
  securityText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#666',
    margin: 0
  }
};

// Add CSS for spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

export default PaymentPage;