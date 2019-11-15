const BaseError = require('./BaseError');

class BadParams extends BaseError {
  constructor(originalError) {
    super(400, originalError);

    this.name = this.constructor.name;
  }
}

module.exports = BadParams;
