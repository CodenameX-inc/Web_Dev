import oracledb from 'oracledb';
import { dbConfig } from '../config.js';
import { platform } from 'os';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function connection() {
    // let db="";
    try{
        var db = null;
        db = await oracledb.getConnection(dbConfig);
        console.log(((db)?"Database connected!":"Database not connected!"));
        return db;
    }
    catch (e) {
    console.log("ERROR CONNECTING DB: "+e.message);
    throw e;
    // return;
    }
}

async function createTable() {
    let db;
    try{
        db = await connection();
        const sql = `CREATE TABLE TaskList (
            uid NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            platform VARCHAR2(15),
            taskURL VARCHAR2(100) NOT NULL,
            taskName VARCHAR2(50) NOT NULL,
            status VARCHAR2(50) DEFAULT 'Pending',
            Note VARCHAR2(300)
        );
        `;
        await db.execute(sql);
        console.log("Table created successfully");
    }
    catch(err){
        console.log("Error creating table, err: "+err.message);
    }
    finally{
        if(db){
            try{await db.close();}
            catch(e){console.error("Error closing db on Create Table: "+e.message);}
        }
    }

}
// Call closePool() when done with application
async function closePool() {
    try {
        await oracledb.getPool().close();
        console.log("Connection pool closed.");
    } catch (err) {
        console.error("Error closing connection pool:", err);
    }
}
export async function getAllTasks1(taskID) {
    
    const db = await connection();
    const sql = 'SELECT * FROM TaskList WHERE "uid" = :val1'; 
    try{
        const result = await db.execute(sql, {val1: UserID});
        const TaskList = result.rows;
        var list = [];
        console.log("TaskList:\n");
        for(let i of TaskList){
            list.push({
                uid: i.uid,
                platform: i.platform,
                taskURL: i.taskURL,
                taskName: i.taskName,
                status: i.status,
                note: i.note
            });
        }
        // console.log(list);
        // await db.close();
        return list;
    }catch(err){
        console.log("Error loading data (getAllTasks1): "+ err.message);
        return null;
    } finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error closing DB on Get All Tasks: "+e.message);}
        }
    }
}
// export async function getUser
export async function getAllTasks(UserID) {
    
    const db = await connection();
    const sql = 'SELECT * FROM TaskList WHERE "userID" = :val1'; 
    try{
        const result = await db.execute(sql, {val1: UserID});
        const TaskList = result.rows;
        var list = [];
        console.log("TaskList:\n", TaskList);
        for(let i of TaskList){
            
            list.push({
                uid: i.uid,
                platform: i.platform,
                taskURL: i.taskURL,
                taskName: i.taskName,
                status: i.status,
                note: i.note,
                total: i.TotalTasks,
                pending: i.PendingTask,
                attempted: i.AttemptedTask,
                revisit: i.RevisitTask
            });
        }
        // console.log(list);
        // await db.close();
        return list;
    }catch(err){
        console.log("Error loading data: "+ err.message);
        return null;
    } finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error closing DB on Get All Tasks: "+e.message);}
        }
    }
}
/*
 Call the function to fetch data
getAllTasks()
  .then((TaskList) => {
    //Process fetched data here or perform other operations
    console.log("Fetched data:", TaskList);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
*/

export async function getTaskByID(taskID, userID) {
    // createTable();   //create table if not exists
    const db = await connection();
    const sql = 'SELECT * FROM TaskList WHERE "uid" = :val1 AND "userID" = :val2'; 
    try{
        const result = await db.execute(sql, {val1: taskID, val2: userID});
        const TaskList = result.rows;
        const Task = result.rowsAffected;
        console.log("the Task:\n"+(TaskList||Task));
        await db.commit();
        return TaskList||Task;
    }catch(err){
        console.log("Error Getting data: "+ err.message);
        return null;
    } finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error closing DB on Get All Tasks: "+e.message);}
        }
    }
}

export async function addTask(tasks, userID)
{
    console.log("DB: processing create task: "+JSON.stringify(tasks)+ " user"+userID);
    var db=null;
    if(!tasks.platform) platform="OJ";
    try{
    db = await connection();
    const sql = 'INSERT INTO TaskList ("platform", "taskName", "taskURL", "note", "status", "userID") VALUES (:val1, :val2, :val3, :val4, :val5, :val6)';
    const result = await db.execute(sql, 
    {
        val1: tasks.platform, 
        val2: tasks.taskName, 
        val3: tasks.taskURL,
        val4: tasks.note,
        val5: tasks.status,
        val6: userID   
    });
    db.commit();
    console.log("Inserted data: \n" + result.rowsAffected);
    // await db.close();
    return 200;
    // return result.rowsAffected;
    }
    catch(err){
        console.error("Error creating data:", err);
        // await db.close();
        return 500;
    }finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error: "+e.message);}
        }
    }
}
export async function CreateUser(user){
    const db = await connection();
    const sql = 'INSERT INTO USERS ("FULLNAME", "EMAIL", "PASSWORD") VALUES ( :usr, :em, :ps )';
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
export async function getTaskInfo({userid}){
    const db = await connection();
    const sql = `SELECT * FROM TaskList WHERE "userID" = :val1`;
    try {
        const res = await db.execute(sql, {
            val1: userid
        });
        await db.commit();
        console.log("Task INFO FOUND: ", JSON.stringify(res.rows));
        console.log(res.rows);

        if (res.rows.length === 0) {
            console.log("User not found (FRON GTB)");
            return null;
        }
        const retrievedUser = res.rows;        
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


//Update tasks based on uid
export async function updateTask(taskName, taskURL, platform, status, note, uid){
    const query='UPDATE TaskList SET "taskName" = :val1, "taskURL" = :val2 , "platform" = :val3 , "status" = :val4 , "note" = :val5 WHERE "uid"= :val6 ';
    // const any=[taskName,taskURL, platform, uid];
    var msg={};
    const db = await connection();
    try{
        const res = await db.execute(query, {
            val1: taskName,
            val2: taskURL,
            val3: platform,
            val4: status,
            val5: note,
            val6: uid
        });
        console.log("Updated task " + taskName + "And res:\n");
        console.log(res);
        await db.commit();
        return res.rowsAffected;
    }
    catch(e){
        console.error("Error updating data: ", e.message);
        // await db.close();
        return null;
    }
    finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error: "+e.message);}
        }
    }
}

export async function deleteTask(taskID, userID) {
    let db;
    const sql = 'DELETE FROM TaskList WHERE "uid" = :val1 AND "userID" =:val2';
    var errMsg={error:""};
    console.log("Trying to delete task with ID " + taskID+" from Userid: "+userID)
    try{
        db = await connection();
        // console.log(taskID,
        await db.execute(sql,{val1: taskID, val2:userID});
        await db.commit();
        // await db.close();
        return {message:"Deleted task with ID " + taskID+" from Userid: "+userID};
    }
    catch(err){
        console.error("Error deleting data:", err.message);
        // await db.close();
        return {error:"ERROR deleting task with ID " + taskID+"\n"};
    }
    finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error Closing DB on AddTask: "+e.message);}
        }
    }
    
}
// const cmd_trigger = `CREATE TRIGGER IF NOT EXISTS set_course_id 
//     BEFORE INSERT ON courses
//     BEGIN
//         UPDATE courses
//         SET courseId = NEW.courseId || NEW.uid
//         WHERE rowid = NEW.rowid;
//     END;`;

// createTable();