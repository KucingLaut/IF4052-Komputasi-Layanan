class BaseError extends Error {
  constructor(httpStatus, originalError) {
    super(originalError.message);
    this.name = 'UnidentifiedError';
    this.httpStatus = httpStatus;
    this.stack = originalError.stack;
    this.timestamp = new Date(Date.now()).toUTCString();
  }
}

module.exports = BaseError;
