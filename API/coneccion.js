var mysql = require('mysql');

/*Variables de entorno para la conexion con la BD*/
const DBHOST = process.env.DBHOST || "localhost";
const USER = process.env.DBUSERNAME || "root";
const PASS = process.env.DBPASSWORD || "1234";
const DBNAME = process.env.DBNAME || "proyecto";

var connection = mysql.createConnection({
    host: DBHOST,
    user: USER,
    password: PASS,
    database: DBNAME
});

module.exports = connection;