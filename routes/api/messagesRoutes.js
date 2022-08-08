const express = require('express');
const router = express.Router();
const controller = require('../../controllers/MessagesController');

router.get('/rooms', controller.getRooms);

router.get('/rooms/:roomId', controller.getRoomMessages);

router.post('/rooms/:roomId', controller.sendMessage);

module.exports = router;