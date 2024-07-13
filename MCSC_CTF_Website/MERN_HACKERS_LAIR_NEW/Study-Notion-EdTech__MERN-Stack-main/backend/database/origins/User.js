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

async function finduserID(userid, instr=false) {
    let sql;
    if(!instr){
        //for use in changePassword() in Auth.js 
        sql = `SELECT * FROM MCSC.USERS WHERE "USER_ID" = :userid`;
        const res = query(sql, {userid}, "User not found", "User found! ");
        return res.rows;
    }else {
        //for use in createCourse() to get instr info in Course.js
        const sql = `SELECT "USER_ID", "FIRST_NAME" || ' '|| "LAST_NAME" AS FULLNAME, "EMAIL" FROM MCSC.USERS WHERE "ACCOUNT_TYPE" = 'Instructor' AND "USER_ID" = :userid`;
        const res = query(sql, {userid}, "Instr not found", "Instr found! ");
        return res.rows;
    }
    }
    async function findInstructor(userid){
        const db = await connection();
        try{
        const sql = `SELECT "USER_ID", "FIRST_NAME" || ' '|| "LAST_NAME" AS FULLNAME, "EMAIL" FROM MCSC.USERS WHERE "ACCOUNT_TYPE" = 'Instructor' AND "USER_ID" = :userid`;
        const res = await db.execute(sql, {
            userid
        });
        return res;}
        catch(e){
            console.error("Error finding instr:", e.message);
            return null;
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
    LoginUser,
    findInstructor
};
