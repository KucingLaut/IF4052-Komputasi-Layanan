var adminModel = require('app/repositories/admin');
var paramError = require('app/libs/service-error/BadRequestError');
const bcrypt = require('app/utils/bcrypt');

const validateCreateRequest = data => {
  return (
    typeof data.username === 'string' &&
    typeof data.password === 'string' &&
    typeof data.firstname === 'string' &&
    typeof data.lastname === 'string'
  );
};

const validateUpdateRequest = data => {
  return (
    typeof data.password === 'string' &&
    typeof data.firstname === 'string' &&
    typeof data.lastname === 'string'
  );
};

function getAllAdmins(query) {
  if (Object.keys(query).length === 0) {
    return adminModel.getAllAdminsWithOffset('%%', 0);
  } else if (query.hasOwnProperty('ids')) {
    let arrayOfIDs = query.ids.split(',');
    arrayOfIDs.forEach(changeArrayStrToInt);
    return adminModel.getAllAdminsByIDs(arrayOfIDs);
  } else if (query.hasOwnProperty('searchKey')) {
    if (query.hasOwnProperty('pageSize') && query.hasOwnProperty('page')) {
      let key = '%' + query.searchKey + '%';
      let limit = parseInt(query.pageSize);
      let offset = parseInt(query.page);
      return adminModel.getAllAdminsWithLimitAndOffset(key, limit, offset);
    } else if (query.hasOwnProperty('pageSize')) {
      let key = '%' + query.searchKey + '%';
      let limit = parseInt(query.pageSize);
      return adminModel.getAllAdminsWithLimitAndOffset(key, limit, 0);
    } else {
      let key = '%' + query.searchKey + '%';
      let offset = parseInt(query.page);
      return adminModel.getAllAdminsWithOffset(key, offset);
    }
  } else {
    if (query.hasOwnProperty('pageSize') && query.hasOwnProperty('page')) {
      let limit = parseInt(query.pageSize);
      let offset = parseInt(query.page);
      return adminModel.getAllAdminsWithLimitAndOffset('%%', limit, offset);
    } else if (query.hasOwnProperty('pageSize')) {
      let limit = parseInt(query.pageSize);
      return adminModel.getAllAdminsWithLimitAndOffset('%%', limit, 0);
    } else {
      let offset = parseInt(query.page);
      return adminModel.getAllAdminsWithOffset('%%', offset);
    }
  }
}

function changeArrayStrToInt(item, index, arr) {
  arr[index] = parseInt(item);
}

function getAdminById(id) {
  return adminModel.getAdminById(id);
}

async function addAdmin(data) {
  if (validateCreateRequest(data)) {
    data.password = await bcrypt.hash(data.password);
    return adminModel.addAdmin(data);
  } else {
    throw new paramError('Invalid request');
  }
}

function deleteAdmin(id) {
  return adminModel.deleteAdmin(id);
}

async function updateAdmin(id, data) {
  if (validateUpdateRequest(data)) {
    data.password = await bcrypt.hash(data.password);
    return adminModel.updateAdmin(id, data);
  } else {
    throw new paramError('Invalid request');
  }
}

module.exports = {
  getAllAdmins,
  getAdminById,
  addAdmin,
  deleteAdmin,
  updateAdmin
};
