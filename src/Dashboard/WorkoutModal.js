import React, { useState } from 'react';
import './WorkoutModal.css'; // Add your styles

const WorkoutModal = ({ workout, onClose, onStartNow, onScheduleForLater }) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleStartNowClick = () => {
    onStartNow();
  };

  const handleScheduleClick = () => {
    setShowScheduleForm(true);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      onScheduleForLater(selectedDate, selectedTime);
    }
  };

  const handleBackToOptions = () => {
    setShowScheduleForm(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  // Get tomorrow's date as minimum selectable date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get current time for minimum time selection if today is selected
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{workout.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {!showScheduleForm ? (
            // Initial choice screen
            <div className="workout-options">
              <div className="workout-info">
                <p><strong>Category:</strong> {workout.category}</p>
                <p><strong>Duration:</strong> {workout.duration} minutes</p>
                {workout.exercises && (
                  <p><strong>Exercises:</strong> {workout.exercises.length}</p>
                )}
              </div>

              <div className="option-buttons">
                <button 
                  className="btn btn-primary start-now-btn"
                  onClick={handleStartNowClick}
                >
                  🚀 Start Now
                </button>
                
                <button 
                  className="btn btn-secondary schedule-btn"
                  onClick={handleScheduleClick}
                >
                  📅 Schedule for Later
                </button>
              </div>
            </div>
          ) : (
            // Schedule form
            <div className="schedule-form">
              <h3>Schedule Your Workout</h3>
              
              <form onSubmit={handleScheduleSubmit}>
                <div className="form-group">
                  <label htmlFor="workout-date">Date:</label>
                  <input
                    type="date"
                    id="workout-date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getTomorrowDate()}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="workout-time">Time:</label>
                  <input
                    type="time"
                    id="workout-time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  />
                </div>

                <div className="form-buttons">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handleBackToOptions}
                  >
                    ← Back
                  </button>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!selectedDate || !selectedTime}
                  >
                    Schedule Workout
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;