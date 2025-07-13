import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TrainersSection from '../TrainersSection/Trainers';
import MembershipSection from '../Membershipsection/MembershipSection';
import ReviewsSection from '../Reviews/ReviewsSection';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import GymDietPlanner from '../Dashboard/DietPlanner';
import Footer from '../footer/footer.jsx'; // Importing Footer component

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
    
    // Fetch user data from localStorage
    const fetchUserData = () => {
      const storedUser = localStorage.getItem('user');
      console.log('Stored user data:', storedUser); // Debug log
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user data:', parsedUser); // Debug log
        setUser(parsedUser);
      }
    };

    fetchUserData();

    // Listen for storage changes (when user updates profile picture)
    const handleStorageChange = () => {
      console.log('Storage changed, refetching user data'); // Debug log
      fetchUserData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdated', handleStorageChange);
    };
  }, []);

  const toggleDropdown = () => {
    console.log('Toggle dropdown clicked, current state:', showDropdown); // Debug log
    setShowDropdown(!showDropdown); // Changed from setShowDropdown(true) to toggle
  };

  const closeDropdown = () => {
    console.log('Closing dropdown'); // Debug log
    setShowDropdown(false);
  };

  // Get profile picture URL with fallback
  const getProfilePicture = () => {
    if (user?.profilePicture) {
      console.log('Using user profile picture:', user.profilePicture); // Debug log
      return user.profilePicture;
    }
    
  };

  console.log('Rendering Home component - showDropdown:', showDropdown, 'user:', user); // Debug log

  return (
    <div>
      <nav className="navbar" data-aos="fade-down">
        <div className="logo">PulseForge</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/feature">Categories</a></li>
          <li><a href="diet">Diet</a></li>
          <li><a href="/ContactSection">Contact</a></li>
          

        </ul>

        {/* Profile Icon with Dropdown */}
        <div className="profile-icon" onClick={toggleDropdown}>
          <img src={getProfilePicture()} alt="Profile" />
        </div>
        {showDropdown && (
          <ProfileDropdown 
            onClose={closeDropdown} 
            user={user}
          />
        )}
      </nav>

      <section className="hero" data-aos="zoom-in">
        <div className="hero-content">
          <h1>Your Transformation Starts Here</h1>
          <p>Sweat. Strength. Success. Repeat.</p>
          <Link to="/courses" className="hero-button">Get Started</Link>
        </div>
      </section>
      <div id="features">

      <TrainersSection />
      <MembershipSection />
      <ReviewsSection />
      <Footer />
      </div>

    </div>
  );
}

export default Home;