const { query, queryWP } = require("./default");
const { connection } = require("../database");

async function addCourse(
  courseName,
  courseDescription,
  instructor,
  whatYouWillLearn,
  price,
  tag,
  category,
  thumbnail,
  status,
  instructions
) {
  try {
    const db = connection();
    // Begin transaction
    await db.execute("BEGIN");

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
        tag: tag.join(","), // Convert array to comma-separated string
        category,
        thumbnail,
        status,
        instructions: instructions.join(","), // Convert array to comma-separated string
        courseId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
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
        instructorId: courseDetails.instructor,
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
        categoryId: courseDetails.category,
      },
      { autoCommit: false }
    );

    // Commit transaction
    await db.commit();

    console.log("Course Created Successfully with ID:", newCourseId);

    return {
      success: true,
      data: {
        COURSE_ID: newCourseId,
        ...courseDetails,
      },
      message: "Course Created Successfully",
    };
  } catch (error) {
    // Rollback transaction in case of error
    if (db) {
      await db.rollback();
    }
    console.error("Failed to create course:", error);
    return {
      success: false,
      message: "Failed to create course",
      error: error.message,
    };
  } finally {
    // Close the db
    if (db) {
      await db.close();
    }
  }
}

async function addCourseToCat(courseId, categoryId) {
  const sql = `UPDATE MCSC.CATEGORY SET COURSES = CASE WHEN COURSES IS NULL THEN :courseId ELSE COURSES || ',' || :courseId END WHERE CATEGORY_ID = :categoryId`;
  let res = query(
    sql,
    { courseId, categoryId },
    "Failed to insert course to category",
    "Inserted course to category"
  );
  console.log(res);

  const sql2 = `INSERT INTO MCSC.COURSES (COURSE_ID, CATEGORY) VALUES (:courseId, :categoryId)`;
  res = query(
    sql,
    { courseId, categoryId },
    "Failed to insert course to category",
    "Inserted course to category"
  );
  console.log(res);
  return res;
}

async function insertCourseToinstr(courseId, instructorId) {
  sql = `INSERT INTO MCSC.Instructor(COURSE_ID, INSTRUCTOR_ID) VALUES (:courseId, :instruct`;
  res = query(
    sql,
    { courseId: courseId, instructorId: instructorId },
    "Failed to insert course to instructor",
    "Inserted course to instructor"
  );
  console.log(res);
  return res;
}

async function insertCourseToUser(courseId, studentId) {
  sql = `INSERT INTO MCSC.Course_StudentsEnrolled(COURSE_ID, STUDENT_ID) VALUES (:courseId, :studentId`;
  res = query(
    sql,
    { courseId: courseId, studentId: studentId },
    "Failed to insert course to instructor",
    "Inserted course to instructor"
  );
  console.log(res);
  return res;
}

async function getCourses({ id = -1 }) {
  if (id < 0) {
    const sql = `SELECT * FROM MCSC.COURSES`;
    const res = queryWP(
      sql,
      "Failed to fetch all courses (nb from getCourses func)",
      "Fetched all courses"
    );
    console.log(res);
    return res;
  } else {
    const sql = `SELECT * FROM MCSC.COURSES WHERE COURSE_ID = :id`;
    const res = query(
      sql,
      { id },
      "Failed to fetch the course no" + id + " (nb from getCourses func)",
      "Fetched all courses"
    );
    console.log(res);
    return res;
  }
}

async function getCourseDetails(courseId) {
  const sql = ` SELECT
    "A1"."COURSE_NAME"         "COURSE_NAME",
    "A1"."COURSE_DESCRIPTION"  "COURSE_DESCRIPTION",
    "A1"."INSTRUCTOR"          "INSTRUCTOR",
    "A1"."WHAT_YOU_WILL_LEARN" "WHAT_YOU_WILL_LEARN",
    "A1"."PRICE"               "PRICE",
    "A1"."THUMBNAIL"           "THUMBNAIL",
    "A1"."STATUS"              "STATUS",
    "A1"."CREATED_AT"          "CREATED_AT",
    "A1"."CATEGORY"            "CATEGORY",
    "A1"."SOLD"                "SOLD",
    "A1"."TAG"                 "TAG",
    "A1"."INSTRUCTIONS"        "INSTRUCTIONS",
    "A1"."POINTS"              "POINTS",
    R.RATING,
    R.REVIEW,
    U.FIRST_NAME,
    U.LAST_NAME,
    U.IMAGE,
    U.EMAIL,
    S.VIDEO_URL,
    S.TITLE,
    S."DESCRIPTION"
FROM
    "MCSC"."COURSES" "A1",
    MCSC.RATINGANDREVIEWS R,
    MCSC.INSTRUCTOR I,
    MCSC.USERS U,
    MCSC.SUBSECTION S
WHERE
    "A1"."COURSE_ID" = :courseId AND
    A1.COURSE_ID = R.COURSE_ID AND
    I.COURSES = A1.COURSE_ID AND
    U.USER_ID = I.INSTR_ID AND
    S.COURSE_ID = A1.COURSE_ID
    `;

    const res = query(sql, { courseId:courseId }, "Failed to fetch course details", "Fetched course details");
    console.log("course details from backend: ",res);
    return res;
}

async function getPubCourses() {
  const sql = `SELECT A.course_name AS "courseName", A.instructor, U.first_name AS "firstName", U.last_name AS "lastName", U.image, U.email, A.price, A.thumbnail, 
  B.Rating, B.Review, COUNT(C.STUDENT_ID) AS "studentsEnrolled" FROM MCSC.COURSES A, MCSC.Users U, MCSC.RATINGANDREVIEWS B, MCSC.Course_StudentsEnrolled C 
  WHERE A.STATUS = 'Published' AND A.COURSE_ID = B.COURSE_ID AND A.instructor = U.user_id AND C.COURSE_ID = A.COURSE_ID 
  GROUP BY A.course_name, A.instructor, U.first_name, U.last_name, U.image, U.email ,A.price, A.thumbnail, B.Rating, B.Review 
  ORDER BY A.course_name ASC`;
  const res = queryWP(
    sql,
    "Failed to fetch Published courses",
    "Fetched all published courses"
  );
  console.log("from getPubCourses: ", res);
  return res;
}


async function getCourseProgress(courseId, studentId){
  const sql = `SELECT 
    COUNT(P.completed_videos) AS completed_videos_count, 
    COUNT(S.video_url) AS total_videos, 
    CASE
        WHEN COUNT(S.video_url) = 0 THEN 0
        ELSE (COUNT(P.completed_videos) / COUNT(S.video_url))*100
    END AS completion_ratio
FROM 
    MCSC.COURSEPROGRESS P, 
    MCSC.SUBSECTION S 
WHERE 
    P.COURSE_ID = :courseId
    AND P.USER_ID = :studentId
    AND S.COURSE_ID = P.COURSE_ID
GROUP BY 
    P.completed_videos

  `;
  const res = query(
    sql,
    { courseId: courseId, studentId: studentId },
    "Failed to fetch course progress",
    "Fetched all course progress"
  );
  console.log("from getCourseProgress: ", res);
  return res;

}

module.exports = {
  addCourse,
  getCourses,
  getPubCourses,
  getCourseDetails,
  addCourseToCat,
  insertCourseToinstr,
  getCourseProgress,
  insertCourseToUser,
};
