const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const Vacilations = require('../models/vacilations');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { description, user_id } = req.body;

  try {
    const vacilation = await Vacilations.create({
      description,
      user_id,
    });

    await vacilation.save();
    return res.status(200).send(vacilation);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/', async (req, res) => {
  const { user } = req.query;

  try {
    const vacilations = await Vacilations.find({ user_id: user });
    return res.send(vacilations);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

module.exports = (app) => app.use('/vacilations', router);
