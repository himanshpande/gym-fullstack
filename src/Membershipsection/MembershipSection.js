import React, { useEffect } from 'react';
import './MembershipSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MembershipSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="membership-section" id="membership">
      <h2 className="membership-title" data-aos="fade-up">Membership Plans</h2>
      <p className="membership-subtitle" data-aos="fade-up" data-aos-delay="100">
        Choose a plan that fits your fitness goals
      </p>
      <div className="membership-cards" data-aos="zoom-in-up">
        <div className="membership-card">
          <h3>Basic</h3>
          <p className="price">$29/month</p>
          <ul>
            <li>Access to gym equipment</li>
            <li>1 group class/week</li>
            <li>Locker room access</li>
          </ul>
          <button className="join-btn">Join Now</button>
        </div>
        <div className="membership-card">

          <h3>Standard</h3>
          <p className="price">$49/month</p>
          <ul>
            <li>Everything in Basic</li>
            <li>3 group classes/week</li>
            <li>1 Personal Training Session</li>
          </ul>
          <button className="join-btn">Join Now</button>
        </div>
        <div className="membership-card">
          <h3>Premium</h3>
          <p className="price">$79/month</p>
          <ul>
            <li>Unlimited classes</li>
            <li>Dedicated trainer</li>
            <li>Free diet plan</li>
          </ul>
          <button className="join-btn">Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;
