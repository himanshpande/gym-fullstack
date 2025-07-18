// models/WorkoutLog.js
const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true
  },
  workoutName: {
    type: String
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  scheduledWorkoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number // for time-based exercises
  }],
  notes: {
    type: String,
    maxLength: 500
  }
}, {
  timestamps: true
});

// Index for efficient queries
workoutLogSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);
