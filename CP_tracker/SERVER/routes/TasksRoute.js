import {express, cors, bodyParser, PORT} from '../config.js';

import { addTask, updateTask, getAllTasks, deleteTask, getTaskByID} from '../database/database.js';
const app = express();
// Use bodyParser middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const router = express.Router();

// createTable(); //create table if not exists
router.get('/', async (req, res) => {
  console.log(`got GET request : ${req.statusMessage}`);
//   res.sendFile(pages.homePageLink, {root: rootDir});
  res.send({ message: 'Welcome to the CP tracker API!' });
});

router.get("/login", async (req, res) => {
  // res.sendFile(pages.loginPageLink, {root: rootDir});
});
router.get("/signup", async (req, res) => {
  // res.sendFile(pages.signupPageLink, {root: rootDir});
});
router.get('/get-task/:taskID', async (req, res) => {
  const uid = req.params.taskID;
  const TaskList = getTaskByID(uid);
  if(TaskList){
    res.status(200).send(TaskList);
  }
  else{
    res.status(400).send({error:"Couldn't find task by ID: "+taskID});
  }
});
router.get('/all-tasks', async (req, res) => {
  // res.sendFile(pages.coursesPage, {root: rootDir});
  // res.setHeader('Content-Type', 'text/html');
  const msg = { "error-message": "Error fetching tasks." }; // Default error message
  let TaskList = getAllTasks();
  // res.sendFile(pages.coursesPage, {root: rootDir});
  if(TaskList){
    res.status(200).send(TaskList);
  }
  else{
    res.status(400).send({error:"Couldn't find any task!"});
  }
});

function determinePlatform(tUrl) {
  const parts = tUrl.split('.')[0].split('//'); //split strings based on '.' and then split on '//'
  const platform = parts[1] || parts[0]; // Use the second part if the first part is empty
  return platform; // Return the extracted platform
}
router.post('/add-tasks', async (req,res)=>
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
router.put('/update-task/:uid',async (req,res)=>{
  res.setHeader('Content-Type', 'application/json');
  const taskID = req.params.uid;
  console.log(`Task ID: ${taskID}`);
  const {taskName, taskURL, status, note} = req.body;
  const platform = determinePlatform(taskURL);
  var Task = updateTask(taskName, taskURL, platform, status, note, taskID); 
  if(Task){
    res.status(200).send(Task);
  }else{
    res.status(400);
  }
  
});

router.delete('/delete-task/:taskID', async (req, res)=>{
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