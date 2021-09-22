const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const Adresses = require('../models/adresses');

router.use(authMiddleware);

router.post('/:userId', async (req, res) => {
  try {
    const {
      description, street, number, neighborhood, city, zip_code, user_type = 'client',
    } = req.body;

    const address = await Adresses.create({
      description,
      street,
      number,
      neighborhood,
      city,
      zip_code,
      user_type,
      user_id: req.params.userId,
    });

    await address.save();
    return res.status(200).send(address);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/address/:userId/:type', async (req, res) => {
  const { userId, type } = req.params;
  try {
    const adresses = await Adresses.find({ user_id: userId, user_type: type });
    return res.send(adresses);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/address/:addressId', async (req, res) => {
  const { addressId } = req.params;

  try {
    const address = await Adresses.findById(addressId);

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

    const adresses = await Adresses.findByIdAndUpdate(req.params.adressId, {
      description, street, number, neighborhood, city, zip_code,
    }, { new: true });

    await adresses.save();

    return res.send(adresses);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

module.exports = (app) => app.use('/adresses', router);
