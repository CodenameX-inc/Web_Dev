

export async function CreateUser(user){
    const db = await connection();
    const sql = 'INSERT INTO MCSC.USERS ("FULLNAME", "EMAIL", "PASSWORD") VALUES ( :usr, :em, :ps )';
    try{
        const res = await db.execute(sql, {
            usr: user.username,
            em: user.email,
            ps: user.password
        });
        await db.commit();
        console.log("User \n:", user);
        console.log("the res: "+ res);
        console.log('Signup successful');
        return (res).rowsAffected;
    }
    catch(err){
        
        console.log('Signup failed');
        console.log("Error happened while registering the user, error:\n"+err.message);
        return null;
    }
    finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error: "+e.message);}
        }
    }
}
export async function getUserID(email){
    const db = await connection();
    const sql = `SELECT "USERID" FROM USERS WHERE "EMAIL" = :val1`;
    try {
        const res = await db.execute(sql, {
            val1: email
        });
        await db.commit();

        if (res.rows.length === 0) {
            console.log("User not found");
            return null;
        }

        const retrievedUser = res.rowsAffected;
        // console.log("USER FOUND:", retrievedUser.userID, retrievedUser.email, retrievedUser.password);
        
        return retrievedUser;
    } catch (e) {
        console.log("Error:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.log("Error: " + e.message);
            }
        }
    }
}
export async function getUser(userid){
    const db = await connection();
    let res;
    const sql = `SELECT "EMAIL", "IMAGE", "FULLNAME" FROM USERS WHERE "USERID" = :val1`;
    try {
        res = await db.execute(sql, {
            val1: userid
        });
        await db.commit();

        if (res.rows.length === 0) {
            console.log("User not found");
            return null;
        }

        const retrievedUser = res.rows;
        console.log("from server: USER: ",retrievedUser);
        // console.log("USER FOUND:", retrievedUser.userID, retrievedUser.email, retrievedUser.password);
        
        return retrievedUser;
    } catch (e) {
        console.log("Error:", e.message);
        return null;
    } finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.log("Error: " + e.message);
            }
        }
    }
}
//TODO: MOVE Tasks info to TaskList
export async function LoginUser(user) {
    const db = await connection();
    const sql = `SELECT * FROM USERS WHERE "EMAIL" = :val1`;
    try {
        const res = await db.execute(sql, {
            val1: user.email
        });
        // await db.commit();

        if (res.rows.length === 0) {
            console.log("User not found");
            return null;
        }
        const retrievedUser = res.rows[0];
        console.log(res.rows);
        
        // console.log(JSON.stringify(retrievedUser))
        // console.log("USER FOUND:", retrievedUser.USERID, retrievedUser.EMAIL, retrievedUser.PASSWORD);
        
        return retrievedUser;
    } catch (e) {
        console.log("Error:", e.message);
        return null;
    } finally {
        // await db.close();
        // if (db) {
        //     try {
        //         await db.close();
        //     } catch (e) {
        //         console.log("Error: " + e.message);
        //     }
        // }
    }
}
