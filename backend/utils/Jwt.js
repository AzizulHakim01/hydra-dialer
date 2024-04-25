const jwt = require('jsonwebtoken');

const SECRETE_KEY = process.env.SECRETE_KEY;

function createJwt(username) {
  const token = jwt.sign({ username }, SECRETE_KEY);
  return token;
}

function verifyToken(token) {
  const data = jwt.verify(token, SECRETE_KEY);
  return data;
}

module.exports = {
  createJwt,
  verifyToken,
};