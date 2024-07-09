const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Pre-save hook to hash the password before saving it
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare the password for login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
