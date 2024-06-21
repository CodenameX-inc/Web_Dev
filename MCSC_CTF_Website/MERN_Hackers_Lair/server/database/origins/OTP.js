const oracledb = require('oracledb');
const { connection } = require('./database.js');

// Function to find OTP by email
async function findOTP(email) {
    let db;
    try {
        db = await connection();
        const sql = `SELECT otp FROM MCSC.OTP WHERE "EMAIL" = :val ORDER BY "CREATED_AT" DESC FETCH FIRST 1 ROW ONLY`;
        const res = await db.execute(sql, { val: email });
        
        if (res.rows && res.rows.length > 0) {
            console.log("OTP FOUND: ", JSON.stringify(res.rows));
            return res.rows;
        } else {
            console.log("No OTP found for email:", email);
            return null;
        }
    } catch (e) {
        console.error("Error finding OTP:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.error("Error closing database connection:", e.message);
            }
        }
    }
}

// Function to find OTP by OTP value
async function findThisOTP(otp) {
    let db;
    try {
        db = await connection();
        const sql = `SELECT otp FROM MCSC.OTP WHERE "otp" = :val`;
        const res = await db.execute(sql, { val: otp });
        
        if (res.rows && res.rows.length > 0) {
            console.log("OTP FOUND: ", JSON.stringify(res.rows[0]));
            return res.rows[0];
        } else {
            console.log("No OTP found for OTP:", otp);
            return null;
        }
    } catch (e) {
        console.error("Error finding OTP:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.error("Error closing database connection:", e.message);
            }
        }
    }
}

// Function to add OTP for a given email
async function AddOTP({ otp, email }) {
    let db;
    try {
        db = await connection();
        const sql = `INSERT INTO MCSC.OTP ("EMAIL", "OTP") VALUES (:v1, :v2)`;
        const res = await db.execute(sql, { v1: email, v2: otp }, { autoCommit: true });
        
        if (res.rowsAffected && res.rowsAffected === 1) {
            console.log("OTP INSERTED for email:", email);
            return { email, otp };
        } else {
            console.log("Failed to insert OTP for email:", email);
            return null;
        }
    } catch (e) {
        console.error("Error adding OTP:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.error("Error closing database connection:", e.message);
            }
        }
    }
}

module.exports = {
    findOTP,
    findThisOTP,
    AddOTP
};
