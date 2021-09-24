/* eslint-disable func-names */
const bcrypt = require('bcryptjs');
const mongoose = require('../database');

const dbUser = new mongoose.Schema({
  email: {
    type: String,
    lowercase: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  user_type: {
    type: String,
    default: 'cliente',
    required: true,
  },
}, { timestamps: true });

dbUser.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model('dbUser', dbUser);

module.exports = User;
