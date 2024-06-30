const {query, queryWP } = require("./default");

async function addCourse({
    courseName,
    courseDescription,
    instructor,
    whatYouWillLearn,
    price,
    tag,
    category,
    thumbnail,
    status,
    instructions,
  }) {
      const sql = `INSERT INTO MCSC.Courses (course_name, course_description, instructor, what_you_will_learn, price, tag, category, thumbnail, status, instructions)
VALUES(:courseName, :courseDescription, :instructor, :whatYouWillLearn, :price, :tag, :category, :thumbnail, :status, :instructions)`;
     
return query(sql, {courseName, courseDescription, instructor, whatYouWillLearn, price, tag, category, thumbnail, status, instructions
      }, "Cat.js: Failed to fetch all categories", "All selected");
    
  }

  async function getCourses({id=-1}){
    if(id<0){
      const sql = `SELECT * FROM MCSC.COURSES`;
      const res = queryWP(sql, "Failed to fetch all courses (nb from getCourses func)", "Fetched all courses")  
      console.log(res);
      return res;
    }
    else{
      const sql = `SELECT * FROM MCSC.COURSES WHERE COURSE_ID = :id`;
      const res = query(sql, {id}, "Failed to fetch the course no" + id + " (nb from getCourses func)", "Fetched all courses")  
      console.log(res);
      return res;
    }
  }
  async function getPubCourses(){
    const sql = `SELECT A.course_name, A.instructor, A.price, A.thumbnail, B.Rating, B.Review FROM MCSC.COURSES A, MCSC.RATINGANDREVIEWS B WHERE A.STATUS = 'Published' AND A.COURSE_ID = B.COURSE_ID`
    const res = query(sql, "Failed to fetch Published courses", "Fetched all published courses")
    console.log("from getPubCourses: ", res);
    return res;
  }

  module.exports = {
    addCourse,
    getCourses,
    getPubCourses
  }