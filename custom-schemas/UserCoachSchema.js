const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true,
  },
  id: {
    type: mongoose.ObjectId,
    required: true
  }
});;