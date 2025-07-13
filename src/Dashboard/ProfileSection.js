import React, { useState, useEffect } from 'react';
import { Camera, Edit3, Mail, Calendar, Target, TrendingUp, Dumbbell, Clock, Trophy, Zap } from "lucide-react";

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Mock user data - replace with actual API call
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data for gym context
        const mockUser = {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          profilePicture: null,
          joinDate: "2024-01-15",
          membershipType: "Premium",
          fitnessLevel: "Intermediate",
          goals: "Build Muscle",
          height: "5'10\"",
          weight: "180 lbs",
          emergencyContact: "+1 (555) 123-4567",
          // Fitness stats
          totalWorkouts: 45,
          weeklyGoal: 4,
          weeklyCompleted: 3,
          currentStreak: 5,
          maxStreak: 12,
          totalHoursWorked: 67.5,
          caloriesBurned: 15420
        };
        
        setUser(mockUser);
        setEditForm(mockUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Gym-specific stats
  const fitnessStats = [
    { 
      icon: Dumbbell, 
      label: "Total Workouts", 
      value: user?.totalWorkouts || 0, 
      color: "#3B82F6"
    },
    { 
      icon: Target, 
      label: "Weekly Progress", 
      value: `${user?.weeklyCompleted || 0}/${user?.weeklyGoal || 4}`, 
      color: "#10B981"
    },
    { 
      icon: Zap, 
      label: "Current Streak", 
      value: `${user?.currentStreak || 0} days`, 
      color: "#F59E0B"
    },
    { 
      icon: Clock, 
      label: "Hours Trained", 
      value: `${user?.totalHoursWorked || 0}h`, 
      color: "#8B5CF6"
    },
  ];

  // Handle profile picture upload
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser(prev => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSaveProfile = () => {
    setUser(editForm);
    setIsEditing(false);
    // Here you would typically send the update to your API
    console.log('Profile updated:', editForm);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '400px',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #3B82F6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}></div>
        <p style={{ color: '#6B7280' }}>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <p style={{ color: '#6B7280', marginBottom: '16px' }}>No user data found. Please login again.</p>
        <button 
          onClick={() => window.location.href = '/auth'}
          style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{margin: '0 auto', padding: '24px' }}>
      {/* Profile Header */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: '32px'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', 
          height: '120px' 
        }}></div>
        <div style={{ padding: '0 32px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'end', gap: '32px', marginTop: '-64px' }}>
            {/* Profile Picture */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <div style={{ 
                width: '128px', 
                height: '128px', 
                borderRadius: '50%', 
                backgroundColor: 'white', 
                padding: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
              }}>
                <img 
                  src={user.profilePicture || "/api/placeholder/120/120"} 
                  alt="Profile" 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <label style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Camera size={16} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleProfilePictureUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            {/* Profile Info */}
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div>
                  <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>
                    {user.name}
                  </h1>
                  <p style={{ color: '#6B7280', margin: '4px 0' }}>
                    {user.membershipType} Member
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '16px', 
                    marginTop: '12px',
                    fontSize: '14px',
                    color: '#6B7280'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Mail size={16} />
                      {user.email}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={16} />
                      Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '16px'
                  }}
                >
                  <Edit3 size={16} />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fitness Stats */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#1F2937', 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <TrendingUp size={24} style={{ color: '#3B82F6' }} />
          Fitness Stats
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px' 
        }}>
          {fitnessStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} style={{ 
                backgroundColor: '#F9FAFB',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between' 
                }}>
                  <div style={{ 
                    backgroundColor: stat.color,
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      fontSize: '32px', 
                      fontWeight: 'bold', 
                      color: '#1F2937',
                      margin: 0
                    }}>
                      {stat.value}
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6B7280',
                      margin: 0
                    }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Information */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        padding: '32px'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#1F2937', 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Trophy size={24} style={{ color: '#3B82F6' }} />
          Personal Information
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '24px' 
        }}>
          {/* Basic Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <p style={{ 
                  color: '#1F2937',
                  backgroundColor: '#F9FAFB',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  margin: 0
                }}>
                  {user.name}
                </p>
              )}
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <p style={{ 
                  color: '#1F2937',
                  backgroundColor: '#F9FAFB',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  margin: 0
                }}>
                  {user.email}
                </p>
              )}
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Emergency Contact
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <p style={{ 
                  color: '#1F2937',
                  backgroundColor: '#F9FAFB',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  margin: 0
                }}>
                  {user.emergencyContact}
                </p>
              )}
            </div>
          </div>

          {/* Fitness Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Fitness Level
              </label>
              {isEditing ? (
                <select
                  value={editForm.fitnessLevel}
                  onChange={(e) => handleInputChange('fitnessLevel', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              ) : (
                <p style={{ 
                  color: '#1F2937',
                  backgroundColor: '#F9FAFB',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  margin: 0
                }}>
                  {user.fitnessLevel}
                </p>
              )}
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Primary Goal
              </label>
              {isEditing ? (
                <select
                  value={editForm.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Build Muscle">Build Muscle</option>
                  <option value="Lose Weight">Lose Weight</option>
                  <option value="Improve Endurance">Improve Endurance</option>
                  <option value="General Fitness">General Fitness</option>
                  <option value="Strength Training">Strength Training</option>
                </select>
              ) : (
                <p style={{ 
                  color: '#1F2937',
                  backgroundColor: '#F9FAFB',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  margin: 0
                }}>
                  {user.goals}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Height
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                ) : (
                  <p style={{ 
                    color: '#1F2937',
                    backgroundColor: '#F9FAFB',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    margin: 0
                  }}>
                    {user.height}
                  </p>
                )}
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Weight
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                ) : (
                  <p style={{ 
                    color: '#1F2937',
                    backgroundColor: '#F9FAFB',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    margin: 0
                  }}>
                    {user.weight}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div style={{ 
            marginTop: '32px', 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: '16px' 
          }}>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: '8px 24px',
                border: '1px solid #D1D5DB',
                color: '#374151',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: 'white',
                fontSize: '16px'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              style={{
                padding: '8px 24px',
                backgroundColor: '#3B82F6',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        button:hover {
          opacity: 0.9;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileSection;