const express = require('express');
const router = express.Router();
const controller = require('../../controllers/AuthController');
const { validateUser, isUniqueEmail,  } = require('../../validation');
const { tokenValidationMiddleware } = require('../../middlewares');

router.post('/register', validateUser, isUniqueEmail, controller.register, controller.login);

router.post('/login', controller.login);

router.get('/refresh-user', tokenValidationMiddleware, controller.refreshUser);

module.exports = router;
