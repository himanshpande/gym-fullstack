"use client"

import React, { useState } from "react"
import { Mail, Phone, MapPin, Send, User, MessageSquare, Clock, Dumbbell, Users, Trophy, Calendar, CreditCard, Star, CheckCircle, X } from "lucide-react"
import "./GymContactSection.css"

export default function GymContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    membershipPlan: "",
    membershipDuration: "",
    trainingType: "",
    experience: "",
    classType: "",
    schedule: "",
    nutritionGoal: "",
    dietaryRestrictions: "",
    corporateSize: "",
    corporateServices: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    // Client-side validation
    if (!formData.name || !formData.email || !formData.inquiryType || !formData.message) {
      setSubmitError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
      
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Show success message
        setShowThankYou(true)
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          inquiryType: "",
          membershipPlan: "",
          membershipDuration: "",
          trainingType: "",
          experience: "",
          classType: "",
          schedule: "",
          nutritionGoal: "",
          dietaryRestrictions: "",
          corporateSize: "",
          corporateServices: "",
          message: "",
        })
      } else {
        // Handle different error status codes
        if (response.status === 400) {
          setSubmitError(result.message || 'Please check your form data and try again')
        } else if (response.status === 500) {
          setSubmitError('Server error. Please try again later or contact us directly.')
        } else {
          setSubmitError(result.message || 'Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setSubmitError('Network error. Please check your internet connection and try again.')
      } else {
        setSubmitError('Failed to send message. Please try again or contact us directly at info@powerfitgym.com')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeThankYou = () => {
    setShowThankYou(false)
  }

  const renderDynamicOptions = () => {
    switch (formData.inquiryType) {
      case "membership":
        return (
          <div className="dynamic-options">
            <div className="form-row">
              <div className="input-group">
                <select
                  name="membershipPlan"
                  value={formData.membershipPlan}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Membership Plan</option>
                  <option value="basic">Basic - Gym Access Only</option>
                  <option value="premium">Premium - Gym + Classes</option>
                  <option value="vip">VIP - All Access + Personal Training</option>
                  <option value="student">Student Discount Plan</option>
                </select>
                <Star className="input-icon" />
              </div>

              <div className="input-group">
                <select
                  name="membershipDuration"
                  value={formData.membershipDuration}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="1-month">1 Month - $49/month</option>
                  <option value="3-month">3 Months - $39/month</option>
                  <option value="6-month">6 Months - $34/month</option>
                  <option value="12-month">12 Months - $29/month</option>
                </select>
                <Calendar className="input-icon" />
              </div>
            </div>
          </div>
        )

      case "personal-training":
        return (
          <div className="dynamic-options">
            <div className="form-row">
              <div className="input-group">
                <select
                  name="trainingType"
                  value={formData.trainingType}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Training Type</option>
                  <option value="weight-loss">Weight Loss Training</option>
                  <option value="muscle-gain">Muscle Building</option>
                  <option value="strength">Strength Training</option>
                  <option value="endurance">Endurance Training</option>
                  <option value="sports-specific">Sports Specific</option>
                  <option value="rehabilitation">Rehabilitation</option>
                </select>
                <Dumbbell className="input-icon" />
              </div>

              <div className="input-group">
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Your Experience Level</option>
                  <option value="beginner">Beginner (0-6 months)</option>
                  <option value="intermediate">Intermediate (6 months - 2 years)</option>
                  <option value="advanced">Advanced (2+ years)</option>
                </select>
                <Star className="input-icon" />
              </div>
            </div>
          </div>
        )

      case "group-classes":
        return (
          <div className="dynamic-options">
            <div className="form-row">
              <div className="input-group">
                <select
                  name="classType"
                  value={formData.classType}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Class Type</option>
                  <option value="yoga">Yoga Classes</option>
                  <option value="hiit">HIIT Training</option>
                  <option value="spinning">Spinning/Cycling</option>
                  <option value="zumba">Zumba Dance</option>
                  <option value="pilates">Pilates</option>
                  <option value="boxing">Boxing/Kickboxing</option>
                  <option value="crossfit">CrossFit</option>
                </select>
                <Users className="input-icon" />
              </div>

              <div className="input-group">
                <select
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Preferred Schedule</option>
                  <option value="morning">Morning (6AM - 10AM)</option>
                  <option value="midday">Midday (10AM - 2PM)</option>
                  <option value="afternoon">Afternoon (2PM - 6PM)</option>
                  <option value="evening">Evening (6PM - 10PM)</option>
                  <option value="weekend">Weekend Classes</option>
                </select>
                <Clock className="input-icon" />
              </div>
            </div>
          </div>
        )

      case "nutrition":
        return (
          <div className="dynamic-options">
            <div className="form-row">
              <div className="input-group">
                <select
                  name="nutritionGoal"
                  value={formData.nutritionGoal}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Your Goal</option>
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="maintenance">Weight Maintenance</option>
                  <option value="performance">Athletic Performance</option>
                  <option value="health">General Health</option>
                </select>
                <Star className="input-icon" />
              </div>

              <div className="input-group">
                <select
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Dietary Restrictions</option>
                  <option value="none">No Restrictions</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="gluten-free">Gluten-Free</option>
                  <option value="dairy-free">Dairy-Free</option>
                  <option value="other">Other (specify in message)</option>
                </select>
                <MessageSquare className="input-icon" />
              </div>
            </div>
          </div>
        )

      case "corporate":
        return (
          <div className="dynamic-options">
            <div className="form-row">
              <div className="input-group">
                <select
                  name="corporateSize"
                  value={formData.corporateSize}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Company Size</option>
                  <option value="small">Small (10-50 employees)</option>
                  <option value="medium">Medium (50-200 employees)</option>
                  <option value="large">Large (200-500 employees)</option>
                  <option value="enterprise">Enterprise (500+ employees)</option>
                </select>
                <Users className="input-icon" />
              </div>

              <div className="input-group">
                <select
                  name="corporateServices"
                  value={formData.corporateServices}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Services Interested</option>
                  <option value="membership">Corporate Memberships</option>
                  <option value="wellness">Wellness Programs</option>
                  <option value="onsite">On-site Training</option>
                  <option value="events">Corporate Events</option>
                  <option value="full-package">Full Wellness Package</option>
                </select>
                <CreditCard className="input-icon" />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="gym-contact-section">
      <div className="background-effects">
        <div className="bg-gradient-top"></div>
        <div className="bg-blur-left"></div>
        <div className="bg-blur-right"></div>
      </div>

      <div className="container">
        <div className="header">
          <h2 className="main-title">Reach Out to us</h2>
          <p className="main-subtitle">
            Ready to transform your body and mind? Join our fitness community today. Get in touch for membership
            details, personal training, or any questions about our facilities.
          </p>
        </div>

        <div className="content-grid">
          <div className="contact-info">
            <div className="contact-card">
              <h3 className="contact-title">
                <Dumbbell className="title-icon" />
                Get In Touch
              </h3>

              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon phone-icon">
                    <Phone />
                  </div>
                  <div className="contact-details">
                    <p className="contact-label">Call Us</p>
                    <p className="contact-value">+1 (555) FIT-NESS</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon email-icon">
                    <Mail />
                  </div>
                  <div className="contact-details">
                    <p className="contact-label">Email</p>
                    <p className="contact-value">info@powerfitgym.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon location-icon">
                    <MapPin />
                  </div>
                  <div className="contact-details">
                    <p className="contact-label">Location</p>
                    <p className="contact-value">123 Fitness Ave, Downtown</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon hours-icon">
                    <Clock />
                  </div>
                  <div className="contact-details">
                    <p className="contact-label">Hours</p>
                    <p className="contact-value">Mon-Fri: 5AM-11PM</p>
                    <p className="contact-hours-extra">Sat-Sun: 6AM-10PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-card">
              <h4 className="features-title">
                <Trophy className="features-icon" />
                Why Choose Our Gym?
              </h4>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-dot feature-dot-red"></div>
                  State-of-the-art Equipment
                </div>
                <div className="feature-item">
                  <div className="feature-dot feature-dot-orange"></div>
                  Certified Personal Trainers
                </div>
                <div className="feature-item">
                  <div className="feature-dot feature-dot-yellow"></div>
                  Group Fitness Classes
                </div>
                <div className="feature-item">
                  <div className="feature-dot feature-dot-green"></div>
                  24/7 Access Available
                </div>
                <div className="feature-item">
                  <div className="feature-dot feature-dot-blue"></div>
                  Nutrition Counseling
                </div>
                <div className="feature-item">
                  <div className="feature-dot feature-dot-purple"></div>
                  Free Trial Week
                </div>
              </div>
            </div>
          </div>

          <div className="form-container">
            <div className="form-header">
              <Users className="form-header-icon" />
              <h3 className="form-title">Join Our Community</h3>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
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

              {renderDynamicOptions()}

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your fitness goals or any questions you have..."
                rows={6}
                className="form-textarea"
                required
              />

              {submitError && (
                <div className="error-message">
                  {submitError}
                </div>
              )}

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Contact Us'}</span>
                <Send className="submit-icon" />
              </button>
            </form>
          </div>
        </div>

        <div className="bottom-cta">
          <div className="cta-badge">
            <div className="cta-pulse"></div>
            <span>Free consultation available - Book today!</span>
          </div>
          <p className="cta-text">
            🏋️ First week FREE for new members | 💪 No commitment required
          </p>
        </div>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="thank-you-overlay">
          <div className="thank-you-modal">
            <button className="close-button" onClick={closeThankYou}>
              <X />
            </button>
            
            <CheckCircle className="thank-you-icon" />
            
            <h3 className="thank-you-title">Thank You!</h3>
            
            <p className="thank-you-message">
              Thank you for reaching out to us! We've received your inquiry and will get back to you within 24 hours.
            </p>
            
            <div className="thank-you-details">
              <h4>What's Next?</h4>
              <p>📧 Check your email for a confirmation message</p>
              <p>📞 Our team will contact you within 24 hours</p>
              <p>🎯 We'll help you achieve your fitness goals</p>
            </div>
            
            <button className="submit-button" onClick={closeThankYou}>
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}