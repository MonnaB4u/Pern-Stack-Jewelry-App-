const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    database: "laloopa",
    password: '1553683'
})
module.exports = pool;
