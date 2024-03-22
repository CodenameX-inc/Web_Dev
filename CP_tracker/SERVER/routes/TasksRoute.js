import {express, DB_PATH, cors, fs, bodyParser, rootDir, PORT} from '../config.js';

import { addTask, updateTask, getAllTasks, deleteTask} from '../database/database.js';
const app = express();
// Use bodyParser middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// import * as pages from '../consts/links.js';
const router = express.Router();

// let CN = 
// [
//   "Data", "DSA", "Algorithms", "Database", "AI", "Machine", "NLP", "C++", "Java", "Python", "Machine-Learning", "ML", "Programming", "Software", "Computer", "CSE"
// ]

// function cpr(courseName)
// {
//   const departmentCode = courseName.match(/[A-Z]+/)[0]; 
//   const uniqueIdentifier = Math.floor(Math.random() * 10); 
//   const courseId = `${departmentCode}-${uniqueIdentifier}`;
//   return courseId;
// }

createDB();    //create DB if not exists
createTable(); //create table if not exists


// dotenv.config();
router.get('/', (req, res) => {
  console.log(`got GET request : ${req.statusMessage}`);
//   res.sendFile(pages.homePageLink, {root: rootDir});
  res.send({ message: 'Welcome to the CP tracker API!' });
});

router.get("/login", (req, res) => {
  // res.sendFile(pages.loginPageLink, {root: rootDir});
});
router.get("/signup", (req, res) => {
  // res.sendFile(pages.signupPageLink, {root: rootDir});
});

router.get('/all-tasks', (req, res) => {
  let TaskList={};
  // res.sendFile(pages.coursesPage, {root: rootDir});
  res.setHeader('Content-Type', 'text/html');
  const msg = { "error-message": "Error fetching tasks." }; // Default error message
  if (!fs.existsSync(DB_PATH)) {
      fs.closeSync(fs.openSync(DB_PATH, 'w'));
      console.log("Sqlite database created!");
      msg["error-message"] = "DB didn't exist, so new created";
      res.status(500).json(msg);
  } else {
    TaskList = getAllTasks();
      // res.sendFile(pages.coursesPage, {root: rootDir});
  }
});

function determinePlatform(tUrl) {
  const parts = tUrl.split('.')[0].split('//'); //split strings based on '.' and then split on '//'
  const platform = parts[1] || parts[0]; // Use the second part if the first part is empty
  return platform; // Return the extracted platform
}


router.post('/add-tasks', (req,res)=>
{
  const errMsg = {message: "error"};
  res.setHeader('Content-Type', 'application/json');
  const { taskName, taskURL, platform } = req.body;
  //TODO: implement function in Database to get Task name from Codeforces/OJ API
  if(!taskName || !taskURL) {
    errMsg["message"]="task name/url not added"
    return res.status(400).send(errMsg);
  }
  if(taskURL && !platform){
    platform=determinePlatform(taskURL);
  }
  //DONE: implement function to determine which OJ is used to set platform
  const data ={
    'taskName': taskName,
    'taskURL': taskURL,
    'platform': platform,
  }
  
  console.log("data inserted: \n"+data);
  var msg = addTask(data); //send to DB to add data 
  
  if(Object.keys(msg)[0]==='error'){
    res.status(500).send(msg);
  }else if(Object.keys(msg)[0]==='message'){
    res.status(200).send(msg);
  }else{
    res.status(400);
  }
});
router.put('/update-task/:uid',(req,res)=>{
  res.setHeader('Content-Type', 'application/json');
  const taskID = req.params.uid;
  console.log(`Task ID: ${taskID}`);
  const {taskName, taskURL} = req.body;
  const platform = determinePlatform(taskURL);
  var updated = updateTask(taskName, taskURL, platform, taskID); 
  
  if(!updated){
    res.status(500).send({error:"FAILED to update Task with ID"+ taskID+"\n"});
  }else {
    res.status(201).send({message:"Task with ID"+ taskID+" updated\n"});
  }
});

router.delete('/delete-task/:taskID', (req, res)=>{
  const taskID = req.params.taskID;
  var msg = deleteTask(taskID);
  if(Object.keys(msg)[0]==='error'){
    res.status(500).send(msg);
  }else if(Object.keys(msg)[0]==='message'){
    res.status(200).send(msg);
  }else{
    res.status(400);
  }
});

export default router;