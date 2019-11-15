const config = require('../../config');

const DefaultError = require('app/libs/service-error/DefaultError');
const ErrorLogger = require('app/libs/logger/ErrorLogger');

const errorLogger = new ErrorLogger(config.ERROR_LOG_PATH);

function logError(err) {
  const errorLogMessage = JSON.stringify(err) + '\n' + err.stack + '\n';
  errorLogger.log(errorLogMessage);
}

module.exports = (err, req, res, next) => {
  try {
    if (err.httpStatus == null) {
      err = new DefaultError(err);
    }

    logError(err);

    return res
      .status(err.httpStatus)
      .json({ message: err.message, details: err.details });
  } catch (err) {
    next(err);
  }
};
