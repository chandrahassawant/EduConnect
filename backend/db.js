const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Pass@123',
  database: 'school_assignment_project',
  connectionLimit: 10 // Adjust the connection limit as needed
});

// Export the pool
module.exports = pool;