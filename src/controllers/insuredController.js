const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const Insured = require('../models/insured');

router.use(authMiddleware);

router.post('/:clientId', async (req, res) => {
  try {
    const {
      name, cpf, date_of_birth, degree_of_kinship,
    } = req.body;

    const address = await Insured.create({
      name,
      cpf,
      date_of_birth,
      degree_of_kinship,
      client_id: req.params.clientId,
    });

    await address.save();
    return res.status(200).send(address);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/:clientId', async (req, res) => {
  const { clientId } = req.params;
  try {
    const adresses = await Insured.find({ client_id: clientId });
    return res.send(adresses);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/address/:addressId', async (req, res) => {
  const { addressId } = req.params;

  try {
    const address = await Insured.findById(addressId);

    return res.send(address);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.put('/:adressId', async (req, res) => {
  try {
    const {
      description, street, number, neighborhood, city, zip_code,
    } = req.body;

    const adresses = await Insured.findByIdAndUpdate(req.params.adressId, {
      description, street, number, neighborhood, city, zip_code,
    }, { new: true });

    await adresses.save();

    return res.send(adresses);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

module.exports = (app) => app.use('/insured', router);
