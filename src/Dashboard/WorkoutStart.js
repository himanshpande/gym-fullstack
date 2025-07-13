import React, { useState } from 'react';
import { X, Play, Calendar, Clock } from 'lucide-react';

const WorkoutStartModal = ({ isOpen, onClose, onStartNow, onScheduleLater }) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleStartNow = () => {
    onStartNow();
    onClose();
  };

  const handleScheduleClick = () => {
    setIsScheduling(true);
  };

  const handleScheduleConfirm = () => {
    if (selectedDate && selectedTime) {
      onScheduleLater({
        date: selectedDate,
        time: selectedTime,
        datetime: new Date(`${selectedDate}T${selectedTime}`)
      });
      onClose();
      setIsScheduling(false);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const handleCancel = () => {
    setIsScheduling(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  if (!isOpen) return null;

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: '#1f2937',
      borderRadius: '12px',
      padding: '24px',
      width: '100%',
      maxWidth: '400px',
      margin: '16px',
      position: 'relative',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '6px'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '24px',
      color: '#ffffff',
      textAlign: 'center'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    primaryButton: {
      width: '100%',
      backgroundColor: '#3b82f6',
      color: 'white',
      fontWeight: '600',
      padding: '16px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transition: 'background-color 0.2s'
    },
    secondaryButton: {
      width: '100%',
      backgroundColor: '#4b5563',
      color: 'white',
      fontWeight: '600',
      padding: '16px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transition: 'background-color 0.2s'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#d1d5db',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #374151',
      borderRadius: '8px',
      backgroundColor: '#374151',
      color: '#ffffff',
      fontSize: '1rem'
    },
    buttonRow: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px'
    },
    cancelButton: {
      flex: 1,
      backgroundColor: '#4b5563',
      color: '#ffffff',
      fontWeight: '600',
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    confirmButton: {
      flex: 1,
      backgroundColor: '#3b82f6',
      color: 'white',
      fontWeight: '600',
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background-color 0.2s'
    },
    confirmButtonDisabled: {
      backgroundColor: '#6b7280',
      cursor: 'not-allowed'
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={modalStyles.closeButton}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
        >
          <X size={24} />
        </button>

        {!isScheduling ? (
          // Initial choice screen
          <div>
            <h2 style={modalStyles.title}>Start Workout</h2>
            
            <div style={modalStyles.buttonContainer}>
              <button
                onClick={handleStartNow}
                style={modalStyles.primaryButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                <Play size={20} />
                Start Now
              </button>
              
              <button
                onClick={handleScheduleClick}
                style={modalStyles.secondaryButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4b5563'}
              >
                <Calendar size={20} />
                Schedule for Later
              </button>
            </div>
          </div>
        ) : (
          // Scheduling screen
          <div>
            <h2 style={modalStyles.title}>Schedule Workout</h2>
            
            <div style={modalStyles.formContainer}>
              <div>
                <label style={modalStyles.label}>
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  style={modalStyles.input}
                />
              </div>
              
              <div>
                <label style={modalStyles.label}>
                  Select Time
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={modalStyles.input}
                />
              </div>
              
              <div style={modalStyles.buttonRow}>
                <button
                  onClick={handleCancel}
                  style={modalStyles.cancelButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4b5563'}
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleConfirm}
                  disabled={!selectedDate || !selectedTime}
                  style={{
                    ...modalStyles.confirmButton,
                    ...((!selectedDate || !selectedTime) ? modalStyles.confirmButtonDisabled : {})
                  }}
                  onMouseEnter={(e) => {
                    if (selectedDate && selectedTime) {
                      e.target.style.backgroundColor = '#2563eb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedDate && selectedTime) {
                      e.target.style.backgroundColor = '#3b82f6';
                    }
                  }}
                >
                  <Clock size={16} />
                  Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutStartModal;