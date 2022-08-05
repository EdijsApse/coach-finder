const mongoose = require('mongoose');
const UserCoachSchema = require('../custom-schemas/UserCoachSchema');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  from: {
    type: UserCoachSchema,
    required: true
  },
  to: {
    type: UserCoachSchema,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Message', messageSchema)