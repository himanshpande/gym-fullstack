import React from 'react';
import './ProfileDropdown.css';

function ProfileDropdown({ onClose, user }) {
  console.log('ProfileDropdown rendered with user:', user); // Debug log
  
  // Get profile picture URL with fallback
  const getProfilePicture = () => {
    // First check if user prop has profile picture
    if (user?.profilePicture) {
      return user.profilePicture;
    }
    
    // Check localStorage for updated user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.profilePicture) {
          return parsedUser.profilePicture;
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
    
    // Return default avatar if no profile picture found
    return 'https://via.placeholder.com/50x50/667eea/ffffff?text=' + 
           (user?.name ? user.name.charAt(0).toUpperCase() : 'U');
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
            onError={(e) => {
              // Fallback if image fails to load
              e.target.src = 'https://via.placeholder.com/50x50/667eea/ffffff?text=' + 
                            (user?.name ? user.name.charAt(0).toUpperCase() : 'U');
            }}
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