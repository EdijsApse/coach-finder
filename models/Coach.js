const mongoose = require('mongoose');

const userCoachSchema = new mongoose.Schema({
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
});

const coachSchema = new mongoose.Schema({
  jobtitle: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  fields: {
    type: [String],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  user: {
    type: userCoachSchema,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

coachSchema.pre('save', function() {
  this.fields = this.fields.map((field) => field.toLowerCase());
  this.price = this.price.toFixed(2)
});

module.exports = mongoose.model('Coach', coachSchema);