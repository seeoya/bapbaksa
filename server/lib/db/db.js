const mysql = require("mysql");

const DB = mysql.createConnection({
    //host: "bapbaksa-db.c1qgim0ec6mg.ap-southeast-2.rds.amazonaws.com",
    host: 'localhost',
    port: "3306",
    user: "root",
    //password: "baksa!1234",
    password: "1234",
    database: "DB_BAPBAKSA",
    dateStrings: true,
});

DB.connect();

module.exports = DB;
