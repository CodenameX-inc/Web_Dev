import { oracledb } from 'oracledb';
import { platform } from 'os';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function createTable() {
    let db;
    try{
        db = connection();
        const sql = `CREATE TABLE IF NOT EXISTS TaskList (
            uid INTEGER PRIMARY KEY AUTOINCREMENT,
            platform VARCHAR(15),
            taskURL VARCHAR(100) NOT NULL,
            taskName VARCHAR(50) NOT NULL,
            status VARCHAR(50) DEFAULT 'Pending',
            Note VARCHAR(300)
        )`;
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

async function connection() {
    // let db="";
    try{
     const db = await oracledb.getConnection({
        user : "admin",
        password : "Abeh_CP_karle_warna_job_nahi_milegi",
        connectString: "localhost/orcl"
    });
    return db;
    }
    catch (e) {
    console.log("ERROR CONNECTING DB: "+e.message);
    return;
    }
}
export async function getAllTasks() {
    createTable();   //create table if not exists
    const db = connection();
    const sql = 'SELECT * FROM TaskList'; 
    try{
        const result = await db.execute(sql);
        const TaskList = result.rows;
        console.log("TaskList:\n"+TaskList);
        await db.close();
        return TaskList;
    }catch(err){
        console.log("Error Inserting data: "+ err.message);
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

export async function getTaskByID(taskID) {
    createTable();   //create table if not exists
    const db = connection();
    const sql = 'SELECT * FROM TaskList WHERE uid = :val1'; 
    try{
        const result = await db.execute(sql, {val1: taskID});
        const TaskList = result.rows;
        console.log("TaskList:\n"+TaskList);
        await db.close();
        return TaskList;
    }catch(err){
        console.log("Error Inserting data: "+ err.message);
        return null;
    } finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error closing DB on Get All Tasks: "+e.message);}
        }
    }
}

export async function addTask(tasks)
{
    var msg={};
    try{
    const db = await connection();
    const sql = 'INSERT INTO TaskList (taskName, taskURL, platform) VALUES (:val1, :val2, :val3)';
    const result = await db.execute(sql, 
    {
        val1:tasks.taskName, 
        val2:tasks.taskURL, 
        val3:tasks.platform
    });
    console.log("Inserted data: \n" + result.rowsAffected);
    await db.close();
    return {message: "Inserted :\n" + tasks};
    // return result.rowsAffected;
    }
    catch(err){
        console.error("Error creating data:", err);
        await db.close();
        return {error : err.message};
    }finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error: "+e.message);}
        }
    }
}
//Update tasks based on uid
export async function updateTask(taskName, taskURL, platform, uid){
    const query='UPDATE TaskList SET taskName = :val1, taskURL = :val2 , platform = :val3 WHERE uid= :val4 ';
    // const any=[taskName,taskURL, platform, uid];
    var msg={};
    const db = await connection();
    try{
        const res = await db.execute(query, {
            val1: taskName,
            val2: taskURL,
            val3: platform,
            val4: uid
        });
        console.log("Updated task " + taskName + "And res:\n");
        console.log(res);
        await db.close();
        return true;
    }
    catch(e){
        console.error("Error updating data:", err);
        await db.close();
        return false;
    }
    finally{
        if(db){
            try{await db.close();}
            catch(e){console.log("Error: "+e.message);}
        }
    }
}

export async function deleteTask(taskID) {
    let db;
    const sql = 'DELETE FROM TaskList WHERE uid = :val1 ';
    var errMsg={error:""};
    try{
        db = connection();
        await db.run(sql,{val1: taskID});
        await db.close();
        return {message:"Deleted task with ID " + taskID+"\n"};
    }
    catch(err){
        console.error("Error deleting data:", err);
        await db.close();
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




