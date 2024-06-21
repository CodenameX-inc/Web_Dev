const { connection } = require("../database.js");

async function CreateUser(user) {
    let db;
    try {
        db = await connection();
        const sql = `
        INSERT INTO MCSC.Users (first_name, last_name, email, contactNumber, password, account_type, image)
        VALUES (:first_name, :last_name, :email, :contactNumber, :password, :account_type, :image)`;

        const res = await db.execute(sql, {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            contactNumber: user.contactNumber,
            password: user.password,
            account_type: user.account_type,
            image: user.image
        });

        console.log("User:", user);
        console.log("Insert result:", res);

        return getUserID(user.email);
    } catch (e) {
        console.error("Error:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.error("Error:", e.message);
            }
        }
    }
}

async function getUserID(email) {
    let db;
    try {
        db = await connection();
        const sql = `SELECT "USER_ID" FROM MCSC.USERS WHERE "EMAIL" = :val1`;
        const res = await db.execute(sql, {
            val1: email
        });

        if (res.rows.length === 0) {
            console.log("User not found");
            return null;
        }

        const retrievedUser = res.rows[0];
        return retrievedUser;
    } catch (e) {
        console.error("Error:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.error("Error:", e.message);
            }
        }
    }
}

async function finduserID(userid) {
    let db;
    try {
        db = await connection();
        const sql = `SELECT "USER_ID" FROM MCSC.USERS WHERE "USER_ID" = :val1`;
        const res = await db.execute(sql, {
            val1: userid
        });

        if (res.rows.length === 0) {
            console.log("User not found");
            return null;
        }

        const retrievedUser = res.rows[0];
        return retrievedUser;
    } catch (e) {
        console.error("Error:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.error("Error:", e.message);
            }
        }
    }
}

async function updatePassword(userid, password) {
    let db;
    try {
        db = await connection();
        const sql = `UPDATE MCSC.USERS SET "PASSWORD" = :val1 WHERE "USER_ID" = :val2`;
        const res = await db.execute(sql, {
            val1: password,
            val2: userid
        });

        const retrievedUser = res.rowsAffected;
        if (retrievedUser) {
            console.log("Updated User:", retrievedUser);
            return retrievedUser;
        } else {
            return null;
        }
    } catch (e) {
        console.error("Error:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.error("Error:", e.message);
            }
        }
    }
}

async function LoginUser(user) {
    let db;
    try {
        db = await connection();
        const sql = `SELECT * FROM USERS WHERE "EMAIL" = :val1`;
        const res = await db.execute(sql, {
            val1: user.email
        });

        if (res.rows.length === 0) {
            console.log("User not found");
            return null;
        }

        const retrievedUser = res.rows[0];
        console.log(res.rows);

        return retrievedUser;
    } catch (e) {
        console.error("Error:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.error("Error:", e.message);
            }
        }
    }
}

module.exports = {
    CreateUser,
    getUserID,
    finduserID,
    updatePassword,
    LoginUser
};
