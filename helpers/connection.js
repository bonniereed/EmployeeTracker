//requiring mysql2
const mysql = require('mysql2');
//connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'workplace_db',
});
connection.connect(function (err) {
    if (err) throw err;
    console.log('You are connected as: ' + connection.threadId);
});

module.exports = connection;
