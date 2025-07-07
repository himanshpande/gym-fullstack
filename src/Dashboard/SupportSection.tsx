"use client"

import {
  MessageCircle,
  Phone,
  Mail,
  Book,
  Video,
  FileText,
  Search,
  Clock,
  CheckCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { useState } from "react"

const SupportSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      color: "blue-cyan",
      status: "Available",
      responseTime: "< 2 minutes",
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      icon: Phone,
      color: "green-emerald",
      status: "Available",
      responseTime: "< 5 minutes",
      phone: "+1 (555) 123-HELP",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      color: "purple-indigo",
      status: "Available",
      responseTime: "< 24 hours",
      email: "support@example.com",
    },
  ]

  const helpCategories = [
    { id: "account", label: "Account & Billing", icon: "💳" },
    { id: "technical", label: "Technical Issues", icon: "🔧" },
    { id: "features", label: "Features & Usage", icon: "⚡" },
    { id: "privacy", label: "Privacy & Security", icon: "🔒" },
    { id: "other", label: "Other", icon: "❓" },
  ]

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking 'Forgot Password' on the login page.",
      category: "account",
      helpful: 24,
      notHelpful: 2,
    },
    {
      question: "How do I cancel my subscription?",
      answer: "Go to Settings > Account > Subscription and click 'Cancel Subscription'.",
      category: "account",
      helpful: 18,
      notHelpful: 1,
    },
    {
      question: "Why is the app running slowly?",
      answer: "Try clearing your browser cache or updating to the latest version.",
      category: "technical",
      helpful: 15,
      notHelpful: 3,
    },
    {
      question: "How do I export my data?",
      answer: "Navigate to Settings > Account Actions > Export Data to download your information.",
      category: "features",
      helpful: 12,
      notHelpful: 0,
    },
  ]

  const recentTickets = [
    {
      id: "#12345",
      subject: "Login issues with mobile app",
      status: "resolved",
      date: "2 days ago",
      priority: "high",
    },
    {
      id: "#12344",
      subject: "Billing question about subscription",
      status: "in-progress",
      date: "5 days ago",
      priority: "medium",
    },
    {
      id: "#12343",
      subject: "Feature request for dark mode",
      status: "closed",
      date: "1 week ago",
      priority: "low",
    },
  ]

  const resources = [
    {
      title: "User Guide",
      description: "Complete guide to using our platform",
      icon: Book,
      color: "blue-cyan",
      type: "documentation",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video instructions",
      icon: Video,
      color: "red-pink",
      type: "video",
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      icon: FileText,
      color: "green-emerald",
      type: "documentation",
    },
  ]

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      {/* Header */}
      <div className="content-header">
        <h2 className="main-title">Support Center</h2>
        <p className="main-subtitle">Get help and find answers to your questions.</p>
      </div>

      {/* Support Options */}
      <section className="dashboard-section support-options-section">
        <h3 className="section-title">
          <span className="section-emoji">🆘</span>
          Contact Support
        </h3>
        <div className="support-grid">
          {supportOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <div key={index} className="support-card" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`support-icon ${option.color}`}>
                  <Icon className="icon" />
                </div>
                <div className="support-content">
                  <h4 className="support-title">{option.title}</h4>
                  <p className="support-description">{option.description}</p>
                  <div className="support-meta">
                    <span className="support-status">
                      <CheckCircle className="status-icon" />
                      {option.status}
                    </span>
                    <span className="support-time">
                      <Clock className="time-icon" />
                      {option.responseTime}
                    </span>
                  </div>
                  {option.phone && <p className="contact-info">📞 {option.phone}</p>}
                  {option.email && <p className="contact-info">✉️ {option.email}</p>}
                </div>
                <button className="support-button">Contact Now</button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="dashboard-section contact-form-section">
        <h3 className="section-title">
          <span className="section-emoji">📝</span>
          Send us a Message
        </h3>
        <div className="contact-form-card">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {helpCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-select">
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input type="text" className="form-input" placeholder="Brief description of your issue" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-textarea"
              rows={6}
              placeholder="Please describe your issue in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="submit-button">
            <Send className="button-icon" />
            Send Message
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="dashboard-section faq-section">
        <h3 className="section-title">
          <span className="section-emoji">❓</span>
          Frequently Asked Questions
        </h3>
        <div className="search-container">
          <div className="search-input-container">
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="faq-grid">
          {filteredFAQ.map((faq, index) => (
            <div key={index} className="faq-card" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="faq-content">
                <h4 className="faq-question">{faq.question}</h4>
                <p className="faq-answer">{faq.answer}</p>
              </div>
              <div className="faq-actions">
                <span className="faq-helpful">Was this helpful?</span>
                <div className="faq-buttons">
                  <button className="faq-button helpful">
                    <ThumbsUp className="button-icon-small" />
                    {faq.helpful}
                  </button>
                  <button className="faq-button not-helpful">
                    <ThumbsDown className="button-icon-small" />
                    {faq.notHelpful}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Tickets */}
      <section className="dashboard-section tickets-section">
        <h3 className="section-title">
          <span className="section-emoji">🎫</span>
          Your Recent Tickets
        </h3>
        <div className="tickets-grid">
          {recentTickets.map((ticket, index) => (
            <div key={ticket.id} className="ticket-card" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="ticket-header">
                <span className="ticket-id">{ticket.id}</span>
                <span className={`ticket-status ${ticket.status}`}>
                  {ticket.status === "resolved" && <CheckCircle className="status-icon-small" />}
                  {ticket.status === "in-progress" && <Clock className="status-icon-small" />}
                  {ticket.status === "closed" && <CheckCircle className="status-icon-small" />}
                  {ticket.status.replace("-", " ")}
                </span>
              </div>
              <h4 className="ticket-subject">{ticket.subject}</h4>
              <div className="ticket-meta">
                <span className="ticket-date">{ticket.date}</span>
                <span className={`ticket-priority ${ticket.priority}`}>
                  {ticket.priority === "high" && "🔴"}
                  {ticket.priority === "medium" && "🟡"}
                  {ticket.priority === "low" && "🟢"}
                  {ticket.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="dashboard-section resources-section">
        <h3 className="section-title">
          <span className="section-emoji">📚</span>
          Help Resources
        </h3>
        <div className="resources-grid">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <div key={index} className="resource-card" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`resource-icon ${resource.color}`}>
                  <Icon className="icon" />
                </div>
                <div className="resource-content">
                  <h4 className="resource-title">{resource.title}</h4>
                  <p className="resource-description">{resource.description}</p>
                </div>
                <button className="resource-button">View Resource</button>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default SupportSection
