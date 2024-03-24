import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.resolve(__dirname, '..');

function getAllCourses()
{
    fetch('/courses/all-courses')
    .then(response => {
        if (!response.ok)
        {
            throw new Error(response.status);
            //TODO: implement error handling
            
        }
        // return response.json();
    })
    .then(courseList => {
        console.log(courseList);
        courseList.forEach(item => {
            
            // Generate HTML for each course box
                const boxHTML = courses.map(course => `
                <div class="box">
                <img class="course-logo" src="${item.logoURL}" alt="${item.courseName}">
                <div class="course-text">
                    <h2 class="course-name">${item.courseName}</h2>
                    <p class="course-desc">${item.description}</p>
                </div>
                <a href="http://www.csulb.edu/" target="_blank">
                    <button class="teacher-info">${item.instructor}</button>
                </a>
                </div>
            `).join('');
            // Add the box HTML to the container
            const container = document.getElementById('container');
            container.innerHTML = boxHTML;
  
        });
    })
    .catch(error => {
        console.error('Error fetching course data:', error);
    });

}
getAllCourses();