/* eslint-disable func-names */
const bcrypt = require('bcryptjs');
const mongoose = require('../database');

const app = new mongoose.Schema({
  pushToken: String,
  userId: String,
  name: String,
}, { _index: false });

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
  cpf: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  app,
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
