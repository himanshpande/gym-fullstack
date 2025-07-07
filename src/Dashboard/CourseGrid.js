import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CourseCard.css';
import CartSidebar from './CartSidebar';

const GymCourses = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [cart, setCart] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const courses = [
    {
      id: 1,
      name: 'Strength Training',
      description: 'Improve overall strength and endurance.',
      price: '1199 INR',
      image: 'https://source.unsplash.com/400x300/?weightlifting,gym',
    },
    {
      id: 2,
      name: 'Cardio Blast',
      description: 'Boost heart rate and burn calories.',
      price: '1099 INR',
      image: 'https://source.unsplash.com/400x300/?cardio,fitness',
    },
    {
      id: 3,
      name: 'Yoga Flex',
      description: 'Stretch, balance, and relax your body.',
      price: '999 INR',
      image: 'https://source.unsplash.com/400x300/?yoga,meditation',
    },
    {
      id: 4,
      name: 'HIIT Challenge',
      description: 'High-Intensity Interval Training for fat loss.',
      price: '1299 INR',
      image: 'https://source.unsplash.com/400x300/?hiit,training',
    },
    {
      id: 5,
      name: 'Bodyweight Burn',
      description: 'No equipment, just you and your goals.',
      price: '1099 INR',
      image: 'https://source.unsplash.com/400x300/?bodyweight,workout',
    },
    {
      id: 6,
      name: 'Functional Fitness',
      description: 'Real-world strength & mobility routines.',
      price: '1199 INR',
      image: 'https://source.unsplash.com/400x300/?crossfit,training',
    },
    {
      id: 7,
      name: 'Core Crusher',
      description: 'Train your abs and core strength.',
      price: '999 INR',
      image: 'https://source.unsplash.com/400x300/?abs,core',
    },
    {
      id: 8,
      name: 'Kickboxing Power',
      description: 'Martial arts-inspired cardio blast.',
      price: '1399 INR',
      image: 'https://source.unsplash.com/400x300/?kickboxing,fitness',
    },
    {
      id: 9,
      name: 'Pilates Flow',
      description: 'Tone your body and improve posture.',
      price: '1099 INR',
      image: 'https://source.unsplash.com/400x300/?pilates,stretch',
    },
    {
      id: 10,
      name: 'Strength Circuit',
      description: 'Weighted circuit workouts.',
      price: '1299 INR',
      image: 'https://source.unsplash.com/400x300/?gym,weights',
    },
    {
      id: 11,
      name: 'Mobility Mastery',
      description: 'Joint strength and flexibility.',
      price: '999 INR',
      image: 'https://source.unsplash.com/400x300/?mobility,fitness',
    },
    {
      id: 12,
      name: 'Endurance Ride',
      description: 'Spin class for max stamina.',
      price: '1199 INR',
      image: 'https://source.unsplash.com/400x300/?cycling,spin',
    },
  ];

  const addToCart = (course) => {
    if (!cart.find(item => item.id === course.id)) {
      setCart(prev => [...prev, course]);
    }
    setShowCartPopup(true);
  };

  const closeCart = () => setShowCartPopup(false);

  const handleBuy = () => {
    alert('Thank you for your purchase!');
    setCart([]);
    setShowCartPopup(false);
  };

  return (
    <div className="gym-container">
      <h2 data-aos="fade-down">🔥 Gym Courses & Subscriptions</h2>
      <div className="gym-grid">
        {courses.map((course, idx) => (
          <div key={course.id} className="gym-card" data-aos="zoom-in-up" data-aos-delay={idx * 80}>
            <img src={course.image} alt={course.name} className="gym-card-img" />
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p className="gym-price">{course.price}</p>
            <button className="gym-btn" onClick={() => addToCart(course)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {showCartPopup && (
        <CartSidebar
          cartItems={cart}
          onClose={closeCart}
          onBuy={handleBuy}
        />
      )}
    </div>
  );
};

export default GymCourses;
