const { Pool } = require('pg');

const pool = new Pool({
    
   user: 'postgres',
   host: 'localhost',
   database: 'unifor_bd',
   password: 'a123',
   port: 5432,

});

module.exports = pool;