const knex = require('knex');

const MySQLError = require('app/libs/service-error/MySQLError');

function executeTransaction(queryExecution) {
  return transaction => {
    queryExecution(transaction)
      .then(transaction.commit)
      .catch(transaction.rollback);
  };
}

async function execute(query) {
  try {
    return await query;
  } catch (error) {
    throw new MySQLError(error);
  }
}

function createKnexObject(config) {
  const knexObject = knex(config);

  knexObject._transaction = knexObject.transaction.bind(knexObject);

  knexObject.transaction = function(queryExecution) {
    const transactionExecution = new Promise((resolve, reject) => {
      knexObject
        ._transaction(executeTransaction(queryExecution))
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });

    return execute(transactionExecution);
  };

  return knexObject;
}

async function single(query) {
  const result = await execute(query);

  if (result.length === 0) {
    return null;
  }

  return result[0];
}

module.exports = {
  reader: createKnexObject({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'soa',
      password: 'service',
      database: 'account_soa',
      port: '3307'
    },
    pool: { min: 0, max: 5 }
  }),
  writer: createKnexObject({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'soa',
      password: 'service',
      database: 'account_soa',
      port: '3307'
    },
    pool: { min: 0, max: 5 }
  }),
  execute,
  single
};
