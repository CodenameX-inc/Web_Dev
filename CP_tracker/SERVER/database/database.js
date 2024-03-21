import sqlite3 from 'sqlite3';
import fs from 'fs';
import {tableName, DB_PATH} from '../config/database'

export const db = connection();

export function getAllCourses() {
    db.all('SELECT * FROM courses', (err, rows) => { // <-- Here's where err is being used
        if (err) {
            console.error('Error fetching courses:', err.message);
            return (msg);
        } else {
            const taskList = rows;
            console.log(taskList); 
            return (taskList);
        }
    });
}

export function createDB() {
    if (!fs.existsSync(DB_PATH)) {
        fs.closeSync(fs.openSync(DB_PATH, 'w'));
        console.log("SQLite database created!");
    }
}
// const cmd_trigger = `CREATE TRIGGER IF NOT EXISTS set_course_id 
//     BEFORE INSERT ON courses
//     BEGIN
//         UPDATE courses
//         SET courseId = NEW.courseId || NEW.uid
//         WHERE rowid = NEW.rowid;
//     END;`;

export function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS TaskList (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT,
    taskURL TEXT NOT NULL,
    taskName TEXT NOT NULL,
    status TEXT NOT NULL,
    Note TEXT
)`;
    db.run(sql, (err)=>{
      if(err){
        console.log(`Table not created due to error: ${err.message}`);
      }
      else
      {
        console.log(`Table created!`); 
      }
    });
    // db.exec(cmd_trigger);
}

export function connection() {
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error('Error opening SQLite database:', err.message);
        } else {
            console.log('Connected to SQLite database');
            createTable(db); // Call the function to create the table
        }
    });
    return db;
}

