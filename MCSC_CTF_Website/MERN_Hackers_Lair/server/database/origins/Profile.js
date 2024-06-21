const { connection } = require("../database.js");
const { getUserId } = require("./User.js");

async function createProfile(input) {
    const sql = `INSERT INTO MCSC.PROFILE (user_id, gender, dateOfBirth, about, contactNumber) VALUES (:v0, :v1, :v2, :v3, :v4)`;
    let db;
    try {
        db = await connection();
        const res = await db.execute(sql, {
            v0: input.userid,
            v1: input.gender,
            v2: input.dateOfBirth,
            v3: input.about,
            v4: input.contactNumber
        });
        await db.commit();
        console.log("Profile created");
        return res.rows;
    } catch (e) {
        console.error("Profile failed to create");
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

async function findUserProfile(email) {
    const uid = await getUserId(email); // Ensure to await getUserId, assuming it returns a promise
    const sql = `
        SELECT 
            "A2"."USER_ID", "A2"."FIRST_NAME", "A2"."LAST_NAME", "A2"."EMAIL", "A2"."PASSWORD", "A2"."ACCOUNT_TYPE", "A2"."ACTIVE",
            "A2"."APPROVED", "A2"."TOKEN", "A2"."RESET_PASSWORD_EXPIRES", "A2"."IMAGE", "A2"."COURSES", "A2"."COURSE_PROGRESS", "A2"."CONTACTNUMBER",
            "A1"."PROFILE_ID", "A1"."GENDER", "A1"."DATE_OF_BIRTH", "A1"."ABOUT", "A1"."CONTACT_NUMBER"
        FROM
            "MCSC"."USERS" "A2",
            "MCSC"."PROFILE" "A1"
        WHERE
            "A2"."USER_ID" = :val
            AND "A2"."USER_ID" = "A1"."USER_ID"`;
    let db;
    try {
        db = await connection();
        const res = await db.execute(sql, { val: uid });
        if (res.rows.length > 0) {
            console.log("User profile found!");
            return res.rows;
        } else {
            console.log("User profile not found");
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

module.exports = {
    createProfile,
    findUserProfile
};
