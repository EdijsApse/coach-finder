const express = require('express');
const router = express.Router();
const controller = require('../../controllers/AuthController');
const { validateUser } = require('../../validation');

router.post('/register', validateUser, controller.register, controller.login);

router.post('/login', controller.login);

module.exports = router;
