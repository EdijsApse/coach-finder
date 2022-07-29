const express = require('express');
const router = express.Router();
const coachRoutes = require('./coachRoutes');

router.use('/coaches', coachRoutes);

module.exports = router