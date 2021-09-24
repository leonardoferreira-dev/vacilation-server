const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const Vacilations = require('../models/vacilations');

router.use(authMiddleware);

router.post('/:userId', async (req, res) => {
  try {
    const vacilation = await Vacilations.create({
      user_id: req.params.userId,
    });

    await vacilation.save();
    return res.status(200).send(vacilation);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

// router.get('/vacilation/:userId/:type', async (req, res) => {
//   const { userId, type } = req.params;
//   try {
//     const vacilations = await Vacilations.find({ user_id: userId, user_type: type });
//     return res.send(vacilations);
//   } catch (err) {
//     return res.status(400).send({ error: err });
//   }
// });

// router.get('/vacilation/:addressId', async (req, res) => {
//   const { addressId } = req.params;

//   try {
//     const vacilation = await Vacilations.findById(addressId);

//     return res.send(vacilation);
//   } catch (err) {
//     return res.status(400).send({ error: err });
//   }
// });

// router.put('/:adressId', async (req, res) => {
//   try {
//     const {
//       description, street, number, neighborhood, city, zip_code,
//     } = req.body;

//     const vacilations = await Vacilations.findByIdAndUpdate(req.params.adressId, {
//       description, street, number, neighborhood, city, zip_code,
//     }, { new: true });

//     await vacilations.save();

//     return res.send(vacilations);
//   } catch (err) {
//     return res.status(400).send({ error: err });
//   }
// });

module.exports = (app) => app.use('/vacilations', router);
