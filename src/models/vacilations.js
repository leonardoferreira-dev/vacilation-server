const mongoose = require('../database');

const dbVacilation = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dbClient',
    required: true,
  },
}, { timestamps: true });

const Vacilation = mongoose.model('dbVacilation', dbVacilation);

module.exports = Vacilation;
