// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'workplace_db',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('You are connected as: ' + connection.threadId);
});

module.exports = connection;
