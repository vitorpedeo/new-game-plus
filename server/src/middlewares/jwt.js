require('dotenv').config();

const jwt = require('jsonwebtoken');

const tokenSecret = process.env.JWT_TOKEN_SECRET;

const verifyJwt = (req, res, next) => {
  const completeToken = req.headers.authorization;

  if (!completeToken) {
    return res.unauthorized('Acesso não permitido.', null);
  }

  const [bearer, token] = completeToken.split(' ');

  if (!(bearer === 'Bearer')) {
    return res.unauthorized('Token mal formatada.', null);
  }

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      return res.unauthorized('Token inválida.', null);
    }

    req.userId = decoded.id;

    return next();
  });
};

module.exports = verifyJwt;
