module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3307',
      database: 'account_soa',
      user: 'soa',
      password: 'service'
    },
    pool: {
      min: 0,
      max: 5
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
