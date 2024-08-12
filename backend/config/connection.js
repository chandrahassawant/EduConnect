const mysql = require('mysql2');

var connectionParams = {
    host: 'localhost',
    user: 'root',
    password: 'Pass@123',
    port: '3306',
    database: 'schoolhomework'

}

const sql = mysql.createConnection(connectionParams);

const knex = require('knex')({
    client: 'mysql',
    connection: connectionParams
})

module.exports = { sql, knex };