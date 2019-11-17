class authError extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, authError);
  }
}

module.exports = authError;
