const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 7776000,
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) { return res.status(400).send({ erro: 'Usuário já cadastrado' }); }
    const user = await User.create(req.body);
    user.password = undefined;
    return res.send({ user, token: generateToken({ id: user.id.toString }) });
  } catch (err) {
    return res.status(400).send({ erro: err });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  try {
    if (!user) { return res.status(200).json({ erro: 'O Usuario não Foi encontrado' }); }

    if (!await bcrypt.compare(password, user.password)) { return res.status(200).json({ erro: 'Senha inválida' }); }

    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id, user_type: user.user_type, company: user.company }),
    });
  } catch (err) {
    return res.status(200).json({ erro: 'Ocorreu um erro ao logar, tente novamente' });
  }
});

module.exports = (app) => app.use('/auth', router);
