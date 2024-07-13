const {query, queryWP } = require("./default");
const {connection} = require("../database")

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
    try{
      const db = connection();
    // Begin transaction
    await db.execute('BEGIN');

    // Insert the new course
    const result = await db.execute(
      `INSERT INTO Courses (course_name, course_description, instructor, what_you_will_learn, price, tag, category, thumbnail, status, instructions)
       VALUES (:courseName, :courseDescription, :instructor, :whatYouWillLearn, :price, :tag, :category, :thumbnail, :status, :instructions)
       RETURNING course_id INTO :courseId`,
      {
        courseName,
        courseDescription,
        instructor,
        whatYouWillLearn,
        price,
        tag: tag.join(','), // Convert array to comma-separated string
        category,
        thumbnail,
        status,
        instructions: instructions.join(','), // Convert array to comma-separated string
        courseId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        /* When using an INSERT statement with a RETURNING clause, and if we want to insert a new record into a table and get back the
         value of certain columns from the newly inserted row. In this case, we want to get the course_id of the newly inserted course.
        This specific line is used to define a bind variable for an INSERT statement with a RETURNING clause.*/
      },
      { autoCommit: false } // Disable auto-commit for transaction
    );

    const newCourseId = result.outBinds.courseId[0];

    // Update the instructor's courses list
    await db.execute(
      `UPDATE Users
       SET courses = CASE WHEN courses IS NULL THEN :courseId
                          ELSE courses || ',' || :courseId
                     END
       WHERE user_id = :instructorId`,
      {
        courseId: newCourseId,
        instructorId: courseDetails.instructor
      },
      { autoCommit: false }
    );

    // Update the category's courses list
    await db.execute(
      `UPDATE Categories
       SET courses = CASE WHEN courses IS NULL THEN :courseId
                          ELSE courses || ',' || :courseId
                     END
       WHERE category_id = :categoryId`,
      {
        courseId: newCourseId,
        categoryId: courseDetails.category
      },
      { autoCommit: false }
    );

    // Commit transaction
    await db.commit();

    console.log('Course Created Successfully with ID:', newCourseId);

    return {
      success: true,
      data: {
        courseId: newCourseId,
        ...courseDetails
      },
      message: 'Course Created Successfully'
    };
  } catch (error) {
    // Rollback transaction in case of error
    if (db) {
      await db.rollback();
    }
    console.error('Failed to create course:', error);
    return {
      success: false,
      message: 'Failed to create course',
      error: error.message
    };
  } finally {
    // Close the db
    if (db) {
      await db.close();
    }
  }

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
    const res = queryWP(sql, "Failed to fetch Published courses", "Fetched all published courses")
    console.log("from getPubCourses: ", res);
    return res;
  }

  module.exports = {
    addCourse,
    getCourses,
    getPubCourses
  }