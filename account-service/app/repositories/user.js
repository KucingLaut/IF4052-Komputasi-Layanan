const { returnOnlyDefinedProps } = require('app/utils/object');
const { reader, writer, execute, single } = require('app/utils/knex');

function getAllUsersWithOffset(key, offset) {
  const query = reader
    .select()
    .table('user')
    .where('username', 'like', key)
    .orWhere('user_email', 'like', key)
    .offset(offset);

  return execute(query);
}

function getAllUsersWithLimitAndOffset(key, limit, offset) {
  const query = reader
    .select()
    .table('user')
    .where('username', 'like', key)
    .orWhere('user_email', 'like', key)
    .limit(limit)
    .offset(limit * offset);

  return execute(query);
}

function getAllUsersByIDs(ids) {
  const query = reader
    .select()
    .table('user')
    .whereIn('id_user', ids);

  return execute(query);
}

async function getUserById(id) {
  const query = reader('user').where({
    id_user: id
  });
  return single(query);
}

async function addUser(data) {
  const query = writer('user')
    .returning('id_user')
    .insert({
      username: data.username,
      password: data.password,
      user_email: data.user_email,
      firstname: data.firstname,
      lastname: data.lastname
    });

  const userId = await single(query);

  return { id_user: userId };
}

function deleteUser(id) {
  const query = writer('user')
    .where('id_user', id)
    .del();

  return execute(query);
}

function updateUser(id, data) {
  const query = writer('user')
    .where('id_user', id)
    .update(
      returnOnlyDefinedProps(data, [
        'password',
        'user_email',
        'firstname',
        'lastname'
      ])
    );

  return execute(query);
}

module.exports = {
  addUser,
  getAllUsersByIDs,
  getAllUsersWithLimitAndOffset,
  getAllUsersWithOffset,
  getUserById,
  updateUser,
  deleteUser
};
