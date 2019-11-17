module.exports = {
  READER_HOST: process.env.READER_HOST
      || process.env.MYSQL_DEFAULT_HOST
      || 'localhost',
  READER_PORT: process.env.READER_PORT
      || process.env.MYSQL_DEFAULT_PORT
      || '3306',
  READER_USER: process.env.READER_USER
      || process.env.MYSQL_DEFAULT_USERNAME,
  READER_PASSWORD: process.env.READER_PASSWORD
      || process.env.MYSQL_DEFAULT_PASSWORD,
  WRITER_HOST: process.env.WRITER_HOST
      || process.env.MYSQL_DEFAULT_HOST
      || 'localhost',
  WRITER_PORT: process.env.WRITER_PORT
      || process.env.MYSQL_DEFAULT_PORT
      || '3306',
  WRITER_USER: process.env.WRITER_USER
      || process.env.MYSQL_DEFAULT_USERNAME,
  WRITER_PASSWORD: process.env.WRITER_PASSWORD
      || process.env.MYSQL_DEFAULT_PASSWORD,
  MIGRATOR_HOST: process.env.KNEX_DB_HOST
      || process.env.MYSQL_DEFAULT_HOST
      || 'localhost',
  MIGRATOR_PORT: process.env.KNEX_DB_PORT
      || process.env.MYSQL_DEFAULT_PORT
      || '3306',
  MIGRATOR_USER: process.env.KNEX_DB_USER
      || process.env.MYSQL_DEFAULT_USERNAME,
  MIGRATOR_PASSWORD: process.env.KNEX_DB_PASSWORD
      || process.env.MYSQL_DEFAULT_PASSWORD,
  KNEX_DB_NAME: process.env.KNEX_DB_NAME,
  ERROR_LOG_PATH: process.env.ERROR_LOG_PATH
      || null
};

