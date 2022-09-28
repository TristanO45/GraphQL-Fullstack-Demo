const { Pool } = require('pg')
const { Client } = require('pg')
require('dotenv').config()

const PG_URI = 'postgres://hueucqsd:R_BlEuEVeZb9lPD3OG1Z-urP1pWIhGHO@queenie.db.elephantsql.com/hueucqsd';

const pool = new Pool({
    connectionString: PG_URI,
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
}