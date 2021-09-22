const mongoose = require('../database');

const dbAdresses = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    default: 'client',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dbClient',
    required: true,
  },
}, { timestamps: true });

const Adresses = mongoose.model('dbAdresses', dbAdresses);

module.exports = Adresses;
