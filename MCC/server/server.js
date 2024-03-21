import express from 'express'
import cors from 'cors'
// import dotenv = require('dotenv')
import fs from 'fs'
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.resolve(__dirname, '..');

const PORT = 3000;
const DB_PATH = '../courses/courses.sqlite'; 
const app = express();
// Use bodyParser middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// app.use(express.json());
// require('dotenv').config();
// Connect to the SQLite database
// const { open } = sqlite3.verbose();
import { db, createDB, createTable, connection} from './database.js';
import * as pages from '../consts/links.js';

createDB();
// dotenv.config();
app.get('/', (req, res) => {
  console.log(`got GET request : ${req.statusMessage}`);
  res.sendFile(pages.homePageLink, {root: rootDir});
  // res.send({ message: 'Welcome to the Academic Courses API!' });
});

let CN = 
[
  "Data", "DSA", "Algorithms", "Database", "AI", "Machine", "NLP", "C++", "Java", "Python", "Machine-Learning", "ML", "Programming", "Software", "Computer", "CSE"
]



app.get('/courses/all-courses', (req, res) => {
  res.sendFile(pages.coursesPage, {root: rootDir});
  res.setHeader('Content-Type', 'application/json');
  const msg = { "error-message": "Error fetching courses." }; // Default error message
  if (!fs.existsSync(DB_PATH)) {
      fs.closeSync(fs.openSync(DB_PATH, 'w'));
      console.log("Sqlite database created!");
      msg["error-message"] = "DB didn't exist, so new created";
      res.status(500).json(msg);
  } else {
      createTable();
      db.all('SELECT courseId, courseName, instructor FROM courses', (err, rows) => { // <-- Here's where err is being used
          if (err) {
              console.error('Error fetching courses:', err.message);
              res.status(500).json(msg);
          } else {
              const courseList = rows;
              console.log(courseList);
              try{
              res.status(200).render('courses', {courseList});
              }catch (err) {
                console.error('Error fetching course data:', err);
                res.status(500).send('Internal Server Error');
            }

          }
      });
  }
});

function cpr(courseName)
{
  const departmentCode = courseName.match(/[A-Z]+/)[0]; 
  const uniqueIdentifier = Math.floor(Math.random() * 10); 
  const courseId = `${departmentCode}-${uniqueIdentifier}`;
  return courseId;
}
app.post('/courses/add-course', (req,res)=>
{
  
  res.setHeader('Content-Type', 'application/json');
  // const db = connection();
  const { courseName, instructor } = req.body;
  // let courseName = req.params.all;
  console.log(courseName);
  console.log(`instructor name ${instructor}`);
  const coursePrefix = courseName ? cpr(courseName) : 'CSE-'; 
  db.run('INSERT INTO courses (courseId, courseName, instructor) VALUES (?, ?, ?)', [coursePrefix, courseName, instructor], function(err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send({ "error-message": err.message });
            return;
        }
        // console.log(`A row has been inserted with courseId: ${coursePrefix}${this.lastID}`);
        const data = {
          'courseId': `${coursePrefix}${this.lastID}`,
          'courseName': courseName,
          'instructor': instructor,
        };
        console.log("data inserted: \n");
        console.log(data);
        res.status(200).send(data);
    });
});

app.put('/courses/update-course/:courseID',(req,res)=>{
  res.setHeader('Content-Type', 'application/json');
  const courseID = req.params.courseID;
  console.log(`courseID: ${courseID}`);
  const {courseName, instructor} = req.body;
  const desc = req.body.description;
  // const db = connection();
  let query;
  let any=[];
  if(desc)
  {
    console.log(`course updated & description added, desc: ${desc}`);
    query='UPDATE courses SET courseName=?, instructor=?, description=? WHERE courseId=?';
    any=[courseName,instructor,description,courseID];
  } 
  else
  {
    console.log(`course updated w/o description`);
    query='UPDATE courses SET courseName=?, instructor=? WHERE courseId=?';
    any=[courseName,instructor,courseID];
  }
  db.run(query, any, (err)=>{
    if (err) {
      console.error('Error updating course:', err.message);
      res.status(500).json({ error: 'Failed to update course' });
    } else {
      // console.log(`Course with ID ${courseId} updated successfully`);
      const msg = {
        "courseId": courseID, 
        "courseName": courseName, 
        "instructor": instructor
      };
      console.log(`this is the update: ${JSON.stringify(msg)}`);
      res.status(200).send(msg);
    }
  });
  
});

app.delete('/courses/delete-course/:courseID', (req, res)=>{
  const courseID = req.params.courseID;
  const sql = 'DELETE FROM courses WHERE courseID=?';
  db.run(sql,[courseID], (err)=>{
    if (err) {
      console.error('Error deleting course:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      // console.log(`Course with ID ${courseId} updated successfully`);
      const msg = {
        "message": "Course with ID "+courseID+" deleted successfully."
      };
      console.log(msg);
      res.status(200).send(msg);
    }
  });
  
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});