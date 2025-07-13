"use client"

import { useState, useEffect } from "react"
import { X, Star, Clock, Users, Trophy, Play, CheckCircle, Plus, ShoppingCart } from "lucide-react"
import "./course-details-modal.css"

const CourseDetailsModal = ({ course, isOpen, onClose, onAddToCart, isInCart }) => {
  const [activeTab, setActiveTab] = useState("overview")

  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"

      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  // Mock detailed course data
  const courseDetails = {
    instructor: {
      name: "Sarah Johnson",
      title: "Certified Personal Trainer & Nutritionist",
      experience: "8+ years",
      avatar: "https://source.unsplash.com/60x60/?trainer,woman",
      bio: "Sarah is a certified personal trainer with over 8 years of experience helping clients achieve their fitness goals. She specializes in strength training and functional fitness.",
      credentials: ["NASM-CPT", "Precision Nutrition", "FMS Level 2"],
    },
    curriculum: [
      { week: 1, title: "Foundation & Assessment", lessons: 5, duration: "45 min" },
      { week: 2, title: "Building Strength Basics", lessons: 6, duration: "50 min" },
      { week: 3, title: "Progressive Overload", lessons: 7, duration: "55 min" },
      { week: 4, title: "Advanced Techniques", lessons: 6, duration: "60 min" },
      { week: 5, title: "Peak Performance", lessons: 8, duration: "65 min" },
      { week: 6, title: "Maintenance & Beyond", lessons: 5, duration: "40 min" },
    ],
    stats: {
      totalStudents: 2847,
      averageRating: 4.8,
      totalReviews: 342,
      completionRate: 89,
      totalLessons: 37,
      totalDuration: "6.5 hours",
    },
    reviews: [
      {
        id: 1,
        name: "Mike Chen",
        avatar: "https://source.unsplash.com/40x40/?man,fitness",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Absolutely incredible program! Sarah's guidance helped me gain 15lbs of muscle in just 8 weeks. The progressive structure is perfect for beginners and intermediates alike.",
        verified: true,
      },
      {
        id: 2,
        name: "Emma Rodriguez",
        avatar: "https://source.unsplash.com/40x40/?woman,gym",
        rating: 5,
        date: "1 month ago",
        comment:
          "Best investment I've made for my fitness journey. The form corrections and technique tips are invaluable. Highly recommend!",
        verified: true,
      },
      {
        id: 3,
        name: "David Kumar",
        avatar: "https://source.unsplash.com/40x40/?man,workout",
        rating: 4,
        date: "3 weeks ago",
        comment: "Great program with solid fundamentals. Would love to see more advanced variations in future updates.",
        verified: true,
      },
      {
        id: 4,
        name: "Lisa Thompson",
        avatar: "https://source.unsplash.com/40x40/?woman,fitness",
        rating: 5,
        date: "1 week ago",
        comment:
          "Sarah's teaching style is amazing. She breaks down complex movements into easy-to-understand steps. My confidence in the gym has skyrocketed!",
        verified: true,
      },
    ],
    features: [
      "Lifetime access to all course materials",
      "Mobile app compatibility",
      "Progress tracking and analytics",
      "Community forum access",
      "Monthly live Q&A sessions",
      "Downloadable workout plans",
      "Nutrition guide included",
      "30-day money-back guarantee",
    ],
  }

  const IconComponent = course.icon

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={i < rating ? "star-filled" : "star-empty"} size={16} />
    ))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{course.name}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-left">
            <div className="course-image-large">
              <img src={course.image || "/placeholder.svg"} alt={course.name} />
              <div className="course-badge">
                <div className="course-icon-large">
                  <IconComponent size={20} />
                </div>
                <span className="course-category-large">{course.category}</span>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-label">Rating</span>
                <div className="stat-value">
                  {renderStars(courseDetails.stats.averageRating)}
                  <span>({courseDetails.stats.totalReviews})</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-label">Students</span>
                <span className="stat-value">{courseDetails.stats.totalStudents.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Duration</span>
                <span className="stat-value">{course.duration}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Level</span>
                <span className="stat-value">{course.level}</span>
              </div>
            </div>

            <div className="pricing-section">
              <div className="pricing-info">
                <span className="current-price-large">₹{course.price}</span>
                <span className="original-price-large">₹{course.originalPrice}</span>
              </div>
              <div className="savings-badge">
                Save ₹{Number.parseInt(course.originalPrice) - Number.parseInt(course.price)}
              </div>
              <button
                className={`add-to-cart-btn-large ${isInCart ? "added" : ""}`}
                onClick={() => onAddToCart(course)}
                disabled={isInCart}
              >
                {isInCart ? (
                  <>
                    <ShoppingCart size={20} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="modal-right">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`tab ${activeTab === "curriculum" ? "active" : ""}`}
                onClick={() => setActiveTab("curriculum")}
              >
                Curriculum
              </button>
              <button
                className={`tab ${activeTab === "instructor" ? "active" : ""}`}
                onClick={() => setActiveTab("instructor")}
              >
                Instructor
              </button>
              <button
                className={`tab ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "overview" && (
                <div className="overview-content">
                  <div className="section">
                    <h3>Course Description</h3>
                    <p>
                      {course.description} This comprehensive program is designed to help you build strength, improve
                      your fitness level, and develop healthy habits that last a lifetime. Whether you're a beginner or
                      looking to take your fitness to the next level, this course provides structured guidance and
                      expert instruction.
                    </p>
                  </div>

                  <div className="section">
                    <h3>What You'll Get</h3>
                    <div className="features-grid">
                      {courseDetails.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <CheckCircle size={16} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="stats-grid">
                    <div className="stat-card">
                      <Users size={24} />
                      <div>
                        <span className="stat-number">{courseDetails.stats.totalStudents.toLocaleString()}</span>
                        <span className="stat-label">Students</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <Trophy size={24} />
                      <div>
                        <span className="stat-number">{courseDetails.stats.completionRate}%</span>
                        <span className="stat-label">Completion</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "curriculum" && (
                <div className="curriculum-content">
                  <h3>Course Curriculum</h3>
                  <div className="curriculum-list">
                    {courseDetails.curriculum.map((week, index) => (
                      <div key={index} className="curriculum-item">
                        <div className="curriculum-header">
                          <h4>
                            Week {week.week}: {week.title}
                          </h4>
                          <span className="lessons-badge">{week.lessons} lessons</span>
                        </div>
                        <div className="curriculum-meta">
                          <span>
                            <Clock size={16} />
                            {week.duration}
                          </span>
                          <span>
                            <Play size={16} />
                            {week.lessons} videos
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "instructor" && (
                <div className="instructor-content">
                  <div className="instructor-card">
                    <div className="instructor-header">
                      <img
                        src={courseDetails.instructor.avatar || "/placeholder.svg"}
                        alt={courseDetails.instructor.name}
                      />
                      <div>
                        <h3>{courseDetails.instructor.name}</h3>
                        <p className="instructor-title">{courseDetails.instructor.title}</p>
                        <p className="instructor-experience">{courseDetails.instructor.experience} experience</p>
                      </div>
                    </div>

                    <p className="instructor-bio">{courseDetails.instructor.bio}</p>

                    <div className="credentials">
                      <h4>Certifications</h4>
                      <div className="credentials-list">
                        {courseDetails.instructor.credentials.map((cert, index) => (
                          <span key={index} className="credential-badge">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="reviews-content">
                  <div className="reviews-header">
                    <h3>Student Reviews</h3>
                    <div className="reviews-summary">
                      {renderStars(courseDetails.stats.averageRating)}
                      <span className="rating-number">{courseDetails.stats.averageRating}</span>
                      <span className="reviews-count">({courseDetails.stats.totalReviews} reviews)</span>
                    </div>
                  </div>

                  <div className="reviews-list">
                    {courseDetails.reviews.map((review) => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <img src={review.avatar || "/placeholder.svg"} alt={review.name} />
                          <div>
                            <div className="reviewer-info">
                              <span className="reviewer-name">{review.name}</span>
                              {review.verified && <span className="verified-badge">Verified</span>}
                            </div>
                            <div className="review-meta">
                              {renderStars(review.rating)}
                              <span className="review-date">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsModal