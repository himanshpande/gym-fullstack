"use client"

import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { 
  ShoppingCart, Plus, X, CreditCard, Dumbbell, Heart, Zap, Target, Star, Users, Clock,
  ArrowLeft, CheckCircle, XCircle, Smartphone, Lock, Shield, Info, QrCode
} from "lucide-react"
import CourseDetailsModal from "./course-details-modal.jsx"
import "./GymCourses.css"

const GymCourses = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const [cart, setCart] = useState([])
  const [showCartSidebar, setShowCartSidebar] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showCourseDetails, setShowCourseDetails] = useState(false)
  const [currentView, setCurrentView] = useState('courses') // 'courses' or 'payment'
  const [paymentData, setPaymentData] = useState({
    selectedPaymentMethod: 'googlepay',
    isProcessing: false,
    paymentStatus: null,
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  })

  const GOOGLE_PAY_UPI_ID = 'vp1246194@okhdfcbank' // Replace with your business UPI ID
  const GOOGLE_PAY_MERCHANT_NAME = 'Vineet Pandey'
  const MERCHANT_UPI_ID = 'vp1246194@okhdfcbank'

  const courses = [
    {
      id: 1,
      name: "Strength Training Mastery",
      description:
        "Master the fundamentals of strength training with progressive overload techniques and proper form guidance.",
      price: "1",
      originalPrice: "1499",
      image: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2022/11/Strength-training-programs.jpg",
      category: "Strength",
      duration: "8 weeks",
      level: "Intermediate",
      icon: Dumbbell,
      popular: true,
      rating: 4.8,
      students: 2847,
      lessons: 37,
    },
    {
      id: 2,
      name: "Cardio Blast Revolution",
      description: "High-energy cardiovascular workouts designed to maximize calorie burn and improve endurance.",
      price: "1099",
      originalPrice: "1299",
      image: "https://tse1.mm.bing.net/th/id/OIP.LXfQEBUswD7U0kg0LSZFvQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Cardio",
      duration: "6 weeks",
      level: "Beginner",
      icon: Heart,
      popular: false,
      rating: 4.6,
      students: 1923,
      lessons: 28,
    },
    {
      id: 3,
      name: "Yoga Flex & Flow",
      description: "Enhance flexibility, balance, and mindfulness through guided yoga sequences and meditation.",
      price: "999",
      originalPrice: "1199",
      image: "https://tse3.mm.bing.net/th/id/OIP.ZDhQ-l86diIDptrm7AQ8-gHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Flexibility",
      duration: "4 weeks",
      level: "All Levels",
      icon: Target,
      popular: false,
      rating: 4.9,
      students: 3421,
      lessons: 24,
    },
    {
      id: 4,
      name: "HIIT Challenge Elite",
      description: "Push your limits with high-intensity interval training designed for maximum fat burn and fitness gains.",
      price: "1299",
      originalPrice: "1599",
      image: "https://tse2.mm.bing.net/th/id/OIP.mijMSBX2fxIbSYqZtEXtUQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "HIIT",
      duration: "6 weeks",
      level: "Advanced",
      icon: Zap,
      popular: true,
      rating: 4.7,
      students: 2156,
      lessons: 32,
    },
    {
      id: 5,
      name: "Bodyweight Warrior",
      description: "Master bodyweight movements and calisthenics without any equipment needed.",
      price: "1099",
      originalPrice: "1299",
      image: "https://fitguide.blog/wp-content/uploads/2021/06/bodyweight4.jpg",
      category: "Bodyweight",
      duration: "8 weeks",
      level: "Beginner",
      icon: Target,
      popular: false,
      rating: 4.5,
      students: 1687,
      lessons: 35,
    },
    {
      id: 6,
      name: "Functional Fitness Pro",
      description: "Develop real-world strength and movement patterns for everyday activities and sports.",
      price: "1199",
      originalPrice: "1399",
      image: "https://th.bing.com/th/id/OIP.KeefD2oSLRZIpH18HYIzVQHaD7?w=301&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      category: "Functional",
      duration: "10 weeks",
      level: "Intermediate",
      icon: Dumbbell,
      popular: false,
      rating: 4.6,
      students: 1834,
      lessons: 42,
    },
    {
      id: 7,
      name: "Core Crusher Academy",
      description: "Sculpt a powerful core with targeted exercises for strength, stability, and definition.",
      price: "999",
      originalPrice: "1199",
      image: "https://images.herzindagi.info/image/2022/May/fun-cardio-workout.jpg",
      category: "Core",
      duration: "6 weeks",
      level: "All Levels",
      icon: Target,
      popular: false,
      rating: 4.4,
      students: 2234,
      lessons: 26,
    },
    {
      id: 8,
      name: "Kickboxing Powerhouse",
      description: "Combine martial arts techniques with high-intensity cardio for total body conditioning.",
      price: "1399",
      originalPrice: "1699",
      image: "https://tse1.mm.bing.net/th/id/OIP.OtiMZ24pN6HxN0nA5e-MpwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Martial Arts",
      duration: "8 weeks",
      level: "Intermediate",
      icon: Zap,
      popular: true,
      rating: 4.8,
      students: 1567,
      lessons: 38,
    },
    {
      id: 9,
      name: "Pilates Flow Mastery",
      description: "Improve posture, flexibility, and core strength through controlled Pilates movements.",
      price: "1099",
      originalPrice: "1299",
      image: "https://th.bing.com/th/id/OSK.HEROJ14zoBlRI9SJLFTqS6dUiimm01UbJEfxGCrJ7YdRNAM?w=472&h=280&c=1&rs=2&o=6&dpr=1.3&pid=SANGAM",
      category: "Pilates",
      duration: "6 weeks",
      level: "Beginner",
      icon: Heart,
      popular: false,
      rating: 4.7,
      students: 2891,
      lessons: 30,
    },
    {
      id: 10,
      name: "Strength Circuit Elite",
      description: "Advanced circuit training combining strength and conditioning for maximum results.",
      price: "1299",
      originalPrice: "1599",
      image: "https://fitguide.blog/wp-content/uploads/2021/06/bodyweight4.jpg",
      category: "Circuit",
      duration: "8 weeks",
      level: "Advanced",
      icon: Dumbbell,
      popular: false,
      rating: 4.6,
      students: 1423,
      lessons: 36,
    },
    {
      id: 11,
      name: "Mobility Mastery Pro",
      description: "Enhance joint health, flexibility, and movement quality for peak performance.",
      price: "999",
      originalPrice: "1199",
      image: "https://i.ytimg.com/vi/ecqbzlc1qqQ/oar2.jpg",
      category: "Mobility",
      duration: "4 weeks",
      level: "All Levels",
      icon: Target,
      popular: false,
      rating: 4.5,
      students: 1789,
      lessons: 22,
    },
    {
      id: 12,
      name: "Endurance Ride Pro",
      description: "Build cardiovascular endurance and leg strength through structured cycling workouts.",
      price: "1199",
      originalPrice: "1399",
      image: "https://th.bing.com/th/id/OIP.TGLcVBfd48R7sVI-s-RmHAHaEp?w=310&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      category: "Cycling",
      duration: "6 weeks",
      level: "Intermediate",
      icon: Heart,
      popular: false,
      rating: 4.4,
      students: 1345,
      lessons: 28,
    },
  ]

  const addToCart = (course) => {
    if (!cart.find((item) => item.id === course.id)) {
      setCart((prev) => [...prev, course])
    }
    setShowCartSidebar(true)
  }

  const removeFromCart = (courseId) => {
    setCart((prev) => prev.filter((item) => item.id !== courseId))
  }

  const closeCart = () => setShowCartSidebar(false)

  const handleCheckout = () => {
    setShowCartSidebar(false)
    setCurrentView('payment')
  }

  const handleBackToCart = () => {
    setCurrentView('courses')
  }

  const openCourseDetails = (course) => {
    setSelectedCourse(course)
    setShowCourseDetails(true)
  }

  const closeCourseDetails = () => {
    setShowCourseDetails(false)
    setSelectedCourse(null)
  }

  const total = cart.reduce((sum, item) => {
    const price = Number.parseInt(item.price)
    return sum + (isNaN(price) ? 0 : price)
  }, 0)

  const cartItemCount = cart.length

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={i < Math.floor(rating) ? "star-filled" : "star-empty"} size={12} />
    ))
  }

  // Payment Functions
  const generateQRCode = (amount, upiId, merchantName) => {
    const upiString = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=Gym%20Courses%20Payment`;
    
    // Using QR Server API for generating QR code
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`;
    
    return (
      <div className="qr-container">
        <div className="qr-header">
          <h3>Scan QR Code to Pay</h3>
          <p>Use any UPI app (GPay, PhonePe, Paytm, etc.)</p>
        </div>
        
        <div className="qr-code-wrapper">
          <img 
            src={qrCodeUrl} 
            alt="Payment QR Code" 
            className="qr-code-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="qr-fallback">
            <div className="qr-fallback-content">
              <QrCode size={48} className="qr-icon" />
              <div className="qr-fallback-text">QR Code</div>
              <div className="qr-fallback-subtext">Scan with any UPI app</div>
            </div>
          </div>
        </div>
        
        <div className="qr-details">
          <div className="merchant-info">
            <div className="merchant-name">{merchantName}</div>
          </div>
          <div className="upi-id">UPI ID: {upiId}</div>
          <div className="amount">Amount: ₹{amount}</div>
        </div>
        
        <div className="qr-buttons">
          <button 
            onClick={() => {
              if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window.location.href = upiString;
              }
            }}
            className="open-upi-btn"
          >
            Open UPI App
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(upiId);
              alert('UPI ID copied to clipboard!');
            }}
            className="copy-upi-btn"
          >
            Copy UPI ID
          </button>
        </div>
        
        <div className="qr-instructions">
          <div className="instructions-title">Steps:</div>
          <div className="instructions-list">
            1. Open any UPI app<br/>
            2. Scan this QR code<br/>
            3. Verify amount and pay<br/>
            4. Screenshot payment confirmation
          </div>
        </div>
      </div>
    );
  };

  const initializeGooglePayPayment = async () => {
    const finalAmount = total + Math.round(total * 0.18);
    
    const upiUrl = `upi://pay?pa=${GOOGLE_PAY_UPI_ID}&pn=${GOOGLE_PAY_MERCHANT_NAME}&am=${finalAmount}&cu=INR&tn=Gym%20Courses%20Payment`;
    
    const qrData = {
      amount: finalAmount,
      upiId: GOOGLE_PAY_UPI_ID,
      merchantName: GOOGLE_PAY_MERCHANT_NAME,
      transactionNote: `Gym Courses Payment - ${cart.length} courses`
    };
    
    setPaymentData(prev => ({ 
      ...prev, 
      paymentStatus: 'qr_display',
      qrData: qrData
    }));
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      try {
        window.location.href = upiUrl;
      } catch (error) {
        console.log('Could not open UPI app directly, showing QR code');
      }
    }
  };

  const handleUPIPayment = () => {
    const finalAmount = total + Math.round(total * 0.18);
    
    setPaymentData(prev => ({ 
      ...prev, 
      isProcessing: true, 
      paymentStatus: 'upi_initiated' 
    }));
    
    setTimeout(() => {
      setPaymentData(prev => ({ 
        ...prev, 
        isProcessing: false, 
        paymentStatus: 'upi_display',
        qrData: {
          amount: finalAmount,
          upiId: MERCHANT_UPI_ID,
          merchantName: GOOGLE_PAY_MERCHANT_NAME
        }
      }));
    }, 1000);
  };

  const handleGooglePayPayment = () => {
    setPaymentData(prev => ({ 
      ...prev, 
      isProcessing: true, 
      paymentStatus: 'processing' 
    }));
    
    setTimeout(() => {
      initializeGooglePayPayment();
    }, 1000);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!paymentData.customerInfo.name || !paymentData.customerInfo.email || !paymentData.customerInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setPaymentData(prev => ({ ...prev, isProcessing: true }));

    try {
      switch (paymentData.selectedPaymentMethod) {
        case 'googlepay':
          await initializeGooglePayPayment();
          break;
        case 'upi':
          handleUPIPayment();
          break;
        default:
          throw new Error('Invalid payment method');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentData(prev => ({ 
        ...prev, 
        isProcessing: false, 
        paymentStatus: 'failed' 
      }));
      alert('Payment failed. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [name]: value
      }
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentData(prev => ({ ...prev, selectedPaymentMethod: method }));
  };

  const handlePaymentSuccess = () => {
    setPaymentData(prev => ({ 
      ...prev, 
      paymentStatus: 'success' 
    }));
    setTimeout(() => {
      setCart([]);
      setCurrentView('courses');
      setPaymentData(prev => ({ 
        ...prev, 
        paymentStatus: null 
      }));
    }, 3000);
  };

  // Payment View
  if (currentView === 'payment') {
    const finalTotal = total + Math.round(total * 0.18);
    
    return (
      <div className="payment-container">
        <div className="payment-header">
          <button 
            className="back-button"
            onClick={handleBackToCart}
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1>Secure Checkout</h1>
          <div className="ssl-badge">
            <Shield size={16} />
            <span>SSL Secured</span>
          </div>
        </div>

        <div className="payment-content">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>
              <ShoppingCart size={20} />
              Order Summary
            </h2>
            
            <div className="order-items">
              {cart.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>{item.category} • {item.duration}</p>
                  </div>
                  <span className="item-price">₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>₹{total}</span>
              </div>
              <div className="total-line">
                <span>GST (18%):</span>
                <span>₹{Math.round(total * 0.18)}</span>
              </div>
              <div className="total-line final-total">
                <span>Total:</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment-form-container">
            <h2>
              <CreditCard size={20} />
              Payment Details
            </h2>

            <form onSubmit={handlePayment}>
              {/* Customer Information */}
              <div className="customer-info">
                <h3>Customer Information</h3>
                
                <div className="form-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={paymentData.customerInfo.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={paymentData.customerInfo.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-field">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={paymentData.customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-field">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={paymentData.customerInfo.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    rows="3"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="payment-methods">
                <h3>Payment Method</h3>
                
                <div className="payment-method-options">
                  <div 
                    className={`payment-method ${paymentData.selectedPaymentMethod === 'googlepay' ? 'selected' : ''}`}
                    onClick={() => handlePaymentMethodChange('googlepay')}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="googlepay"
                      checked={paymentData.selectedPaymentMethod === 'googlepay'}
                      onChange={() => handlePaymentMethodChange('googlepay')}
                    />
                    <div className="gpay-badge">
                      G Pay
                    </div>
                    <div className="method-info">
                      <strong>Google Pay</strong>
                      <p>Pay with Google Pay app</p>
                    </div>
                  </div>

                  <div 
                    className={`payment-method ${paymentData.selectedPaymentMethod === 'upi' ? 'selected' : ''}`}
                    onClick={() => handlePaymentMethodChange('upi')}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentData.selectedPaymentMethod === 'upi'}
                      onChange={() => handlePaymentMethodChange('upi')}
                    />
                    <Smartphone size={20} />
                    <div className="method-info">
                      <strong>UPI Direct</strong>
                      <p>Pay with any UPI app</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              {paymentData.paymentStatus && (
                <div className={`payment-status ${paymentData.paymentStatus}`}>
                  {paymentData.paymentStatus === 'success' && (
                    <>
                      <CheckCircle size={20} />
                      <span>Payment successful! Redirecting...</span>
                    </>
                  )}
                  {paymentData.paymentStatus === 'failed' && (
                    <>
                      <XCircle size={20} />
                      <span>Payment failed. Please try again.</span>
                    </>
                  )}
                  {paymentData.paymentStatus === 'processing' && (
                    <>
                      <div className="spinner"></div>
                      <span>Processing payment...</span>
                    </>
                  )}
                  {paymentData.paymentStatus === 'upi_initiated' && (
                    <>
                      <Info size={20} />
                      <span>Preparing UPI payment...</span>
                    </>
                  )}
                  {(paymentData.paymentStatus === 'qr_display' || paymentData.paymentStatus === 'upi_display') && (
                    <>
                      <QrCode size={20} />
                      <span>Scan QR code to complete payment</span>
                    </>
                  )}
                </div>
              )}

              {/* QR Code Display */}
              {(paymentData.paymentStatus === 'qr_display' || paymentData.paymentStatus === 'upi_display') && paymentData.qrData && (
                <div className="qr-display">
                  {generateQRCode(paymentData.qrData.amount, paymentData.qrData.upiId, paymentData.qrData.merchantName)}
                  
                  <div className="payment-confirm-buttons">
                    <button 
                      type="button"
                      onClick={handlePaymentSuccess}
                      className="success-btn"
                    >
                      ✓ Payment Completed
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaymentData(prev => ({ ...prev, paymentStatus: 'failed' }))}
                      className="failed-btn"
                    >
                      ✗ Payment Failed
                    </button>
                  </div>
                </div>
              )}

              {/* Pay Button */}
              {(!paymentData.paymentStatus || paymentData.paymentStatus === 'failed') && (
                <button 
                  type="submit" 
                  className={`pay-button ${paymentData.isProcessing ? 'processing' : ''}`}
                  disabled={paymentData.isProcessing}
                >
                  {paymentData.isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Pay ₹{finalTotal} Securely
                    </>
                  )}
                </button>
              )}
            </form>

            <div className="ssl-notice">
              <Lock size={12} />
              Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Courses View
  return (
    <div className="gym-container">
      {/* Header Section */}
      <div className="header-section" data-aos="fade-down">
        <div className="premium-badge">
          <Dumbbell size={16} />
          Premium Fitness Programs
        </div>
        <h1 className="main-title">Transform Your Body</h1>

        <p className="main-subtitle">
          Choose from our expertly designed fitness courses and start your journey to a stronger, healthier you.
        </p>
      </div>

      {/* Cart Button */}
      <button className="cart-button" onClick={() => setShowCartSidebar(true)}>
        <ShoppingCart size={20} />
        Cart
        {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
      </button>

      {/* Cart Sidebar */}
      {showCartSidebar && (
        <div className="cart-overlay" onClick={closeCart}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>
                <ShoppingCart size={20} />
                Your Cart ({cartItemCount} items)
              </h3>
              <button className="close-btn" onClick={closeCart}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-content">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingCart size={64} />
                  <p>Your cart is empty</p>
                  <small>Add some courses to get started!</small>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} />
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p>
                            {item.category} • {item.duration}
                          </p>
                          <span className="price">₹{item.price}</span>
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Total: ₹{total}</span>
                    </div>
                    <button className="checkout-btn" onClick={handleCheckout}>
                      <CreditCard size={20} />
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="courses-grid">
        {courses.map((course, idx) => {
          const IconComponent = course.icon
          const isInCart = cart.find((item) => item.id === course.id)

          return (
            <div key={course.id} className="course-card" data-aos="zoom-in-up" data-aos-delay={idx * 80}>
              <div className="course-image">
                {course.popular && <span className="popular-badge">🔥 Popular</span>}
                <img src={course.image || "/placeholder.svg"} alt={course.name} />
              </div>

              <div className="course-content">
                <div className="course-header">
                <div className="course-category">
                    <IconComponent size={16} />
                    <span>{course.category}</span>
                  </div>
                  <div className="course-level">{course.level}</div>
                </div>

                <h3 className="course-title">{course.name}</h3>
                <p className="course-description">{course.description}</p>

                <div className="course-stats">
                  <div className="stat">
                    <Users size={14} />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="stat">
                    <Clock size={14} />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="stat">
                    <div className="rating">
                      {renderStars(course.rating)}
                      <span className="rating-text">{course.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="course-pricing">
                  <div className="price-info">
                    <span className="current-price">₹{course.price}</span>
                    <span className="original-price">₹{course.originalPrice}</span>
                  </div>
                  <div className="duration-info">
                    <Clock size={12} />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="course-actions">
                  <button 
                    className="details-btn"
                    onClick={() => openCourseDetails(course)}
                  >
                    View Details
                  </button>
                  <button
                    className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
                    onClick={() => addToCart(course)}
                    disabled={isInCart}
                  >
                    {isInCart ? (
                      <>
                        <CheckCircle size={16} />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Course Details Modal */}
      {showCourseDetails && selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          isOpen={showCourseDetails}
          onClose={closeCourseDetails}
          onAddToCart={addToCart}
          isInCart={cart.find((item) => item.id === selectedCourse.id)}
        />
      )}
    </div>
  )
}

export default GymCourses;
