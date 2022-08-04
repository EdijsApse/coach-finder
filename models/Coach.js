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

coachSchema.virtual('member_since').get(function() {
  return this.created_at.toLocaleString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })
});

coachSchema.methods.getApiData = function() {
  return {
    jobtitle: this.jobtitle,
    price: this.price,
    fields: this.fields,
    location: this.location,
    about: this.about,
    user: this.user,
    created_at: this.created_at,
    member_since: this.member_since
  }
}

module.exports = mongoose.model('Coach', coachSchema);