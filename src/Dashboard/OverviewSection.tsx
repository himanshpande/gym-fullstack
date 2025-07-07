"use client"

import { Droplets, Moon, Users, Gift, Apple, Utensils, Salad } from "lucide-react"

const OverviewSection = () => {
  const dailyTips = [
    { icon: Droplets, text: "Drink at least 8 glasses of water", color: "blue-cyan" },
    { icon: Moon, text: "Sleep 7-8 hours a day", color: "purple-indigo" },
    { icon: Users, text: "Take short walks every hour", color: "green-emerald" },
  ]

  const offers = [
    { icon: Gift, text: "20% off on Pro Membership!", color: "red-pink", badge: "HOT" },
    { icon: Users, text: "Refer a friend and earn credits", color: "orange-yellow", badge: "NEW" },
    { icon: Gift, text: "Free goodies on monthly plan!", color: "teal-green", badge: "LIMITED" },
  ]

  const dietPlan = [
    { icon: Apple, text: "Morning: Oats, fruits & green tea", time: "7:00 AM", color: "yellow-orange" },
    { icon: Utensils, text: "Lunch: Grilled chicken & veggies", time: "12:30 PM", color: "green-blue" },
    { icon: Salad, text: "Dinner: Soup & salad combo", time: "7:00 PM", color: "purple-pink" },
  ]

  return (
    <>
      {/* Header */}
      <div className="content-header">
        <h2 className="main-title">Welcome to Your Dashboard</h2>
        <p className="main-subtitle">Here's your personalized overview for today.</p>
      </div>

      {/* Daily Tips Section */}
      <section className="dashboard-section tips-section">
        <h3 className="section-title">
          <span className="section-emoji">🌞</span>
          Daily Tips
        </h3>
        <div className="card-grid">
          {dailyTips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div key={index} className="card tip-card" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`card-icon ${tip.color}`}>
                  <Icon className="icon" />
                </div>
                <p className="card-text">{tip.text}</p>
                <div className="progress-bar">
                  <div className={`progress-fill ${tip.color}`}></div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Offers Section */}
      <section className="dashboard-section offers-section">
        <h3 className="section-title">
          <span className="section-emoji">🎁</span>
          Offers for You
        </h3>
        <div className="card-grid">
          {offers.map((offer, index) => {
            const Icon = offer.icon
            return (
              <div key={index} className="card offer-card" style={{ animationDelay: `${index * 100}ms` }}>
                {offer.badge && <div className="offer-badge">{offer.badge}</div>}
                <div className={`card-icon ${offer.color}`}>
                  <Icon className="icon" />
                </div>
                <p className="card-text">{offer.text}</p>
                <button className="claim-button">Claim Now</button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Diet Plan Section */}
      <section className="dashboard-section diet-section">
        <h3 className="section-title">
          <span className="section-emoji">🥗</span>
          Your Diet Plan
        </h3>
        <div className="card-grid">
          {dietPlan.map((meal, index) => {
            const Icon = meal.icon
            return (
              <div key={index} className="card diet-card" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="card-header">
                  <div className={`card-icon ${meal.color}`}>
                    <Icon className="icon" />
                  </div>
                  <span className="meal-time">{meal.time}</span>
                </div>
                <p className="card-text">{meal.text}</p>
                <div className="card-footer">
                  <span className="detail-text">Tap for details</span>
                  <div className="check-circle">
                    <span className="check-mark">✓</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default OverviewSection
