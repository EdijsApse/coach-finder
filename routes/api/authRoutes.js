const express = require('express');
const router = express.Router();
const controller = require('../../controllers/AuthController');

router.post('/register', controller.register, controller.login);

router.post('/login', controller.login);

module.exports = router;
