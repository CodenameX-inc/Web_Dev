const { connection } = require("../database.js");
const { query, queryWP } = require("./default.js");

async function addCategory(name, desc) {
  let db;
  const sql = `INSERT INTO MCSC.Category (name, description) VALUES(:v1, :v2)`;
  try {
    db = await connection(); // Await connection
    const res = await db.execute(sql, { v1: name, v2: desc }); // Await execute
    if (res) {
      console.log("Category inserted successfully");
      return res.rows;
    }
  } catch (e) {
    console.log("Error from Cat.js");
    console.log("And the error: " + e.message);
  } finally {
    if (db) {
      try {
        await db.close();
      } catch (e) {
        console.error("Error closing database connection:", e.message);
      }
    }
  }
}

async function showAllCat(id = -1) {
  if (id <= 0) {
    const sql = `SELECT NAME, DESCRIPTION, COURSES FROM MCSC.CATEGORY`;
    return queryWP(sql, "Cat.js: Failed to fetch all categories", "All selected");
  } else {
    const sql = `SELECT NAME, DESCRIPTION, COURSES FROM MCSC.CATEGORY WHERE CATEGORY_ID = :v1`;
    return query(sql, { v1: id }, "Cat.js: Failed to fetch all categories", `${id} selected`);
  }
}

async function showCatWithCourse(id, f = true) {
  if (f) {
    const sql = `SELECT c.course_id AS "COURSE_ID", c.course_name AS "COURSE_NAME", c.course_description AS "COURSE_DESCRIPTION", r.review AS "REVIEW", r.rating AS "RATING"
                FROM MCSC.Courses c
                JOIN MCSC.Category cat ON c.category = cat.category_id
                LEFT JOIN MCSC.RatingAndReviews r ON c.course_id = r.course_id
                WHERE cat.category_id = :v1
                AND c.status = 'Published'`;
    return query(sql, { v1: id }, `Failed to fetch for Category ${id} query from showCatWithCourse() in Cat.js`, "Category with Courses fetched");
  } else {
    const sql = `SELECT c.course_id AS "COURSE_ID", c.course_name AS "COURSE_NAME", c.course_description AS "COURSE_DESCRIPTION", r.review AS "REVIEW", r.rating AS "RATING"
                FROM MCSC.Courses c
                JOIN MCSC.Category cat ON c.category = cat.category_id
                LEFT JOIN MCSC.RatingAndReviews r ON c.course_id = r.course_id
                WHERE cat.category_id <> :v1
                AND c.status = 'Published'`;
    return query(sql, { v1: id }, `Failed to fetch 'all category except category ${id}' query from showCatWithCourse() in Cat.js`, "Category with Courses without the id fetched");
  }
}

async function getMostSellingCourses({ fetchAtmost = 10 }) {
  const sql = `WITH PublishedCourses AS (
    SELECT c.course_id, c.course_name, c.course_description, c.sold, c.instructor, c.category
    FROM MCSC.Courses c
    WHERE c.status = 'Published'
    ),
    CourseDetails AS (
    SELECT c.course_id, c.course_name, c.course_description, c.sold, 
            i.first_name || ' ' || i.last_name AS instructor_name,
            cat.name AS category_name
    FROM PublishedCourses c
    JOIN MCSC.Users i ON c.instructor = i.user_id
    JOIN MCSC.Category cat ON c.category = cat.category_id
    )
    SELECT *
    FROM CourseDetails
    ORDER BY sold DESC
    FETCH FIRST :fetchAtmost ROWS ONLY`;

  return query(sql, { fetchAtmost }, "Failed to fetch All Best selling courses", "Fetched most selling courses");
}

module.exports = {
  addCategory,
  showAllCat,
  showCatWithCourse,
  getMostSellingCourses
};
