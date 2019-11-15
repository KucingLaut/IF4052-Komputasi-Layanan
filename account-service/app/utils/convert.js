function toInteger(value) {
  let converted = parseInt(value);
  if (isNaN(converted)) {
    throw new Error(`${value} is not integer.`);
  }
  return converted;
}

function toBoolean(value) {
  switch (typeof value) {
    case 'boolean':
      return value;
    case 'number':
      return !(value === 0);
    case 'string':
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else {
        throw new Error(
          `unknown string ${value} cannot be converted to boolean`
        );
      }
    default:
      throw new Error(`cannot convert ${value} to boolean`);
  }
}

module.exports = {
  toInteger,
  toBoolean
};
