const mongoose = require('../database');

const dbClients = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: false,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  cpf: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  user_type: {
    type: String,
    default: 'client',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dbUser',
    required: true,
  },
}, { timestamps: true });

const Clients = mongoose.model('dbClients', dbClients);

module.exports = Clients;
