
"use client"
import './OverviewSection.css'
import { 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Target, 
  Clock, 
  Flame, 
  User, 
  ChevronRight,
  Trophy,
  Heart,
  Activity
} from "lucide-react"


const OverviewSection = () => {
  // Mock data - this would come from your backend
  const workoutSummary = {
    lastWorkout: "Upper Body Strength",
    duration: "45 mins",
    caloriesBurned: 320,
    weeklyProgress: { completed: 3, total: 5 }
  }

  const upcomingSchedule = [
    { type: "Yoga Class", time: "6:00 PM", date: "Today", instructor: "Sarah M." },
    { type: "Personal Training", time: "7:30 AM", date: "Tomorrow", instructor: "Mike R." },
    { type: "HIIT Session", time: "5:00 PM", date: "Friday", instructor: "Alex K." }
  ]

  const fitnessProgress = {
    currentWeight: "75.2 kg",
    weightChange: "-2.3 kg",
    goalWeight: "70 kg",
    muscleGain: "+1.2 kg",
    fatLoss: "-3.5 kg"
  }

  const currentGoal = {
    title: "Lose 5kg in 2 months",
    progress: 46, // percentage
    daysRemaining: 32
  }

  const recentActivities = [
    { type: "Workout", name: "Upper Body Strength", date: "Today", duration: "45 min" },
    { type: "Class", name: "Morning Yoga", date: "Yesterday", duration: "60 min" },
    { type: "Cardio", name: "Treadmill Run", date: "2 days ago", duration: "30 min" }
  ]

  const motivationalTip = "You've completed 3 workouts this week. Keep the momentum going! 💪"

  return (
    <>
      {/* Header */}
      <div className="content-header">
        <h2 className="main-title">Your Fitness Dashboard</h2>
        <p className="main-subtitle">Track your progress and stay motivated!</p>
      </div>

      {/* Workout Summary */}
      <section className="dashboard-section workout-summary">
        <h3 className="section-title">
          <span className="section-emoji">💪</span>
          Last Workout Summary
        </h3>
        <div className="summary-card">
          <div className="summary-main">
            <div className="workout-info">
              <div className="workout-type">
                <Dumbbell className="icon" />
                <span>{workoutSummary.lastWorkout}</span>
              </div>
              <div className="workout-stats">
                <div className="stat-item">
                  <Clock className="stat-icon" />
                  <span>{workoutSummary.duration}</span>
                </div>
                <div className="stat-item">
                  <Flame className="stat-icon" />
                  <span>{workoutSummary.caloriesBurned} cal</span>
                </div>
              </div>
            </div>
            <div className="weekly-progress">
              <div className="progress-header">
                <span>Weekly Progress</span>
                <span>{workoutSummary.weeklyProgress.completed}/{workoutSummary.weeklyProgress.total}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(workoutSummary.weeklyProgress.completed / workoutSummary.weeklyProgress.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Schedule */}
      <section className="dashboard-section schedule-section">
        <h3 className="section-title">
          <span className="section-emoji">📅</span>
          Upcoming Schedule
        </h3>
        <div className="schedule-list">
          {upcomingSchedule.map((item, index) => (
            <div key={index} className="schedule-item" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="schedule-info">
                <div className="schedule-type">{item.type}</div>
                <div className="schedule-details">
                  <span className="time">{item.time}</span>
                  <span className="date">{item.date}</span>
                </div>
                <div className="instructor">with {item.instructor}</div>
              </div>
              <ChevronRight className="chevron-icon" />
            </div>
          ))}
        </div>
      </section>

      {/* Fitness Progress & Goal Tracker */}
      <div className="dashboard-row">
        <section className="dashboard-section progress-section">
          <h3 className="section-title">
            <span className="section-emoji">📊</span>
            Fitness Progress
          </h3>
          <div className="progress-grid">
            <div className="progress-item">
              <div className="progress-label">Current Weight</div>
              <div className="progress-value">{fitnessProgress.currentWeight}</div>
              <div className="progress-change negative">{fitnessProgress.weightChange}</div>
            </div>
            <div className="progress-item">
              <div className="progress-label">Muscle Gain</div>
              <div className="progress-value">{fitnessProgress.muscleGain}</div>
              <div className="progress-change positive">↗</div>
            </div>
            <div className="progress-item">
              <div className="progress-label">Fat Loss</div>
              <div className="progress-value">{fitnessProgress.fatLoss}</div>
              <div className="progress-change negative">↘</div>
            </div>
          </div>
        </section>

        <section className="dashboard-section goal-section">
          <h3 className="section-title">
            <span className="section-emoji">🎯</span>
            Current Goal
          </h3>
          <div className="goal-card">
            <div className="goal-title">{currentGoal.title}</div>
            <div className="goal-progress">
              <div className="goal-progress-bar">
                <div 
                  className="goal-progress-fill" 
                  style={{ width: `${currentGoal.progress}%` }}
                ></div>
              </div>
              <div className="goal-stats">
                <span className="goal-percentage">{currentGoal.progress}%</span>
                <span className="goal-days">{currentGoal.daysRemaining} days left</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Recent Activities */}
      <section className="dashboard-section activities-section">
        <h3 className="section-title">
          <span className="section-emoji">📝</span>
          Recent Activities
        </h3>
        <div className="activities-list">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="activity-icon">
                {activity.type === 'Workout' && <Dumbbell className="icon" />}
                {activity.type === 'Class' && <User className="icon" />}
                {activity.type === 'Cardio' && <Heart className="icon" />}
              </div>
              <div className="activity-info">
                <div className="activity-name">{activity.name}</div>
                <div className="activity-details">
                  <span>{activity.date}</span>
                  <span>•</span>
                  <span>{activity.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Motivational Tip */}
      <section className="dashboard-section motivation-section">
        <h3 className="section-title">
          <span className="section-emoji">🧠</span>
          Daily Motivation
        </h3>
        <div className="motivation-card">
          <div className="motivation-icon">
            <Trophy className="icon" />
          </div>
          <p className="motivation-text">{motivationalTip}</p>
        </div>
      </section>
    </>
  )
}

export default OverviewSection