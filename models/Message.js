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
  roomId: {
    type: mongoose.ObjectId,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

messageSchema.virtual('created').get(function() {
  return this.created_at.toLocaleString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })
});

messageSchema.methods.getApiData = function(logedInUser) {
  return {
    id: this.id,
    message: this.message,
    roomId: this.roomId,
    isMyMessage: this.from.id == logedInUser,
    from: this.from,
    tto: this.to,
    created: this.created,
    created_at: this.created_at
  }
}

module.exports = mongoose.model('Message', messageSchema)