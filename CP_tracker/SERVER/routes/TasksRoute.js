import {express, cors, bodyParser, PORT} from '../config.js';
import bcrypt from 'bcrypt';
import { addTask, updateTask, getAllTasks, deleteTask, getTaskByID} from '../database/database.js';
const app = express();
// Use bodyParser middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const router = express.Router();
// const dotenv = require('dotenv');
// dotenv.config();

// const {OAuth2Client} = require('google-auth-library');


// router.post('/', async function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Referrer-Policy','no-referrer-when-downgrade');

//   const redirectUrl = 'http://127.0.0.1/oauth';
//   const oAuth2Client = new OAuth2Client()
//   /* res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Content-Type', 'application/json');
//   res.send({message: "Hello"});*/
// //TODO: IMPLEMENT OTHER FUNCTIONALITIES, LIKE SHOWING HOMEPAEG 
// });

router.get('/get-task/:taskID', async (req, res) => {
  const uid = req.params.taskID;
  const TaskList = await getTaskByID(uid);
  if(TaskList){
    console.log("Server received task: "+TaskList);
    res.status(200).send(TaskList);
  }
  else{
    res.status(400).send({error:"Couldn't find task by ID: "+uid});
  }
});
router.get('/all-tasks', async (req, res) => {
  // res.sendFile(pages.coursesPage, {root: rootDir});
  // res.setHeader('Content-Type', 'text/html');
  const msg = { "error-message": "Error fetching tasks." }; // Default error message
  let TaskList = await getAllTasks();
  // console.log(TaskList);
  // res.sendFile(pages.coursesPage, {root: rootDir});
  if(TaskList){
    res.status(200).send(TaskList);
  }
  else{
    res.status(400).send({error:"Couldn't find any task!"});
  }
});
function determinePlatform(tUrl) {
  // var m = (tUrl || sp.targetUrl()).match(/^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*)(?::([^\/?#:]*))?@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/),
  //   r = {
  //       // hash: m[10] || "",                   // #asd
  //       host: m[3] || "",                    // localhost:257
  //       hostname: m[6] || "",                // localhost
  //       // href: m[0] || "",                    // http://username:password@localhost:257/deploy/?asd=asd#asd
  //       // origin: m[1] || "",                  // http://username:password@localhost:257
  //       // pathname: m[8] || (m[1] ? "/" : ""), // /deploy/
  //       // port: m[7] || "",                    // 257
  //       protocol: m[2] || "",                // http:
  //       // search: m[9] || "",                  // ?asd=asd
  //       // username: m[4] || "",                // username
  //       // password: m[5] || ""                 // password
  //   };
  //   if (r.protocol.length == 2) {
  //       r.protocol = "file:///" + r.protocol.toUpperCase();
  //       r.origin = r.protocol + "//" + r.host;
  //   }
  //   // r.href = r.origin + r.pathname + r.search + r.hash;
    return "OJ";
}
router.post('/add-task', async (req,res)=>
{
  const errMsg = {message: "error"};
  res.setHeader('Content-Type', 'application/json');
    // var { taskName, taskURL, platform } = req.body;
    var taskName = req.body.taskName;
    var taskURL = req.body.taskURL;
    var platform = req.body.platform;
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
    taskName: taskName,
    taskURL: taskURL,
    platform: platform,
  }
  
  console.log("data inserted: \n"+data.platform);
  var msg = await addTask(data); //send to DB to add data 
  
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
  const task = req.body;
  console.log(`Task ID: ${task.uid}`);
  console.log(task);
  const platform = determinePlatform(task.taskURL);
  var Task = await updateTask(task.taskName, task.taskURL, platform, task.status, task.note, task.uid); 
  if(Task){
    res.status(200);
  }else{
    res.status(400);
  }
  
});

router.delete('/delete-task/:uid', async (req, res)=>{
  const uid = req.params.uid;
  var msg = await deleteTask(uid);
  if(Object.keys(msg)[0]==='error'){
    res.status(500).send(msg);
  }else if(Object.keys(msg)[0]==='message'){
    res.status(200).send(msg);
  }else{
    res.status(400);
  }
});

export default router;