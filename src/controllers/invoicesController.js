const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const Invoices = require('../models/invoices');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const {
      due_date, price, status, pay_date, interest, user_type = 'client', client_id,
    } = req.body;

    const address = await Invoices.create({
      due_date, price, status, pay_date, interest, client_id, user_type, user_id: req.userId,
    });

    await address.save();
    return res.status(200).send(address);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const { reducer } = req.query;

    const invoices = await Invoices.find({ user_id: req.userId }).sort({ createdAt: reducer ? -1 : 1 }).limit(Number(reducer) || undefined).populate(['client_id']);
    return res.send(invoices);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = (app) => app.use('/invoices', router);
