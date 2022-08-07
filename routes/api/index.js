const express = require("express");
const router = express.Router();
const coachRoutes = require("./coachRoutes");
const authRoutes = require("./authRoutes");
const messagesRoutes = require("./messagesRoutes");

const { tokenValidationMiddleware } = require("../../middlewares");

router.use("/coaches", coachRoutes);
router.use("/messages", tokenValidationMiddleware, messagesRoutes);
router.use("/", authRoutes);

module.exports = router;
