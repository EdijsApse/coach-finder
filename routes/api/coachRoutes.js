const express = require("express");
const router = express.Router();
const controller = require('../../controllers/CoachesController');
const { validateCoach, validateMessageToCoach } = require('../../validation/index');
const { tokenValidationMiddleware } = require('../../middlewares/index');

router.get("/", controller.index);

router.post("/new", tokenValidationMiddleware, validateCoach, controller.create);

router.get("/:id", controller.show);

router.post("/:id/send-message",tokenValidationMiddleware, validateMessageToCoach, controller.sendMessage);

module.exports = router;
