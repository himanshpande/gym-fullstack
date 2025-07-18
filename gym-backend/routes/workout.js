
const express = require('express');
const router = express.Router();
const WorkoutLog = require('../models/WorkoutLog');
const Schedule = require('../models/Schedule');



// MET values for different workout categories
const MET_VALUES = {
  'Chest & Upper Body': 6.0,
  'Cardio & HIIT': 8.0,
  'Abs & Core': 5.0,
  'Legs & Glutes': 6.5,
  'Back & Shoulders': 6.0,
  'Yoga & Flexibility': 2.5
};

// Calculate calories burned: MET * weight(kg) * time(hours)
const calculateCalories = (category, duration) => {
  const met = MET_VALUES[category] || 5.0;
  const weightKg = 70; // average weight
  const timeHours = duration / 60;
  return Math.round(met * weightKg * timeHours);
};

// POST /api/workout/log - Log completed workout
router.post('/log', async (req, res) => {
  try {
    const { userId, category, duration, workoutName } = req.body;
    
    if (!userId || !category || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const caloriesBurned = calculateCalories(category, duration);
    
    const workoutLog = new WorkoutLog({
      userId,
      category,
      duration,
      caloriesBurned,
      workoutName: workoutName || category
    });

    await workoutLog.save();
    res.status(201).json({ message: 'Workout logged successfully', workoutLog });
  } catch (error) {
    console.error('Error logging workout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/workout/schedule - Schedule workout
router.post('/schedule', async (req, res) => {
  try {
    const { userId, type, trainer, dateTime, category, duration } = req.body;
    
    if (!userId || !type || !dateTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const schedule = new Schedule({
      userId,
      type,
      trainer: trainer || 'Self-guided',
      dateTime: new Date(dateTime),
      category,
      duration,
      status: 'scheduled'
    });

    await schedule.save();
    res.status(201).json({ message: 'Workout scheduled successfully', schedule });
  } catch (error) {
    console.error('Error scheduling workout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/workout/schedule/:scheduleId - Cancel scheduled workout
router.delete('/schedule/:scheduleId', async (req, res) => {
  try {
    const { scheduleId } = req.params;
    
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ error: 'Scheduled workout not found' });
    }

    schedule.status = 'cancelled';
    await schedule.save();
    
    res.json({ message: 'Workout cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling workout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/workout/scheduled/:userId - Get scheduled workouts for user
router.get('/scheduled/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const scheduledWorkouts = await Schedule.find({
      userId,
      dateTime: { $gt: new Date() },
      status: 'scheduled'
    }).sort({ dateTime: 1 });
    
    res.json(scheduledWorkouts);
  } catch (error) {
    console.error('Error fetching scheduled workouts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/workout/overview/:userId - Get user overview data
router.get('/overview/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get last workout
    const lastWorkout = await WorkoutLog.findOne({ userId })
      .sort({ date: -1 })
      .limit(1);

    // Get upcoming schedules
    const upcomingSchedules = await Schedule.find({
      userId,
      dateTime: { $gt: new Date() },
      status: 'scheduled'
    })
    .sort({ dateTime: 1 })
    .limit(5);

    // Get recent activities (last 5 workouts)
    const recentActivities = await WorkoutLog.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    // Calculate weekly progress
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const weeklyWorkouts = await WorkoutLog.countDocuments({
      userId,
      date: { $gte: weekStart, $lt: weekEnd }
    });

    res.json({
      lastWorkout,
      upcomingSchedules,
      recentActivities,
      weeklyProgress: {
        completed: weeklyWorkouts,
        total: 5 // This could be dynamic based on user's goal
      }
    });
  } catch (error) {
    console.error('Error fetching overview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/workout/logs/:userId - Get all workout logs for user
router.get('/logs/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, page = 1 } = req.query;
    
    const logs = await WorkoutLog.find({ userId })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      
    const totalCount = await WorkoutLog.countDocuments({ userId });
    
    res.json({
      logs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasNextPage: page * limit < totalCount,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching workout logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/workout/schedule/:scheduleId/complete - Mark scheduled workout as completed
router.put('/schedule/:scheduleId/complete', async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const { duration, actualStartTime } = req.body;
    
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ error: 'Scheduled workout not found' });
    }

    // Update schedule status
    schedule.status = 'completed';
    schedule.completedAt = new Date();
    await schedule.save();

    // Create workout log entry
    const caloriesBurned = calculateCalories(schedule.category, duration || schedule.duration);
    
    const workoutLog = new WorkoutLog({
      userId: schedule.userId,
      category: schedule.category,
      duration: duration || schedule.duration,
      caloriesBurned,
      workoutName: schedule.type,
      scheduledWorkoutId: scheduleId
    });

    await workoutLog.save();
    
    res.json({ 
      message: 'Workout marked as completed', 
      schedule, 
      workoutLog 
    });
  } catch (error) {
    console.error('Error completing workout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;