import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TrainersSection from '../TrainersSection/Trainers';
import MembershipSection from '../Membershipsection/MembershipSection';
import ReviewsSection from '../Reviews/ReviewsSection';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown'; // 👈 import



function Home() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(true);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <nav className="navbar" data-aos="fade-down">
        <div className="logo">MyApp</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="/settings">Contact</a></li>
        </ul>

        {/* Profile Icon with Dropdown */}
        <div className="profile-icon" onClick={toggleDropdown}>
          <img src="https://i.pravatar.cc/40" alt="Profile" />
        </div>
        {showDropdown && <ProfileDropdown onClose={closeDropdown} />}
      </nav>

      <section className="hero" data-aos="zoom-in">
        <div className="hero-content">
          <h1>Your Transformation Starts Here</h1>
          <p>Sweat. Strength. Success. Repeat.</p>
          <Link to="/courses" className="hero-button">Get Started</Link>

        </div>
      </section>

      <TrainersSection />
      <MembershipSection />
      <ReviewsSection />
      
    </div>
  );
}

export default Home;
