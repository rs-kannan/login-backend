const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, // Ensure email is unique
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picLink: {
      type: String,
      required: true,
      default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;