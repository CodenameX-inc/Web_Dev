index.html has index.css for custom styling
and style.css contains the default styling

# Directories:
logic   : contains the business logic codes
courses : the database to store the courses
pages   : the pages of the site (with their corresponding css files) 
assets  : contains the asset images
# Database:
Used SQLite database for storing data
no need for custom initialization, the codes to initialize the database
and the table is made in the code, but in case of any error of the database
not being found, then just create ${courses.sqlite} file in the ${courses} folder