const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'voucher_game',
    password: 'silvias15saleens7'
});

module.exports = pool;