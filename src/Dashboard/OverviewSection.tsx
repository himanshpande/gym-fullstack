import React, { useState, useEffect } from 'react';
import { Calendar, X, CheckCircle, Clock, User } from 'lucide-react';
import './OverviewSection.css';
import apiService from '../services/api';
import WorkoutHistory from './WorkoutHistory.tsx';

// Add a type for scheduled workouts
interface ScheduledWorkout {
  _id: string;
  userId: string;
  type: string;
  trainer: string;
  dateTime: string;
  category: string;
  duration: number;
  createdAt: string;
}

type UserStats = {
  week: {
    workoutsPlanned: number;
  };
  month: {
    workoutsDone: number;
    totalTime: string;
  };
};

declare global {
  interface Window {
    refreshOverview?: () => void;
  }
}

const OverviewSection = ({ userId }: { userId: string }) => {
  console.log('OverviewSection userId:', userId); 
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  
  const fetchUserStats = async () => {
    try {
      const stats = await apiService.getUserStats(userId);
      console.log('User Stats:', stats);
      setUserStats(stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchUserStats();
    window.refreshOverview = fetchUserStats;
  }, [userId]);

  if (loadingStats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="overview-section">
      <h2>Weekly & Monthly Stats</h2>
      <div>
        <p>🗓️ Workouts Planned This Week: {userStats?.week.workoutsPlanned ?? 'N/A'}</p>
        <p> Workouts Done This Month: {userStats?.month.workoutsDone ?? 'N/A' }</p>
        <p>⏱️ Total Time Spent This Month: {userStats?.month.totalTime ?? 'N/A' } hrs</p>
      </div>
    </div>
  );
};

// Mini Overview Component
const MiniOverview = ({ userId }: { userId: string }) => {
  const [scheduledWorkouts, setScheduledWorkouts] = useState<ScheduledWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchScheduledWorkouts = async () => {
    try {
      const data = await apiService.getScheduledWorkouts(userId);
      setScheduledWorkouts(data);
    } catch (error) {
      console.error('Error fetching scheduled workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledWorkouts();
    window.refreshOverview = fetchScheduledWorkouts;
  }, [userId]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
    
    let dateLabel = date.toLocaleDateString();
    if (isToday) dateLabel = 'Today';
    else if (isTomorrow) dateLabel = 'Tomorrow';
    
    return `${dateLabel} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  const getTimeUntilWorkout = (dateString: string) => {
    const workoutDate = new Date(dateString);
    const now = new Date();
    const diff = workoutDate.getTime() - now.getTime();
    
    if (diff < 0) return 'Past due';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `In ${days} day${days > 1 ? 's' : ''}`;
    }
    
    if (hours > 0) {
      return `In ${hours}h ${minutes}m`;
    }
    
    return `In ${minutes}m`;
  };

  const handleCancel = async (scheduleId: string) => {
    try {
      await apiService.cancelScheduledWorkout(scheduleId);
      setScheduledWorkouts((prev) =>
        prev.filter((workout) => workout._id !== scheduleId)
      );
    } catch (error) {
      console.error('Error cancelling workout:', error);
      alert('Failed to cancel workout');
    }
  };

  if (loading) {
    return (
      <div className="overview-card">
        <div className="loading-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-content">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overview-card">
      <div className="overview-header">
        <h3 className="overview-title">Scheduled Workouts</h3>
        <Calendar className="overview-icon" />
      </div>
      
      {scheduledWorkouts.length > 0 ? (
        <div className="scheduled-workouts">
          {scheduledWorkouts.map((workout) => (
            <div key={workout._id} className="scheduled-workout-item">
              <div className="workout-content">
                <div className="workout-header">
                  <h4 className="workout-name">{workout.type}</h4>
                  <span className="workout-category">{workout.category}</span>
                </div>
                <div className="workout-meta">
                  <div className="meta-item">
                    <Clock className="meta-icon" />
                    {formatDateTime(workout.dateTime)}
                  </div>
                  <div className="meta-item">
                    <User className="meta-icon" />
                    {workout.trainer}
                  </div>
                </div>
              </div>
              <div className="workout-duration">
                <div className="duration-text">{workout.duration} min</div>
                <div className="time-until">{getTimeUntilWorkout(workout.dateTime)}</div>
                <button 
                  onClick={() => handleCancel(workout._id.toString())} 
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Calendar className="empty-icon" />
          <p className="empty-title">No scheduled workouts</p>
          <p className="empty-subtitle">Schedule a workout to get started!</p>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const userId = 'user123';

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo">
              <h1 className="logo-text">PulseForge</h1>
            </div>
            <div className="user-info">
              <div className="user-avatar">
                <User className="user-icon" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="dashboard-container">
          <div className="dashboard-content">
            <OverviewSection userId={userId} />
            <MiniOverview userId={userId} />
            <WorkoutHistory userId={userId} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;