const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    data: 'Secure user route!'
  })
});

module.exports = router;