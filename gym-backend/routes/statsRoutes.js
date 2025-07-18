// routes/statsRoutes.js

const express = require('express');
const router = express.Router();
const WorkoutLog = require('../models/WorkoutLog');
const ScheduledWorkout = require('../models/Schedule');

// POST /user-stats
router.post('/user-stats', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const completedThisMonth = await WorkoutLog.find({
       userId,
      date: { $gte: startOfMonth },
    });

    const scheduledThisWeek = await ScheduledWorkout.find({
       userId,
      date: { $gte: startOfWeek },
    });

    const totalTime = completedThisMonth.reduce(
      (sum, log) => sum + (log.duration || 0),
      0
    );

    res.json({
      week: {
        workoutsPlanned: scheduledThisWeek.length,
      },
      month: {
        workoutsDone: completedThisMonth.length,
        totalTime: (totalTime / 60).toFixed(1), // in hours
      },
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
