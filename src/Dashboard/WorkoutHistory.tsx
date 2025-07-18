import React, { useEffect, useState } from 'react';
import apiService from '../services/api';

interface WorkoutLog {
  _id: string;
  workoutName: string;
  category: string;
  caloriesBurned: number;
  duration: number;
  date: string;
}

const WorkoutHistory = ({ userId }: { userId: string }) => {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await apiService.getWorkoutLogs(userId);
        setLogs(response.logs || []);
      } catch (error) {
        console.error('Failed to fetch workout logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [userId]);

  if (loading) {
    return <div className="overview-card">Loading workout history...</div>;
  }

  return (
    <div className="overview-card">
      <h3 className="overview-title text-black">Workout History</h3>
      {logs.length > 0 ? (
        <ul className="workout-history-list">
          {logs.slice(0, 5).map(log => (
            <li key={log._id} style={{ marginBottom: '10px', color: 'gray' }}>
              <div><strong>{log.workoutName}</strong> ({log.category})</div>
              <div>🔥 {log.caloriesBurned} cal</div>
              <div>🕒 {log.duration} min</div>
              <div>📅 {new Date(log.date).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed workouts yet.</p>
      )}
    </div>
  );
};

export default WorkoutHistory;
