const BaseError = require('./BaseError');

class DefaultError extends BaseError {
  constructor(originalError) {
    super(500, originalError);

    this.name = this.constructor.name;

    if (JSON.stringify(originalError) === '{}') {
      this.details = `${originalError.name}: ${originalError.message}`;
    } else {
      this.details = originalError;
    }

    this.stack = originalError.stack;
  }
}

module.exports = DefaultError;
