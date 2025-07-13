"use client"

import React, { useState } from "react"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react"
import "./footer.css"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3>PowerFit Gym</h3>
            <p>
              Transform your body and mind at PowerFit Gym. We provide state-of-the-art equipment, expert trainers, and
              a supportive community to help you achieve your fitness goals.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook />  
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <Youtube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#membership">Membership Plans</a>
              </li>
              <li>
                <a href="#classes">Group Classes</a>
              </li>
              <li>
                <a href="#trainers">Personal Training</a>
              </li>
              <li>
                <a href="#nutrition">Nutrition Plans</a>
              </li>
              <li>
                <a href="#facilities">Facilities</a>
              </li>
              <li>
                <a href="#blog">Fitness Blog</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li>
                <a href="#cardio">Cardio Training</a>
              </li>
              <li>
                <a href="#strength">Strength Training</a>
              </li>
              <li>
                <a href="#yoga">Yoga Classes</a>
              </li>
              <li>
                <a href="#crossfit">CrossFit</a>
              </li>
              <li>
                <a href="#swimming">Swimming Pool</a>
              </li>
              <li>
                <a href="#spa">Spa & Recovery</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Get In Touch</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin />
                <span>123 Fitness Ave, Downtown, NY 10001</span>
              </div>
              <div className="contact-item">
                <Phone />
                <span>+1 (555) FIT-NESS</span>
              </div>
              <div className="contact-item">
                <Mail />
                <span>info@powerfitgym.com</span>
              </div>
              <div className="contact-item">
                <Clock />
                <span>Mon-Fri: 5AM-11PM | Sat-Sun: 6AM-10PM</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="newsletter">
              <h4 style={{ color: "#00d8ff", marginTop: "25px", marginBottom: "15px" }}>Stay Updated</h4>
              <p style={{ fontSize: "14px", marginBottom: "15px" }}>
                Get fitness tips and gym updates delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2024 PowerFit Gym. All rights reserved.</p>
            </div>
            <ul className="footer-bottom-links">
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
              <li>
                <a href="#cookies">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 