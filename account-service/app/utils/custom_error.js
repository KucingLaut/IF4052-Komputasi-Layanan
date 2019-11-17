module.exports = (err, req, res, next) => {
  if (!res.headersSent) {
    if (err.statusCode) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      switch (err.errno) {
        case 1062:
          res.status(500).json({
            message: 'Unique key violation'
          });
          return;
        case 1452:
          res.status(500).json({
            message: 'Foreign key violation'
          });
          return;
        case 'ECONNREFUSED':
          res.status(500).json({
            message: 'Database server is not reachable'
          });
          return;
        default:
          res.status(500).json({
            message: err.message
          });
          return;
      }
    }
  } else {
    next();
  }
};
