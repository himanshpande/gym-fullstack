"use client"

import { Camera, Edit3, Mail, MapPin, Calendar, Award, Target, TrendingUp } from "lucide-react"

const ProfileSection = () => {
  const profileStats = [
    { icon: Target, label: "Goals Completed", value: "24", total: "30", color: "blue-cyan" },
    { icon: TrendingUp, label: "Progress", value: "85%", total: "100%", color: "green-emerald" },
    { icon: Award, label: "Achievements", value: "12", total: "20", color: "purple-indigo" },
    { icon: Calendar, label: "Days Active", value: "156", total: "365", color: "orange-yellow" },
  ]

  const achievements = [
    { title: "Early Bird", description: "Completed 30 morning workouts", icon: "🌅", earned: true },
    { title: "Hydration Hero", description: "Drank 8 glasses of water for 7 days", icon: "💧", earned: true },
    { title: "Consistency King", description: "Logged in for 30 consecutive days", icon: "👑", earned: true },
    { title: "Goal Crusher", description: "Completed 50 goals", icon: "🎯", earned: false },
    { title: "Social Butterfly", description: "Referred 5 friends", icon: "🦋", earned: false },
    { title: "Wellness Warrior", description: "Complete all wellness challenges", icon: "⚔️", earned: false },
  ]

  return (
    <>
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-banner">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <img src="/placeholder.svg?height=120&width=120" alt="Profile" className="avatar-image" />
              <button className="avatar-edit-btn">
                <Camera className="camera-icon" />
              </button>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-name-section">
              <h2 className="profile-name">John Doe</h2>
              <button className="edit-profile-btn">
                <Edit3 className="edit-icon" />
                Edit Profile
              </button>
            </div>
            <p className="profile-title">Wellness Enthusiast</p>
            <div className="profile-details">
              <div className="profile-detail">
                <Mail className="detail-icon" />
                <span>john.doe@example.com</span>
              </div>
              <div className="profile-detail">
                <MapPin className="detail-icon" />
                <span>New York, USA</span>
              </div>
              <div className="profile-detail">
                <Calendar className="detail-icon" />
                <span>Joined March 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <section className="dashboard-section profile-stats-section">
        <h3 className="section-title">
          <span className="section-emoji">📊</span>
          Your Statistics
        </h3>
        <div className="stats-grid">
          {profileStats.map((stat, index) => {
            const Icon = stat.icon
            const percentage = stat.total
              ? (Number.parseInt(stat.value) / Number.parseInt(stat.total)) * 100
              : Number.parseInt(stat.value.replace("%", ""))
            return (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="stat-header">
                  <div className={`stat-icon ${stat.color}`}>
                    <Icon className="icon" />
                  </div>
                  <div className="stat-values">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-total">/ {stat.total}</span>
                  </div>
                </div>
                <p className="stat-label">{stat.label}</p>
                <div className="stat-progress">
                  <div className={`stat-progress-fill ${stat.color}`} style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Personal Information */}
      <section className="dashboard-section personal-info-section">
        <h3 className="section-title">
          <span className="section-emoji">👤</span>
          Personal Information
        </h3>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-row">
              <label className="info-label">Full Name</label>
              <div className="info-value-container">
                <span className="info-value">John Doe</span>
                <button className="info-edit-btn">
                  <Edit3 className="edit-icon-small" />
                </button>
              </div>
            </div>
            <div className="info-row">
              <label className="info-label">Email</label>
              <div className="info-value-container">
                <span className="info-value">john.doe@example.com</span>
                <button className="info-edit-btn">
                  <Edit3 className="edit-icon-small" />
                </button>
              </div>
            </div>
            <div className="info-row">
              <label className="info-label">Phone</label>
              <div className="info-value-container">
                <span className="info-value">+1 (555) 123-4567</span>
                <button className="info-edit-btn">
                  <Edit3 className="edit-icon-small" />
                </button>
              </div>
            </div>
            <div className="info-row">
              <label className="info-label">Location</label>
              <div className="info-value-container">
                <span className="info-value">New York, USA</span>
                <button className="info-edit-btn">
                  <Edit3 className="edit-icon-small" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="dashboard-section achievements-section">
        <h3 className="section-title">
          <span className="section-emoji">🏆</span>
          Achievements
        </h3>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`achievement-card ${achievement.earned ? "earned" : "locked"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="achievement-icon">
                <span className="achievement-emoji">{achievement.icon}</span>
                {achievement.earned && <div className="earned-badge">✓</div>}
              </div>
              <div className="achievement-content">
                <h4 className="achievement-title">{achievement.title}</h4>
                <p className="achievement-description">{achievement.description}</p>
              </div>
              {!achievement.earned && <div className="locked-overlay">🔒</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default ProfileSection
