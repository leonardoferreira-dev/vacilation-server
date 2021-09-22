module.exports = (req, res, next) => (!req.userType || req.userType !== 'admin' ? res.status(401).json({ erro: 'Acesso restrito' }) : next());
