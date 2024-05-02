const mysql = require("mysql");
const CONFIG = require("../config/config");

const DBs = {
    DB_LOCAL: () => {
        return mysql.createConnection({
           // host: "14.42.124.125",
           host: "localhost",
           // host: "192.168.56.1",
            port: "3306",
            user: "root",
            password: "1234",
            database: "DB_BAPBAKSA",
            dateStrings: true,
        });
    },

    DB_DEV: () => {
        return mysql.createConnection({
            host: "14.42.124.125",
            port: "3306",
            user: "root",
            password: "1234",
            database: CONFIG.DB_NAME,
            dateStrings: true,
        });
    },

    DB_PROD: () => {
        return mysql.createConnection({
            host: "14.42.124.125",
            port: "3306",
            user: "root",
            password: "1234",
            database: CONFIG.DB_NAME,
            dateStrings: true,
        });
    },
};

module.exports = DBs;
