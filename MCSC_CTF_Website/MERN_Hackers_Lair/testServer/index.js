const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const { createCourse, getAllCourses } = require("./DB_Courses/Course");

dotenv.config();
const PORT = process.env.PORT || 10000;

// Dummy middleware to populate req.user
app.use((req, res, next) => {
  req.user = { id: '00000004120000001' }; // Dummy user ID, replace with actual user info in real app
  next();
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.SITEURL,
    credentials: true,
  })
);

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'server is up and running....'
  });
});

// Route definitions
app.post('/addCourse', createCourse);
app.get('/getAllCourses', getAllCourses);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
