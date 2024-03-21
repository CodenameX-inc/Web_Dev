import {express, cors, fs, bodyParser, rootDir, PORT} from './config/config.js';

const app = express();
// Use bodyParser middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
import { db, createDB, createTable, connection} from './database.js';
import * as pages from '../consts/links.js';

let CN = 
[
  "Data", "DSA", "Algorithms", "Database", "AI", "Machine", "NLP", "C++", "Java", "Python", "Machine-Learning", "ML", "Programming", "Software", "Computer", "CSE"
]

function cpr(courseName)
{
  const departmentCode = courseName.match(/[A-Z]+/)[0]; 
  const uniqueIdentifier = Math.floor(Math.random() * 10); 
  const courseId = `${departmentCode}-${uniqueIdentifier}`;
  return courseId;
}

createDB();

const router = express.Router();


// dotenv.config();
router.get('/', (req, res) => {
  console.log(`got GET request : ${req.statusMessage}`);
//   res.sendFile(pages.homePageLink, {root: rootDir});
  res.send({ message: 'Welcome to the Academic Courses API!' });
});

router.get("/login", (req, res) => {
  res.sendFile(pages.loginPageLink, {root: rootDir});
});
router.get("/signup", (req, res) => {
  res.sendFile(pages.signupPageLink, {root: rootDir});
});

router.get('/all-tasks', (req, res) => {
  // res.sendFile(pages.coursesPage, {root: rootDir});
  res.setHeader('Content-Type', 'text/html');
  const msg = { "error-message": "Error fetching courses." }; // Default error message
  if (!fs.existsSync(DB_PATH)) {
      fs.closeSync(fs.openSync(DB_PATH, 'w'));
      console.log("Sqlite database created!");
      msg["error-message"] = "DB didn't exist, so new created";
      res.status(500).json(msg);
  } else {
      createTable();
      res.sendFile(pages.coursesPage, {root: rootDir});
  }
});

router.post('/add-tasks', (req,res)=>
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

router.put('/update-task/:courseID',(req,res)=>{
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

router.delete('/delete-task/:courseID', (req, res)=>{
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

export default router;