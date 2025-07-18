// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true // workout name/type
  },
  category: {
    type: String
  },
  trainer: {
    type: String,
    default: 'Self-guided'
  },
  dateTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number // estimated duration in minutes
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'missed'],
    default: 'scheduled'
  },
  completedAt: {
    type: Date
  },
  notes: {
    type: String,
    maxLength: 500
  },
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'push', 'sms'],
      default: 'push'
    },
    minutesBefore: {
      type: Number,
      default: 30
    },
    sent: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Indexes for faster queries
scheduleSchema.index({ userId: 1, dateTime: 1 });
scheduleSchema.index({ dateTime: 1, status: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema);
