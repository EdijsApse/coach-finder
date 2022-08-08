const MessageRoom = require('../models/MessageRoom');
const Message = require('../models/Message');
const User = require('../models/User');
const UnhandledError = require('../utils/UnhandledError');

async function getRooms(req, res) {
  const rooms = await MessageRoom.getRoomsByUser(req.user.id);
  res.json({
    rooms
  })
}

async function getRoomMessages(req, res, next) {
  try {
    const room = await MessageRoom.findById(req.params.roomId);
    
    if (!room) {
      res.json({
        success: false,
        errMsg: 'Chat room not found!'
      })
    }

    const messages = await room.getMessages(req.user.id);
    
    res.json({
      success: true,
      messages: messages
    })

  } catch(err) {
    next(new UnhandledError('Couldnt load chat messages!', err));
  }
}

async function sendMessage(req, res, next) {
  try {
    
    const room = await MessageRoom.findOne({ _id: req.params.roomId, 'roomUsers': { '$elemMatch': { id: req.user.id } } });

    if (!room) {
      return res.json({
        success: false,
        message: 'You dont have created chat room with this user!'
      })
    }

    const roomUser = room.roomUsers.find((user) => user.id != req.user.id);
    const receiver = await User.findById(roomUser.id);

    if (!receiver) {
      return res.json({
        success: false,
        message: 'User who should receive message, not found!'
      })
    }

    const msg = {
      message: req.body.message,
      from: {
        id: req.user.id,
        name: req.user.name,
        surname: req.user.surname
      },
      to: {
        id: receiver.id,
        name: receiver.name,
        surname: receiver.surname
      },
      roomId: room.id
    }

    const inserted = await Message.create(msg);

    res.json({
      success: true,
      inserted: inserted.getApiData(req.user.id)
    })

  }
  catch(err) {
    console.log(err)
    next(new UnhandledError('Couldnt send message!', err));
  }
}

module.exports = {
  getRooms: getRooms,
  getRoomMessages: getRoomMessages,
  sendMessage: sendMessage
};