const { reader, single } = require('app/utils/knex');

async function getUserByUsername(data) {
  const query = reader('user').where({
    username: data.username
  });
  return single(query);
}

async function getUserByEmail(data) {
  const query = reader('user').where({
    user_email: data.user_email
  });
  return single(query);
}

module.exports = {
  getUserByEmail,
  getUserByUsername
};
