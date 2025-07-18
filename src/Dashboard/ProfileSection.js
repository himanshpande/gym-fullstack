import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Edit3, 
  Mail, 
  Calendar, 
  Phone, 
  MapPin,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Save,
  X,
  User,
  Settings,
  Lock,
  Heart,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import './ProfileSection.css';

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    showAddress: false
  });

  // Load user data with persistence
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Check if user data exists in localStorage
        const savedUser = localStorage.getItem('gymUserProfile');
        
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setEditForm(userData);
          
          // Load settings
          const savedNotifications = localStorage.getItem('userNotifications');
          const savedPrivacy = localStorage.getItem('userPrivacy');
          
          if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications));
          }
          if (savedPrivacy) {
            setPrivacy(JSON.parse(savedPrivacy));
          }
        } else {
          // Create default user data
          const defaultUser = {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 (555) 123-4567",
            address: "123 Fitness Street, Gym City, GC 12345",
            profilePicture: null,
            joinDate: "2024-01-15",
            membershipType: "Premium",
            fitnessLevel: "Intermediate",
            goals: "Build Muscle",
            height: "5'10\"",
            weight: "180 lbs",
            emergencyContact: "+1 (555) 987-6543",
            emergencyName: "Jane Doe",
            dateOfBirth: "1990-05-15",
            gender: "Male",
            medicalConditions: "",
            allergies: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          };
          
          setUser(defaultUser);
          setEditForm(defaultUser);
          // Don't save to localStorage until user makes changes
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Save user data to localStorage
  const saveUserData = (userData) => {
    localStorage.setItem('gymUserProfile', JSON.stringify(userData));
  };

  // Handle profile picture upload with persistence
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedUser = { ...user, profilePicture: e.target.result };
        setUser(updatedUser);
        setEditForm(updatedUser);
        saveUserData(updatedUser); // Save immediately when profile picture is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSaveProfile = () => {
    // Validate required fields
    if (!editForm.name || !editForm.email) {
      alert('Name and email are required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate password if changing
    if (editForm.newPassword && editForm.newPassword !== editForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    const updatedUser = { ...editForm };
    
    // Don't save password fields
    delete updatedUser.currentPassword;
    delete updatedUser.newPassword;
    delete updatedUser.confirmPassword;

    setUser(updatedUser);
    saveUserData(updatedUser);
    setIsEditing(false);
    
    // Show success message
    alert('Profile updated successfully!');
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle notification settings
  const handleNotificationChange = (type, value) => {
    const updatedNotifications = { ...notifications, [type]: value };
    setNotifications(updatedNotifications);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
  };

  // Handle privacy settings
  const handlePrivacyChange = (type, value) => {
    const updatedPrivacy = { ...privacy, [type]: value };
    setPrivacy(updatedPrivacy);
    localStorage.setItem('userPrivacy', JSON.stringify(updatedPrivacy));
  };

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'fitness':
        return renderFitnessInfo();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      default:
        return renderPersonalInfo();
    }
  };

  const renderPersonalInfo = () => (
    <div className="tab-content">
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          {isEditing ? (
            <input
              type="text"
              value={editForm.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          ) : (
            <div className="display-field">{user.name}</div>
          )}
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          {isEditing ? (
            <input
              type="email"
              value={editForm.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          ) : (
            <div className="display-field">{user.email}</div>
          )}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              value={editForm.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
          ) : (
            <div className="display-field">{user.phone}</div>
          )}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              value={editForm.dateOfBirth || ''}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
          ) : (
            <div className="display-field">
              {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not specified'}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Gender</label>
          {isEditing ? (
            <select
              value={editForm.gender || ''}
              onChange={(e) => handleInputChange('gender', e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <div className="display-field">{user.gender || 'Not specified'}</div>
          )}
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          {isEditing ? (
            <textarea
              value={editForm.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your address"
              rows="3"
            />
          ) : (
            <div className="display-field">{user.address}</div>
          )}
        </div>
      </div>
    </div>
  );

  const renderFitnessInfo = () => (
    <div className="tab-content">
      <div className="form-grid">
        <div className="form-group">
          <label>Fitness Level</label>
          {isEditing ? (
            <select
              value={editForm.fitnessLevel || ''}
              onChange={(e) => handleInputChange('fitnessLevel', e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          ) : (
            <div className="display-field">{user.fitnessLevel}</div>
          )}
        </div>

        <div className="form-group">
          <label>Primary Goal</label>
          {isEditing ? (
            <select
              value={editForm.goals || ''}
              onChange={(e) => handleInputChange('goals', e.target.value)}
            >
              <option value="Build Muscle">Build Muscle</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Improve Endurance">Improve Endurance</option>
              <option value="General Fitness">General Fitness</option>
              <option value="Strength Training">Strength Training</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Sports Performance">Sports Performance</option>
            </select>
          ) : (
            <div className="display-field">{user.goals}</div>
          )}
        </div>

        <div className="form-group">
          <label>Height</label>
          {isEditing ? (
            <input
              type="text"
              value={editForm.height || ''}
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder="e.g., 5'10\\" 
            />
          ) : (
            <div className="display-field">{user.height}</div>
          )}
        </div>

        <div className="form-group">
          <label>Weight</label>
          {isEditing ? (
            <input
              type="text"
              value={editForm.weight || ''}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              placeholder="e.g., 180 lbs or 82 kg"
            />
          ) : (
            <div className="display-field">{user.weight}</div>
          )}
        </div>

        <div className="form-group full-width">
          <label>Medical Conditions</label>
          {isEditing ? (
            <textarea
              value={editForm.medicalConditions || ''}
              onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
              placeholder="Any medical conditions we should know about..."
              rows="3"
            />
          ) : (
            <div className="display-field">{user.medicalConditions || 'None specified'}</div>
          )}
        </div>

        <div className="form-group full-width">
          <label>Allergies</label>
          {isEditing ? (
            <textarea
              value={editForm.allergies || ''}
              onChange={(e) => handleInputChange('allergies', e.target.value)}
              placeholder="Any allergies we should know about..."
              rows="3"
            />
          ) : (
            <div className="display-field">{user.allergies || 'None specified'}</div>
          )}
        </div>

        <div className="form-group">
          <label>Emergency Contact Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editForm.emergencyName || ''}
              onChange={(e) => handleInputChange('emergencyName', e.target.value)}
              placeholder="Emergency contact name"
            />
          ) : (
            <div className="display-field">{user.emergencyName}</div>
          )}
        </div>

        <div className="form-group">
          <label>Emergency Contact Phone</label>
          {isEditing ? (
            <input
              type="tel"
              value={editForm.emergencyContact || ''}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              placeholder="Emergency contact phone"
            />
          ) : (
            <div className="display-field">{user.emergencyContact}</div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="tab-content">
      <div className="security-section">
        <h3>Change Password</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Current Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={editForm.currentPassword || ''}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                placeholder="Enter current password"
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={editForm.newPassword || ''}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={editForm.confirmPassword || ''}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      <div className="security-section">
        <h3>Security Information</h3>
        <div className="security-info">
          <div className="security-item">
            <div className="security-icon">
              <Shield size={24} />
            </div>
            <div>
              <h4>Two-Factor Authentication</h4>
              <p>Add an extra layer of security to your account</p>
              <button className="btn-secondary">Enable 2FA</button>
            </div>
          </div>

          <div className="security-item">
            <div className="security-icon">
              <Lock size={24} />
            </div>
            <div>
              <h4>Login Sessions</h4>
              <p>Manage your active login sessions</p>
              <button className="btn-secondary">View Sessions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="tab-content">
      <div className="notification-section">
        <h3>Notification Preferences</h3>
        <div className="notification-list">
          <div className="notification-item">
            <div>
              <h4>Email Notifications</h4>
              <p>Receive updates and important information via email</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div>
              <h4>SMS Notifications</h4>
              <p>Get text messages for urgent updates</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div>
              <h4>Push Notifications</h4>
              <p>Receive notifications in your browser</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div>
              <h4>Marketing Communications</h4>
              <p>Receive promotional offers and fitness tips</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.marketing}
                onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="tab-content">
      <div className="privacy-section">
        <h3>Privacy Settings</h3>
        <div className="privacy-list">
          <div className="privacy-item">
            <div>
              <h4>Profile Visibility</h4>
              <p>Make your profile visible to other gym members</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacy.profileVisible}
                onChange={(e) => handlePrivacyChange('profileVisible', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="privacy-item">
            <div>
              <h4>Show Email Address</h4>
              <p>Display your email address on your public profile</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacy.showEmail}
                onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="privacy-item">
            <div>
              <h4>Show Phone Number</h4>
              <p>Display your phone number on your public profile</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacy.showPhone}
                onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="privacy-item">
            <div>
              <h4>Show Address</h4>
              <p>Display your address on your public profile</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacy.showAddress}
                onChange={(e) => handlePrivacyChange('showAddress', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-container">
        <AlertCircle size={48} />
        <p>No user data found. Please login again.</p>
        <button className="btn-primary" onClick={() => window.location.href = '/auth'}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-info">
          <div className="profile-picture-section">
            <div className="profile-picture-container">
              <img 
                src={user.profilePicture || "/api/placeholder/120/120"} 
                alt="Profile" 
                className="profile-picture"
              />
              <label className="camera-button">
                <Camera size={16} />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleProfilePictureUpload}
                  hidden
                />
              </label>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-basic-info">
              <h1>{user.name}</h1>
              <p className="membership-type">{user.membershipType} Member</p>
              <div className="profile-meta">
                <div className="meta-item">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button 
                className={`btn-primary ${isEditing ? 'btn-cancel' : ''}`}
                onClick={() => {
                  if (isEditing) {
                    setEditForm(user); // Reset form
                  }
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Navigation Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={20} />
            Personal Info
          </button>
          <button 
            className={`tab-button ${activeTab === 'fitness' ? 'active' : ''}`}
            onClick={() => setActiveTab('fitness')}
          >
            <Heart size={20} />
            Fitness & Health
          </button>
          <button 
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={20} />
            Security
          </button>
          <button 
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={20} />
            Notifications
          </button>
          <button 
            className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <Shield size={20} />
            Privacy
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content-container">
          {renderTabContent()}
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="save-actions">
            <button className="btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSaveProfile}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;