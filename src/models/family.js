const mongoose = require('../database');

const dbFamily = new mongoose.Schema({
  name: {
    type: String,
    lowercase: false,
    unique: true,
  },
  user_type: {
    type: String,
    default: 'cliente',
    required: true,
  },
}, { timestamps: true });

const Family = mongoose.model('dbFamily', dbFamily);

module.exports = Family;
