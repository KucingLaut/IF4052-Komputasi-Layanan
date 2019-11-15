const userModel = require('app/repositories/user');
const paramError = require('app/libs/service-error/BadRequestError');
const bcrypt = require('app/utils/bcrypt');

const validateCreateRequest = data => {
  return (
    validateEmail(data.user_email) &&
    typeof data.username === 'string' &&
    typeof data.password === 'string' &&
    typeof data.user_email === 'string' &&
    typeof data.firstname === 'string' &&
    typeof data.lastname === 'string'
  );
};

const validateUpdateRequest = data => {
  return typeof data.password === 'string';
};

function validateEmail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function getAllUsers(query) {
  if (Object.keys(query).length === 0) {
    return userModel.getAllUsersWithOffset('%%', 0);
  } else if (query.hasOwnProperty('ids')) {
    let arrayOfIDs = query.ids.split(',');
    arrayOfIDs.forEach(changeArrayStrToInt);
    return userModel.getAllUsersByIDs(arrayOfIDs);
  } else if (query.hasOwnProperty('searchKey')) {
    if (query.hasOwnProperty('pageSize') && query.hasOwnProperty('page')) {
      let key = '%' + query.searchKey + '%';
      let limit = parseInt(query.pageSize);
      let offset = parseInt(query.page);
      return userModel.getAllUsersWithLimitAndOffset(key, limit, offset);
    } else if (query.hasOwnProperty('pageSize')) {
      let key = '%' + query.searchKey + '%';
      let limit = parseInt(query.pageSize);
      return userModel.getAllUsersWithLimitAndOffset(key, limit, 0);
    } else {
      let key = '%' + query.searchKey + '%';
      let offset = parseInt(query.page);
      return userModel.getAllUsersWithOffset(key, offset);
    }
  } else {
    if (query.hasOwnProperty('pageSize') && query.hasOwnProperty('page')) {
      let limit = parseInt(query.pageSize);
      let offset = parseInt(query.page);
      return userModel.getAllUsersWithLimitAndOffset('%%', limit, offset);
    } else if (query.hasOwnProperty('pageSize')) {
      let limit = parseInt(query.pageSize);
      return userModel.getAllUsersWithLimitAndOffset('%%', limit, 0);
    } else {
      let offset = parseInt(query.page);
      return userModel.getAllUsersWithOffset('%%', offset);
    }
  }
}

function changeArrayStrToInt(item, index, arr) {
  arr[index] = parseInt(item);
}

function getUserById(id) {
  return userModel.getUserById(id);
}

async function addUser(data) {
  if (validateCreateRequest(data)) {
    data.password = await bcrypt.hash(data.password);

    var respond_user = await userModel.addUser(data);

    return { respond_user };
  } else {
    throw new paramError('Invalid request');
  }
}

function deleteUser(id) {
  return userModel.deleteUser(id);
}

async function updateUser(id, data) {
  if (validateUpdateRequest(data)) {
    data.password = await bcrypt.hash(data.password);
    return userModel.updateUser(id, data);
  } else {
    throw new paramError('Invalid request');
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser
};
