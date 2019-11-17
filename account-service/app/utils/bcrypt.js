var bcrypt = require('bcryptjs');

const PASSWORD_HASH_SALT_ROUND = 10;

function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, PASSWORD_HASH_SALT_ROUND, (err, hash) => {
      err ? reject(err) : resolve(hash);
    });
  });
}

function validate(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err, res) {
      err ? reject(err) : resolve(res);
    });
  });
}

module.exports = {
  hash,
  validate
};
