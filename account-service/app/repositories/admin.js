const { returnOnlyDefinedProps } = require('app/utils/object');
const { reader, writer, execute, single } = require('app/utils/knex');

function getAllAdminsWithOffset(key, offset) {
  const query = reader
    .select()
    .table('admin')
    .where('username', 'like', key)
    .offset(offset);
  return execute(query);
}

function getAllAdminsWithLimitAndOffset(key, limit, offset) {
  const query = reader
    .select()
    .table('admin')
    .where('username', 'like', key)
    .limit(limit)
    .offset(limit * offset);
  return execute(query);
}

function getAllAdminsByIDs(ids) {
  const query = reader
    .select()
    .table('admin')
    .whereIn('id_admin', ids);
  return execute(query);
}

async function getAdminById(id) {
  const query = await reader('admin').where({
    id_admin: id
  });
  return single(query);
}

async function addAdmin(data) {
  const query = writer('admin').insert({
    username: data.username,
    password: data.password,
    firstname: data.firstname,
    lastname: data.lastname,
    created_at: Date.now()
  });

  const adminId = await single(query);

  return { id_admin: adminId };
}

function deleteAdmin(id) {
  const query = writer('admin')
    .where('id_admin', id)
    .del();

  return execute(query);
}

function updateAdmin(id, data) {
  const query = writer('admin')
    .where('id_admin', id)
    .update(
      returnOnlyDefinedProps(data, ['password', 'firstname', 'lastname'])
    );
  return execute(query);
}

module.exports = {
  addAdmin,
  getAdminById,
  getAllAdminsByIDs,
  getAllAdminsWithLimitAndOffset,
  getAllAdminsWithOffset,
  updateAdmin,
  deleteAdmin
};
