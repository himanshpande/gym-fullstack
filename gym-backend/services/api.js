// services/api.js
// services/api.js
const API_BASE_URL = 'http://localhost:5000/api'; // Change this line

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Workout related endpoints
  async scheduleWorkout(workoutData) {
    return this.request('/workout/schedule', {
      method: 'POST',
      body: JSON.stringify(workoutData),
    });
  }

  async logWorkout(workoutData) {
    return this.request('/workout/log', {
      method: 'POST',
      body: JSON.stringify(workoutData),
    });
  }

  async getOverview(userId) {
    return this.request(`/workout/overview/${userId}`);
  }

  async getWorkoutLogs(userId) {
    return this.request(`/workout/logs/${userId}`);
  }

  async getScheduledWorkouts(userId) {
    return this.request(`/workout/scheduled/${userId}`);
  }

  async getUserStats(userId) {
    console.log('getUserStats called with userId:', userId);
    console.log('Making POST request to: /user-stats');
    return this.request('/user-stats', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Cancel scheduled workout
  async cancelScheduledWorkout(scheduleId) {
    return this.request(`/workout/schedule/${scheduleId}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();