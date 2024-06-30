const oracledb = require('oracledb');
const { dbConfig } = require('./dbConfig.js');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function connection() {
    try {
        let db = await oracledb.getConnection(dbConfig);
        console.log(db ? "Database connected!" : "Database not connected!");
        return db;
    } catch (e) {
        console.error("ERROR CONNECTING DB: " + e.message);
        throw e;
    }
}

async function closePool() {
    try {
        await oracledb.getPool().close();
        console.log("Connection pool closed.");
    } catch (err) {
        console.error("Error closing connection pool:", err);
    }
}

module.exports = {
    connection,
    closePool
};
