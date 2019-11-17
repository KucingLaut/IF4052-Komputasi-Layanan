const BaseError = require('./BaseError');

class MySQLError extends BaseError {
  constructor(originalError) {
    super(500, originalError);

    this.name = this.constructor.name;

    switch (originalError.errno) {
      case 1062:
        this.httpStatus = 400;
        this.message = 'unique key violation';
        break;
      case 1452:
        this.httpStatus = 400;
        this.message = 'foreign key violation';
        break;
      case undefined:
        throw originalError;
      default:
        this.message = 'unhandled mysql error';
    }

    this.details = originalError.sqlMessage;
  }
}

module.exports = MySQLError;
