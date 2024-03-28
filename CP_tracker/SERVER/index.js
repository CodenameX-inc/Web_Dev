import { express, cors, bodyParser, PORT, authConfig } from "./config.js";
import { CreateUser } from "./database/database.js";
import bcrypt from "bcrypt";
const app = express();
import tasksRoute from "./routes/TasksRoute.js";

app.use(express.json());
app.use(
  cors({
    origin: "*", // Adjust this to match your frontend's origin
  })
);

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10). //hash pass 10 times or 10 salt rounds
  then((hashedPassword) => {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      };
      const crtUsr = CreateUser(user);
    }).
  catch((e) => {
    res.status(500).send({
      message: "Password was not hashed successfully",
      e,
    });
  }); 



});
//Express middleware
app.use("/tasks", tasksRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
