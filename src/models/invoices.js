const mongoose = require('../database');

const dbInvoices = new mongoose.Schema({
  due_date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  pay_date: {
    type: Date,
    required: true,
  },
  interest: {
    type: Number,
    default: 'client',
    required: true,
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dbClients',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dbClients',
    required: true,
  },
}, { timestamps: true });

const Invoices = mongoose.model('dbInvoices', dbInvoices);

module.exports = Invoices;
