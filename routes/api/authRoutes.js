const express = require('express');
const router = express.Router();
const controller = require('../../controllers/AuthController');
const { validateUser, isUniqueEmail, validateCredentials } = require('../../validation');
const { tokenValidationMiddleware, } = require('../../middlewares');

router.post('/register', validateUser, isUniqueEmail, controller.register, controller.login);

router.post('/login', validateCredentials, controller.login);

router.get('/refresh-user', tokenValidationMiddleware, controller.refreshUser);

module.exports = router;
