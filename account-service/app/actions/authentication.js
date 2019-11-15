var authModel = require('app/repositories/authentication');
var paramError = require('app/libs/service-error/BadRequestError');
var authError = require('app/utils/auth_error');
const JWT = require('app/utils/jwt');
const bcrypt = require('app/utils/bcrypt');

const validateRequestEmail = data => {
  return (
    typeof data.user_email === 'string' && typeof data.password === 'string'
  );
};

const validateRequestUsername = data => {
  return typeof data.username === 'string' && typeof data.password === 'string';
};

const validateRequestToken = data => {
  return typeof data.token === 'string';
};

async function authenticate(password, user) {
  let valid = await bcrypt.validate(password, user.password);

  if (valid) {
    return { token: JWT.createToken({ id_user: user.id_user }) };
  } else {
    throw new authError('Incorrect password');
  }
}

async function authWithEmail(data) {
  if (validateRequestEmail(data)) {
    let user = await authModel.getUserByEmail(data);
    return authenticate(data.password, user);
  } else {
    throw new paramError('Invalid request');
  }
}

async function authWithUsername(data) {
  if (validateRequestUsername(data)) {
    let user = await authModel.getUserByUsername(data);
    return authenticate(data.password, user);
  } else {
    throw new paramError('Invalid request');
  }
}

function validate(data) {
  if (validateRequestToken(data)) {
    return JWT.verifyToken(data.token);
  } else {
    throw new paramError('Invalid request');
  }
}

module.exports = {
  authWithEmail,
  authWithUsername,
  validate
};
