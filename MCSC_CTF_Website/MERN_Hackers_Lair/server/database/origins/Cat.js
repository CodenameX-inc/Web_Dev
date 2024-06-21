const {connection} = require("../database.js");
const { query, queryWP} = require("./default.js");

async function addCategory(name, desc){
    let db;
    const sql = `INSERT INTO MCSC.Category (name, description)
VALUES(:v1, :v2);`;
    try{
        db = connection();
        const res = (await db).execute(sql, {v1:name, v2:desc});
        if(res){
            console.log("category inserted successfully");
            return (await res).rows;
        }
    }catch(e){
        console.log("error from Cat.js")
        console.log("and the error : "+e.message)
    }
    finally {
        if (db) {
            try {
                await db.close();
            } catch (e) {
                console.error("Error closing database connection:", e.message);
            }
        }
    }
}

async function showAllCat(id=-1){
    if(id<=0){
        const sql = `SELECT NAME, DESCRIPTION, COURSES FROM MCSC.CATEGORY`; 
        return queryWP(sql, "Cat.js : Failed to fetch all categories", "All selected");     
    }
    else{
        const sql = `SELECT NAME, DESCRIPTION, COURSES FROM MCSC.CATEGORY WHERE CATEGORY_ID = :v1`; 
        return query(sql, {v1:id}, "Cat.js : Failed to fetch all categories", "$id selected");         
    }
}

async function showCatWithCourse(id){
    const sql = `SELECT c.course_id, c.course_name, c.course_description, r.review, r.rating
                FROM MCSC.Courses c
                JOIN MCSC.Category cat ON c.category = cat.category_id
                LEFT JOIN MCSC.RatingAndReviews r ON c.course_id = r.course_id
                WHERE cat.category_id = :v1
                AND c.status = 'Published';`;

    return query(sql, {v1:id}, "Failed to fetch query from showCatWithCourse() in Cat.js", "Category with Courses fetched");
}

async function showCatExcept(id){
    
}

module.exports = {
    addCategory,
    showAllCat,
    showCatWithCourse
}