/* eslint-disable import/no-unresolved */
const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const Clients = require('../models/Clients');
const Adresses = require('../models/adresses');
const Invoices = require('../models/invoices');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const {
      name, email, genre, date_of_birth, cpf, phone,
    } = req.body;

    const client = await Clients.create({
      name, email, genre, date_of_birth, cpf, phone, user_id: req.userId,
    });

    await client.save();
    return res.status(200).send(client);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/', async (req, res) => {
  const { reducer } = req.query;

  try {
    const clients = await Clients.find({ user_id: req.userId }).sort({ createdAt: reducer ? -1 : 1 }).limit(Number(reducer) || undefined).populate(['user_id', 'clients']);
    return res.send(clients);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/:clientId', async (req, res) => {
  const { clientId } = req.params;

  try {
    const clientDB = await Clients.findById(clientId).populate(['user_id', 'clients']);
    const addressDB = await Adresses.find({ user_id: clientId }) || [];
    const invoicesDB = await Invoices.find({ client_id: clientId }) || [];
    const client = {
      ...clientDB.toObject(),
      adresses: addressDB,
      invoices: invoicesDB,
    };
    return res.send(client);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.put('/:clientId', async (req, res) => {
  try {
    const data = req.body;

    const client = await Clients.findByIdAndUpdate(req.params.clientId, data, { new: true });

    await client.save();

    return res.send(client);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

module.exports = (app) => app.use('/clients', router);
