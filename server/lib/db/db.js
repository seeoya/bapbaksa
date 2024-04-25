const DBs = require("./dbs");

const DB = DBs.DB_LOCAL();

switch (CONFIG.NOW_STATE) {
    case "LOCAL":
        DB = DBs.DB_LOCAL();
        break;
    case "DEV":
        DB = DBs.DB_DEV();
        break;
    case "PROD":
        DB = DBs.DB_PROD();
        break;
    default:
        break;
}

DB.connect();

module.exports = DB;
