import {express, cors, fs, bodyParser, rootDir, PORT} from './config/config.js';
const app = express();
import tasksRoute from './routes/TasksRoute.js'

app.use(express.json());

app.get('/', (req, res) => {
    res.send("WELCOME TO TASKLIST FOR LEETCODE/CF/ATCODER/CODECRAFTERS/CODINGAME!!")
})

//Express middleware
app.use('/tasks', tasksRoute); 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });