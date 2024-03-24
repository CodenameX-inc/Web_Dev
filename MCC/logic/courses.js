import '../server/database.js'
import { getAllCourses } from '../server/database.js';

function showAllData()
{
  let courseList = getAllCourses();
  // Fetch course data from the database
  let boxHTML = '';
  console.log(courseList);
  // Iterate over each course in the courseList array
  courseList.forEach(course => {
      // Generate HTML for each course box and append it to the boxHTML string
      boxHTML += `
          <div class="box">
              <img class="course-logo" src="${course.logo}" alt="${course.name}">
              <div class="course-text">
                  <h2 class="course-name">${course.name}</h2>
                  <p class="course-desc">${course.description}</p>
              </div>
              <a href="http://www.csulb.edu/" target="_blank">
                  <button class="teacher-info">Instructor</button>
              </a>
          </div>
      `;
  });

  // Add the box HTML to the container
  const container = document.getElementById('cardContainer');
  container.innerHTML = boxHTML;
});
}

showAllData();
