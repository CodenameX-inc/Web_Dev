import { express, cors, bodyParser, PORT, authConfig } from "./config.js";
import { CreateUser, LoginUser, getUserID } from "./database/database.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const app = express();
import tasksRoute from "./routes/TasksRoute.js";
import auth  from "./auth.js";
import cookieParser from 'cookie-parser';

app.use(express.json());
// app.use(
//   cors({
//     origin: "*", // Adjust this to match your frontend's origin
//   })
// );
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
//TODO: Remove if using redux
app.use(cookieParser());

  app.post("/signup", async (req, res) => {
    //TODO: BCRYPT has errors, use better encryption later, for now, use just pass
    bcrypt.hash(req.body.password, 10)//hash pass 10 times or 10 salt rounds
    .then(async (hashedPassword) => {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      };
      const crtUsr = await CreateUser(user);
      if(crtUsr)
      {
        return res.status(201).send({
          message: "User Created successfully"
        })
      }else{
        return res.status(500).send({
          message: "Error Creating user"
        }) 
      }
    })
    .catch((e) => {
    return res.status(500).send({
      message: "Password was not hashed successfully",
      e,
    });
  }); 
  });
  app.post("/login", async (req, res) => {
    try{
    const user = await LoginUser({ //send & receive data from database
      email: req.body.email
    });
    console.log("Req pass:",req.body.password);
    console.log("user pass: ",user.PASSWORD);
    if(user){ //if user exists
      try{
      await bcrypt.compare(req.body.password, user.PASSWORD) //1st param: plaintext, 2nd: hash
      .then((passwordCheck) => {

        // check if password matches
        // TODO: USE ENCRYPTION
        if(!passwordCheck) {
          
          console.log("password doesnt match",req.body.password, user.PASSWORD);
          return res.status(400).send({
            message: "Passwords does not match",
            
          });
        }

      //   create JWT token
      const token = jwt.sign(
        {
          USERID: user.USERID,
          EMAIL: user.EMAIL,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
      res.cookie('token', token);
      return res.status(200).send({
        message: "login success",
        token: token,
        status:1,
        user: JSON.stringify(user)
      });

    })
      } catch(err){
        console.log("Error from Bcrypt: ",err.message);
      }
    }else{
      console.log("FAILED LOGGIN USER");
      return res.status(404).send({
        message: "login failed",
        token:null,
        status:0,
        user:null
      })}
      
    }
    catch(err){
      console.log("error finding user");
      return res.status(500).send({
        email: null,
        token:null,
        status:-1,
        user:null
      })
    }
  });

  app.get('/getUser/:email', async (req, res) => {
    // res.sendFile(pages.coursesPage, {root: rootDir});
    // res.setHeader('Content-Type', 'text/html');
    const email = req.params.email;
    const msg = { "error-message": "Error fetching tasks." }; // Default error message
    let TaskList = await getUserID(email);
    // console.log(TaskList);
    // res.sendFile(pages.coursesPage, {root: rootDir});
    if(TaskList){
      return res.status(200).send(TaskList);
    }
    else{
      return res.status(400).send({error:"Couldn't find the USER"});
    }
  });

//Express middleware
app.use("/tasks", auth, tasksRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
