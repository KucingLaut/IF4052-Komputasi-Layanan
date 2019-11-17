const assert = require('assert');

const BadRequestError = require('app/libs/service-error/BadRequestError');

const convert = require('./convert');

function assertNotNull(object, propertyName) {
  try {
    return assert(
      object[propertyName] != null,
      `${propertyName} should not be null`
    );
  } catch (error) {
    throw new BadRequestError(error);
  }
}

function toInteger(value) {
  try {
    return convert.toInteger(value);
  } catch (error) {
    throw new BadRequestError(error);
  }
}

module.exports = {
  assertNotNull,
  toInteger
};
