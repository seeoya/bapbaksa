const mysql = require("mysql");

const DB = mysql.createConnection({
    host: "bapbaksa-db.c1qgim0ec6mg.ap-southeast-2.rds.amazonaws.com",
    port: "3306",
    user: "root",
    password: "baksa!1234",
    database: "REST",
    dateStrings: true,
});;

DB.connect();

module.exports = DB;
