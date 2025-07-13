import React from 'react';
import './ProfileDropdown.css';

function ProfileDropdown({ onClose, user }) {
  console.log('ProfileDropdown rendered with user:', user); // Debug log

  // Get profile picture URL with fallback
  const getProfilePicture = () => {
    if (user?.profilePicture) {
      return user.profilePicture;
    }
  };
    

  const handleLogout = () => {
    console.log('Logout clicked'); // Debug log
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="profile-dropdown-overlay" onClick={onClose}>
      <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
        <div className="profile-dropdown-header">
          <img 
            src={getProfilePicture()} 
            alt="Profile" 
            className="profile-dropdown-avatar"
          />
          <div className="profile-dropdown-info">
            <h4>{user?.name || 'User'}</h4>
            <p>{user?.email || 'No email provided'}</p>
          </div>
        </div>
        
        <div className="profile-dropdown-menu">
          <a href="/profile" className="dropdown-item">
            <span>👤</span> View Profile
          </a>
          <a href="/settings" className="dropdown-item">
            <span>⚙️</span> Settings
          </a>
          <a href="/help" className="dropdown-item">
            <span>❓</span> Help
          </a>
          <hr className="dropdown-divider" />
          <button className="dropdown-item logout-btn" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;