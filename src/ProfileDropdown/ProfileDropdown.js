// src/components/ProfileDropdown/ProfileDropdown.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // ✅ Required for navigation
import './ProfileDropdown.css';


const ProfileDropdown = ({ onClose }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="profile-dropdown animate-dropdown" ref={dropdownRef}>
      <ul>
        <li>
          <Link to="/profile">👤 Account</Link>
        </li>
        <li>
          <Link to="/settings">⚙️ Settings</Link>
        </li>
        <li>
          <a href="/logout">🚪 Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
