const jwt = require('jsonwebtoken');
var authError = require('./auth_error');

function createToken(payload) {
  return jwt.sign(payload, 'eduka_acc_service', { expiresIn: '12h' });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'eduka_acc_service', function(err, decoded) {
      err ? reject(new authError('Token is invalid')) : resolve(decoded);
    });
  });
}

module.exports = {
  createToken,
  verifyToken
};
