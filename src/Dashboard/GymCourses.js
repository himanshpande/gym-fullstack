"use client"

import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { ShoppingCart, Plus, X, CreditCard, Dumbbell, Heart, Zap, Target, Star, Users, Clock } from "lucide-react"
import CourseDetailsModal from "./course-details-modal.jsx"
import "./GymCourses.css"

const GymCourses = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const [cart, setCart] = useState([])
  const [showCartSidebar, setShowCartSidebar] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showCourseDetails, setShowCourseDetails] = useState(false)

  const courses = [
    {
      id: 1,
      
      name: "Strength Training Mastery",
      description:
        "Master the fundamentals of strength training with progressive overload techniques and proper form guidance.",
      price: "1199",
      originalPrice: "1499",
      image: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2022/11/Strength-training-programs.jpg",
      category: "Strength",
      duration: "8 weeks",
      level: "Intermediate",
      icon: Dumbbell,
      popular: true,
      rating: 4.8,
      students: 2847,
      lessons: 37,
    },
    {
      id: 2,
      name: "Cardio Blast Revolution",
      description: "High-energy cardiovascular workouts designed to maximize calorie burn and improve endurance.",
      price: "1099",
      originalPrice: "1299",
      image: "https://tse1.mm.bing.net/th/id/OIP.LXfQEBUswD7U0kg0LSZFvQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Cardio",
      duration: "6 weeks",
      level: "Beginner",
      icon: Heart,
      popular: false,
      rating: 4.6,
      students: 1923,
      lessons: 28,
    },
    {
      id: 3,
      name: "Yoga Flex & Flow",
      description: "Enhance flexibility, balance, and mindfulness through guided yoga sequences and meditation.",
      price: "999",
      originalPrice: "1199",
      image: "https://tse3.mm.bing.net/th/id/OIP.ZDhQ-l86diIDptrm7AQ8-gHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Flexibility",
      duration: "4 weeks",
      level: "All Levels",
      icon: Target,
      popular: false,
      rating: 4.9,
      students: 3421,
      lessons: 24,
    },
    {
      id: 4,
      name: "HIIT Challenge Elite",
      description: "https://tse2.mm.bing.net/th/id/OIP.mijMSBX2fxIbSYqZtEXtUQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      price: "1299",
      originalPrice: "1599",
      image: "https://tse2.mm.bing.net/th/id/OIP.mijMSBX2fxIbSYqZtEXtUQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "HIIT",
      duration: "6 weeks",
      level: "Advanced",
      icon: Zap,
      popular: true,
      rating: 4.7,
      students: 2156,
      lessons: 32,
    },
    {
      id: 5,
      name: "Bodyweight Warrior",
      description: "Master bodyweight movements and calisthenics without any equipment needed.",
      price: "1099",
      originalPrice: "1299",
      image: "https://fitguide.blog/wp-content/uploads/2021/06/bodyweight4.jpg",
      category: "Bodyweight",
      duration: "8 weeks",
      level: "Beginner",
      icon: Target,
      popular: false,
      rating: 4.5,
      students: 1687,
      lessons: 35,
    },
    {
      id: 6,
      name: "Functional Fitness Pro",
      description: "Develop real-world strength and movement patterns for everyday activities and sports.",
      price: "1199",
      originalPrice: "1399",
      image: "https://th.bing.com/th/id/OIP.KeefD2oSLRZIpH18HYIzVQHaD7?w=301&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      category: "Functional",
      duration: "10 weeks",
      level: "Intermediate",
      icon: Dumbbell,
      popular: false,
      rating: 4.6,
      students: 1834,
      lessons: 42,
    },
    {
      id: 7,
      name: "Core Crusher Academy",
      description: "Sculpt a powerful core with targeted exercises for strength, stability, and definition.",
      price: "999",
      originalPrice: "1199",
      image: "https://images.herzindagi.info/image/2022/May/fun-cardio-workout.jpg",
      category: "Core",
      duration: "6 weeks",
      level: "All Levels",
      icon: Target,
      popular: false,
      rating: 4.4,
      students: 2234,
      lessons: 26,
    },
    {
      id: 8,
      name: "Kickboxing Powerhouse",
      description: "Combine martial arts techniques with high-intensity cardio for total body conditioning.",
      price: "1399",
      originalPrice: "1699",
      image: "https://tse1.mm.bing.net/th/id/OIP.OtiMZ24pN6HxN0nA5e-MpwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Martial Arts",
      duration: "8 weeks",
      level: "Intermediate",
      icon: Zap,
      popular: true,
      rating: 4.8,
      students: 1567,
      lessons: 38,
    },
    {
      id: 9,
      name: "Pilates Flow Mastery",
      description: "Improve posture, flexibility, and core strength through controlled Pilates movements.",
      price: "1099",
      originalPrice: "1299",
      image: "https://th.bing.com/th/id/OSK.HEROJ14zoBlRI9SJLFTqS6dUiimm01UbJEfxGCrJ7YdRNAM?w=472&h=280&c=1&rs=2&o=6&dpr=1.3&pid=SANGAM",
      category: "Pilates",
      duration: "6 weeks",
      level: "Beginner",
      icon: Heart,
      popular: false,
      rating: 4.7,
      students: 2891,
      lessons: 30,
    },
    {
      id: 10,
      name: "Strength Circuit Elite",
      description: "Advanced circuit training combining strength and conditioning for maximum results.",
      price: "1299",
      originalPrice: "1599",
      image: "https://fitguide.blog/wp-content/uploads/2021/06/bodyweight4.jpg",
      category: "Circuit",
      duration: "8 weeks",
      level: "Advanced",
      icon: Dumbbell,
      popular: false,
      rating: 4.6,
      students: 1423,
      lessons: 36,
    },
    {
      id: 11,
      name: "Mobility Mastery Pro",
      description: "Enhance joint health, flexibility, and movement quality for peak performance.",
      price: "999",
      originalPrice: "1199",
      image: "https://i.ytimg.com/vi/ecqbzlc1qqQ/oar2.jpg",
      category: "Mobility",
      duration: "4 weeks",
      level: "All Levels",
      icon: Target,
      popular: false,
      rating: 4.5,
      students: 1789,
      lessons: 22,
    },
    {
      id: 12,
      name: "Endurance Ride Pro",
      description: "Build cardiovascular endurance and leg strength through structured cycling workouts.",
      price: "1199",
      originalPrice: "1399",
      image: "https://th.bing.com/th/id/OIP.TGLcVBfd48R7sVI-s-RmHAHaEp?w=310&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      category: "Cycling",
      duration: "6 weeks",
      level: "Intermediate",
      icon: Heart,
      popular: false,
      rating: 4.4,
      students: 1345,
      lessons: 28,
    },
  ]

  const addToCart = (course) => {
    if (!cart.find((item) => item.id === course.id)) {
      setCart((prev) => [...prev, course])
    }
    setShowCartSidebar(true)
  }

  const removeFromCart = (courseId) => {
    setCart((prev) => prev.filter((item) => item.id !== courseId))
  }

  const closeCart = () => setShowCartSidebar(false)

  const handleBuy = () => {
    alert("Thank you for your purchase!")
    setCart([])
    setShowCartSidebar(false)
  }

  const openCourseDetails = (course) => {
    setSelectedCourse(course)
    setShowCourseDetails(true)
  }

  const closeCourseDetails = () => {
    setShowCourseDetails(false)
    setSelectedCourse(null)
  }

  const total = cart.reduce((sum, item) => {
    const price = Number.parseInt(item.price)
    return sum + (isNaN(price) ? 0 : price)
  }, 0)

  const cartItemCount = cart.length

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={i < Math.floor(rating) ? "star-filled" : "star-empty"} size={12} />
    ))
  }

  return (
    <div className="gym-container">
      {/* Header Section */}
      <div className="header-section" data-aos="fade-down">
        <div className="premium-badge">
          <Dumbbell size={16} />
          Premium Fitness Programs
        </div>
        <h1 className="main-title">Transform Your Body</h1>

        <p className="main-subtitle">
          Choose from our expertly designed fitness courses and start your journey to a stronger, healthier you.
        </p>
      </div>

      {/* Cart Button */}
      <button className="cart-button" onClick={() => setShowCartSidebar(true)}>
        <ShoppingCart size={20} />
        Cart
        {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
      </button>

      {/* Cart Sidebar */}
      {showCartSidebar && (
        <div className="cart-overlay" onClick={closeCart}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>
                <ShoppingCart size={20} />
                Your Cart ({cartItemCount} items)
              </h3>
              <button className="close-btn" onClick={closeCart}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-content">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingCart size={64} />
                  <p>Your cart is empty</p>
                  <small>Add some courses to get started!</small>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} />
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p>
                            {item.category} • {item.duration}
                          </p>
                          <span className="price">₹{item.price}</span>
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Total: ₹{total}</span>
                    </div>
                    <button className="checkout-btn" onClick={handleBuy}>
                      <CreditCard size={20} />
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="courses-grid">
        {courses.map((course, idx) => {
          const IconComponent = course.icon
          const isInCart = cart.find((item) => item.id === course.id)

          return (
            <div key={course.id} className="course-card" data-aos="zoom-in-up" data-aos-delay={idx * 80}>
              <div className="course-image">
                {course.popular && <span className="popular-badge">🔥 Popular</span>}
                <img src={course.image || "/placeholder.svg"} alt={course.name} />
              </div>

              <div className="course-content">
                <div className="course-header">
                  <div className="course-icon">
                    <IconComponent size={16} />
                  </div>
                  <span className="course-category">{course.category}</span>
                </div>

                <h3 className="course-title" onClick={() => openCourseDetails(course)}>
                  {course.name}
                </h3>
                <p className="course-description">{course.description}</p>

                <div className="course-meta">
                  <div className="course-stats">
                    <span>
                      <Clock size={12} />
                      {course.duration}
                    </span>
                    <span>
                      <Users size={12} />
                      {course.students.toLocaleString()}
                    </span>
                  </div>

                  <div className="course-rating">
                    {renderStars(course.rating)}
                    <span>({course.rating})</span>
                  </div>
                </div>

                <div className="course-pricing">
                  <span className="current-price">₹{course.price}</span>
                  <span className="original-price">₹{course.originalPrice}</span>
                  <span className="savings">
                    Save ₹{Number.parseInt(course.originalPrice) - Number.parseInt(course.price)}
                  </span>
                </div>

                <button
                  className={`add-to-cart-btn ${isInCart ? "added" : ""}`}
                  onClick={() => openCourseDetails(course)}
                  disabled={isInCart}
                >
                  {isInCart ? (
                    <>
                      <ShoppingCart size={16} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          isOpen={showCourseDetails}
          onClose={closeCourseDetails}
          onAddToCart={addToCart}
          isInCart={cart.find((item) => item.id === selectedCourse.id)}
        />
      )}
    </div>
  )
}

export default GymCourses