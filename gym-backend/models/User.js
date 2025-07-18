// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profile: {
    weight: Number, // in kg
    height: Number, // in cm
    age: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    goals: [{
      type: String,
      enum: ['weight_loss', 'muscle_gain', 'strength', 'endurance', 'flexibility']
    }]
  },
  preferences: {
    weeklyWorkoutGoal: {
      type: Number,
      default: 5
    },
    preferredWorkoutTimes: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      },
      time: String // HH:MM format
    }],
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      reminderMinutes: {
        type: Number,
        default: 30
      }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
