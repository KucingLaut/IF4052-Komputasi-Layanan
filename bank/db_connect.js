var pg = require('pg');
var pool;
var config = {
    user: 'postgres',
    host: 'localhost',
    database: 'bank',
    password: 'silvias15saleens7',
    port: 5432,
};

module.exports = {
    getPool: function() {
        if (pool) return pool;
        pool = new pg.Pool(config);
        return pool;
    },
    transaction: async function(callback) {
        pool = this.getPool();
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            try {
                await callback(client);
                client.query('COMMIT');
                return 0;
            } catch {
                client.query('ROLLBACK');
                return -1;
            }
        } finally {
            client.release();
        }
    }
}