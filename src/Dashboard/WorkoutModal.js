import React, { useState } from 'react';
import { Play, Calendar, X, CheckCircle } from 'lucide-react';

// WorkoutModal Component - Add this to your Feature.js file
const WorkoutModal = ({ workout, onClose, onStartNow, userId }) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  const handleStartNowClick = () => {
    onStartNow(workout);
    onClose();
  };

  const handleScheduleClick = () => {
    setShowScheduleForm(true);
  };

  const handleScheduleSubmit = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsScheduling(true);
    
    try {
      const dateTimeString = `${selectedDate}T${selectedTime}:00`;
      const scheduledDateTime = new Date(dateTimeString);

      // Use the global mock function
      const response = await window.mockScheduleWorkout({
        userId: userId,
        type: workout.name,
        trainer: workout.trainer || 'Self-guided',
        dateTime: scheduledDateTime.toISOString(),
        category: workout.category,
        duration: workout.duration
      });

      if (response.success) {
        setScheduleSuccess(true);
        setTimeout(() => {
          onClose();
          // Refresh the overview if the function exists
          if (window.refreshOverview) {
            window.refreshOverview();
          }
        }, 2000);
      } else {
        alert('Failed to schedule workout. Please try again.');
      }
    } catch (error) {
      console.error('Error scheduling workout:', error);
      alert('Error scheduling workout. Please try again.');
    } finally {
      setIsScheduling(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (scheduleSuccess) {
    return (
      <div className="modal-overlay">
        <div className="modal-success">
          <CheckCircle className="success-icon" />
          <h3 className="success-title">Workout Scheduled!</h3>
          <p className="success-text">
            Your {workout.name} workout has been scheduled for {selectedDate} at {selectedTime}
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{workout.name}</h2>
          <button onClick={onClose} className="close-button">
            <X className="close-icon" />
          </button>
        </div>

        <div className="modal-body">
          {!showScheduleForm ? (
            <div className="workout-details">
              <div className="workout-info-card">
                <div className="info-row">
                  <span className="info-label">Category:</span>
                  <span className="info-value">{workout.category}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">{workout.duration} minutes</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Exercises:</span>
                  <span className="info-value">{workout.exercises.length}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button onClick={handleStartNowClick} className="btn btn-primary">
                  <Play className="btn-icon" />
                  Start Now
                </button>
                
                <button onClick={handleScheduleClick} className="btn btn-secondary">
                  <Calendar className="btn-icon" />
                  Schedule for Later
                </button>
              </div>
            </div>
          ) : (
            <div className="schedule-form">
              <div className="form-header">
                <h3 className="form-title">Schedule Your Workout</h3>
              </div>
              
              <div className="form-fields">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getTomorrowDate()}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    onClick={() => setShowScheduleForm(false)}
                    className="btn btn-back"
                  >
                    Back
                  </button>
                  
                  <button 
                    onClick={handleScheduleSubmit}
                    disabled={!selectedDate || !selectedTime || isScheduling}
                    className="btn btn-primary"
                  >
                    {isScheduling ? 'Scheduling...' : 'Schedule Workout'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;