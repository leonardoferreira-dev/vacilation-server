/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) { return res.status(401).send({ erro: 'O token não foi informado' }); }

  const parts = authHeader.split(' ');

  if (!parts.lenght === 2) { return res.status(401).send({ erro: 'Erro com o token' }); }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) { return res.status(401).send({ erro: 'Acesso não autorizado' }); }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ erro: 'Token inválido' });
    req.userId = decoded.id;
    req.userType = decoded.user_type;
    req.companyId = decoded.company;

    return next();
  });
};
