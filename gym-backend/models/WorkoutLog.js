// models/WorkoutLog.js
const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
    enum: ['Chest & Upper Body', 'Cardio & HIIT', 'Abs & Core', 'Legs & Glutes', 'Back & Shoulders', 'Yoga & Flexibility']
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);

// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  type: {
    type: String,
    required: true,
    enum: ['Chest & Upper Body', 'Cardio & HIIT', 'Abs & Core', 'Legs & Glutes', 'Back & Shoulders', 'Yoga & Flexibility']
  },
  trainer: {
    type: String,
    default: null
  },
  dateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema);