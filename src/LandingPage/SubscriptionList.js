import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CourseCard.css';
import CartPopup from './CartPopup'; // ✅ cart popup

const GymCourses = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [cart, setCart] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const courses = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Course ${i + 1}`,
    description: `Basic training module ${i + 1}`,
    price: `${999 + i * 100} INR`,
  }));

  const addToCart = (course) => {
    if (!cart.find(item => item.id === course.id)) {
      setCart(prev => [...prev, course]);
    }
  };

  const handleBuy = () => {
    alert('Thank you for your purchase!');
    setCart([]);
    setShowCartPopup(false);
  };

  return (
    <div className="gym-container">
      <h2>Gym Courses & Subscriptions</h2>

      {/* View Cart Button */}
      <div className="view-cart-wrapper">
        <button
          className="view-cart-btn"
          onClick={() => setShowCartPopup(true)}
          disabled={cart.length === 0}
        >
          View Cart ({cart.length})
        </button>
      </div>

      <div className="gym-grid">
        {courses.map((course) => (
          <div key={course.id} className="gym-card" data-aos="zoom-in">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p className="gym-price">{course.price}</p>
            <button
              className="gym-btn"
              onClick={() => addToCart(course)}
              disabled={cart.find(item => item.id === course.id)}
            >
              {cart.find(item => item.id === course.id) ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {showCartPopup && (
        <CartPopup
          cartItems={cart}
          onClose={() => setShowCartPopup(false)}
          onBuy={handleBuy}
        />
      )}
    </div>
  );
};

export default GymCourses;
