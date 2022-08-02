const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isSamePassword = async function(password) {
  const passwordsMatches = await bcrypt.compare(password, this.password);
  return passwordsMatches;
};

userSchema.methods.getApiData = function() {
  return {
    name: this.name,
    surname: this.surname,
    email: this.email,
    id: this.id,
    is_admin: this.is_admin
  }
};

module.exports = mongoose.model('User', userSchema);