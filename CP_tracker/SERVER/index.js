import { express, cors, bodyParser, PORT, authConfig } from "./config.js";
import { CreateUser, LoginUser } from "./database/database.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const app = express();
import tasksRoute from "./routes/TasksRoute.js";

app.use(express.json());
app.use(
  cors({
    origin: "*", // Adjust this to match your frontend's origin
  })
);

app.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10)//hash pass 10 times or 10 salt rounds
  .then((hashedPassword) => {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      };
      const crtUsr = CreateUser(user);
      if(crtUsr)
      {
         res.status(201).send({
          message: "User Created successfully"
         })
      }else{
        res.status(500).send({
          message: "Error Creating user"
         }) 
      }
    })
    .catch((e) => {
    res.status(500).send({
      message: "Password was not hashed successfully",
      e,
    });
  }); 
});
  app.post("/login", (req, res) => {
    const user = LoginUser({ //send & receive data from database
      email: req.body.email
    });
    console.log("the user pass: ",user.password);
    if(user){ //if user exists
      bcrypt.compare(req.body.password, user.password)
      .then((passwordCheck) => {

        // check if password matches
        if(!passwordCheck) {
          return response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        }

      //   create JWT token
      const token = jwt.sign(
        {
          userID: user.userID,
          email: user.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
      res.status(200).send({
        email: user.email,
        token,
      });

    })
    }else{
      console.log("FAILED LOGGIN USER");
      res.status(404)
    }
  });



//Express middleware
app.use("/tasks", tasksRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
