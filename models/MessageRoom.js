const mongoose = require('mongoose');
const UserCoachSchema = require('../custom-schemas/UserCoachSchema');
const Message = require('./Message');

const roomSchema = new mongoose.Schema({
  roomUsers: {
    type: [ UserCoachSchema ],
    required: true,
    min: 2,
    max: 2
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

roomSchema.virtual('created').get(function() {
  return this.created_at.toLocaleString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })
});

roomSchema.methods.getApiData = function(userId) {
  const receiver = this.roomUsers.find((user) => user.id != userId);
  return {
    id: this.id,
    receiver: receiver,
    roomUsers: this.roomUsers,
    created_at: this.created_at,
    created: this.created
  }
}

roomSchema.methods.getMessages = async function(logedInUser) {
  const messages = await Message.find({roomId: this.id}).sort();
  return messages.map((msg) => msg.getApiData(logedInUser))
}

roomSchema.statics.getRoomsByUser = async function(userId) {
  const rooms = await this.find({ 'roomUsers': { '$elemMatch': { id: userId } } }).sort({created_at: -1});
  return rooms.map((room) => room.getApiData(userId));
};

module.exports = mongoose.model('Room', roomSchema);