import sqlite3 from 'sqlite3';
import fs from 'fs';

const DB_PATH = './courses/courses.sqlite';
export const db = connection();
export function createDB() {
    if (!fs.existsSync(DB_PATH)) {
        fs.closeSync(fs.openSync(DB_PATH, 'w'));
        console.log("SQLite database created!");
    }
}
const cmd_trigger = `CREATE TRIGGER IF NOT EXISTS set_course_id 
    BEFORE INSERT ON courses
    BEGIN
        UPDATE courses
        SET courseId = NEW.courseId || NEW.uid
        WHERE rowid = NEW.rowid;
    END;`;

export function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS courses (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    courseId TEXT NOT NULL,
    courseName TEXT NOT NULL,
    instructor TEXT NOT NULL,
    description TEXT
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

