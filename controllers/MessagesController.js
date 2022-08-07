const MessageRoom = require('../models/MessageRoom');

async function getRooms(req, res) {
  const rooms = await MessageRoom.getRoomsByUser(req.user.id);
  res.json({
    rooms
  })
}

function getRoomMessages() {

}

function sendMessage() {

}

module.exports = {
  getRooms: getRooms,
  getRoomMessages: getRoomMessages,
  sendMessage: sendMessage
};