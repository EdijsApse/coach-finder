const express = require('express');
const router = express.Router();
const coachRoutes = require('./coachRoutes');

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

router.use('/coaches', coachRoutes);

module.exports = router