"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, User, MessageSquare, Clock, Dumbbell, Users, Trophy } from "lucide-react"
import "./gym-contact.css";

export default function GymContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Backend integration will go here
    console.log("Gym inquiry submitted:", formData)
  }

  return (
    <section className="contact-section">
      {/* Background Effects */}
      <div className="bg-effect-1"></div>
      <div className="bg-effect-2"></div>
      <div className="bg-effect-3"></div>

      <div className="container">
        {/* Header */}
        <div className="header">
          <h2 className="main-title">React Out to us</h2>
          <p className="subtitle">
            Ready to transform your body and mind? Join our fitness community today. Get in touch for membership
            details, personal training, or any questions about our facilities.
          </p>
        </div>

        <div className="content-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <h3>
                <Dumbbell className="dumbbell-icon" />
                Get In Touch
              </h3>

              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon icon-phone">
                    <Phone />
                  </div>
                  <div className="contact-details">
                    <p>Call Us</p>
                    <p>+1 (555) FIT-NESS</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon icon-email">
                    <Mail />
                  </div>
                  <div className="contact-details">
                    <p>Email</p>
                    <p>info@powerfitgym.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon icon-location">
                    <MapPin />
                  </div>
                  <div className="contact-details">
                    <p>Location</p>
                    <p>123 Fitness Ave, Downtown</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon icon-hours">
                    <Clock />
                  </div>
                  <div className="contact-details">
                    <p>Hours</p>
                    <p>Mon-Fri: 5AM-11PM</p>
                    <p className="hours-weekend">Sat-Sun: 6AM-10PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gym Features */}
            <div className="features-card">
              <h4 className="features-title">
                <Trophy className="trophy-icon" />
                Why Choose Our Gym?
              </h4>
              <ul className="features-list">
                <li className="feature-item">
                  <div className="feature-dot dot-red"></div>
                  State-of-the-art Equipment
                </li>
                <li className="feature-item">
                  <div className="feature-dot dot-orange"></div>
                  Certified Personal Trainers
                </li>
                <li className="feature-item">
                  <div className="feature-dot dot-yellow"></div>
                  Group Fitness Classes
                </li>
                <li className="feature-item">
                  <div className="feature-dot dot-green"></div>
                  24/7 Access Available
                </li>
                <li className="feature-item">
                  <div className="feature-dot dot-blue"></div>
                  Nutrition Counseling
                </li>
                <li className="feature-item">
                  <div className="feature-dot dot-purple"></div>
                  Free Trial Week
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-card">
            <div className="form-header">
              <Users className="users-icon" />
              <h3 className="form-title">Join Our Community</h3>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="form-input"
                    required
                  />
                  <User className="input-icon" />
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="form-input"
                    required
                  />
                  <Mail className="input-icon" />
                </div>
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="form-input"
                />
                <Phone className="input-icon" />
              </div>

              <div className="input-group">
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Inquiry Type</option>
                  <option value="membership">Membership Information</option>
                  <option value="personal-training">Personal Training</option>
                  <option value="group-classes">Group Classes</option>
                  <option value="nutrition">Nutrition Counseling</option>
                  <option value="corporate">Corporate Membership</option>
                  <option value="other">Other</option>
                </select>
                <MessageSquare className="input-icon" />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your fitness goals or any questions you have..."
                rows={6}
                className="form-textarea"
                required
              ></textarea>

              <button type="submit" className="submit-btn">
                <span>Start Your Journey</span>
                <Send className="send-icon" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <div className="status-badge">
            <div className="status-dot"></div>
            <span className="status-text">Free consultation available - Book today!</span>
          </div>
          <p className="cta-text">🏋️ First week FREE for new members | 💪 No commitment required</p>
        </div>
      </div>
    </section>
  )
}
