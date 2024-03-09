import express from "express";
import cors from "cors";
import fs from 'fs';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log(`got GET request : ${req.statusMessage}`);
  res.send({ message: 'Welcome to the Courses API!' });
});

app.get('/courses/all-courses', (req, res) => {
  const doesExist = fs.existsSync(path.join(__dirname, '/courses/course-list.json'));
  if (!doesExist){
    return res.status(404).send('Course list not found');
  } else {
    fs.readFile('/courses/course-list.json', 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading course list')
      }
      const courses = JSON.parse(data)
      console.log(courses)
      res.send(courses)
    });
  };
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).catch((err) => {
  console.error(`Error starting server: ${err.message}`)
})