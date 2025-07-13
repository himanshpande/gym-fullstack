// routes/workout.js
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
// Using average weight of 70kg for calculation
const calculateCalories = (category, duration) => {
  const met = MET_VALUES[category] || 5.0;
  const weightKg = 70; // average weight
  const timeHours = duration / 60;
  return Math.round(met * weightKg * timeHours);
};

// POST /api/workout/log - Log completed workout
router.post('/log', async (req, res) => {
  try {
    const { userId, category, duration } = req.body;
    
    if (!userId || !category || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const caloriesBurned = calculateCalories(category, duration);
    
    const workoutLog = new WorkoutLog({
      userId,
      category,
      duration,
      caloriesBurned
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
    const { userId, type, trainer, dateTime } = req.body;
    
    if (!userId || !type || !dateTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const schedule = new Schedule({
      userId,
      type,
      trainer,
      dateTime: new Date(dateTime)
    });

    await schedule.save();
    res.status(201).json({ message: 'Workout scheduled successfully', schedule });
  } catch (error) {
    console.error('Error scheduling workout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/overview/:userId - Get user overview data
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
    }).sort({ dateTime: 1 });

    // Get recent activities (last 3 workouts)
    const recentActivities = await WorkoutLog.find({ userId })
      .sort({ date: -1 })
      .limit(3);

    res.json({
      lastWorkout,
      upcomingSchedules,
      recentActivities
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
    const logs = await WorkoutLog.find({ userId }).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching workout logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
