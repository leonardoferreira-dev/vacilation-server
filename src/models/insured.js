const mongoose = require('../database');

const dbInsured = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    lowercase: false,
    unique: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  degree_of_kinship: {
    type: String,
    default: 'Pai',
    required: true,
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dbClients',
    required: true,
  },
}, { timestamps: true });

const Insured = mongoose.model('dbInsured', dbInsured);

module.exports = Insured;
