require('dotenv').config();

const jwt = require('jsonwebtoken');

const tokenSecret = process.env.JWT_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

const generateJwt = (payload) => {
  return jwt.sign(payload, tokenSecret, {
    expiresIn: '1hr',
  });
};

const generateRefreshJwt = (payload) => {
  return jwt.sign(payload, tokenSecret, {
    expiresIn: '30 days',
  });
};

module.exports = {
  generateJwt,
  generateRefreshJwt,
};
