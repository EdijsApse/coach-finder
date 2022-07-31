const express = require("express");
const router = express.Router();
const coachRoutes = require("./coachRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const { setHeaderMiddleware, tokenValidationMiddleware } = require("../../middlewares");

router.use(setHeaderMiddleware);

router.use("/coaches", coachRoutes);
router.use("/", authRoutes);

router.use(
  "/user",
  tokenValidationMiddleware,
  userRoutes
);

module.exports = router;
