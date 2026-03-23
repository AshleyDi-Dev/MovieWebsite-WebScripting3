// api/db.js

// Import the SQL database
const mysql = require('mysql2');

// Connect to the SQL database using the following credentials, provided by MAMP
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',    
    database: 'movies',
    port: 8889           
});

// Attempt to connect to the database and log the result
db.connect((err) => {
    // If there is an error, show the errror
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    // If successfully connects, show this message
    console.log('Connected to MySQL database');
});

// Export
module.exports = db;