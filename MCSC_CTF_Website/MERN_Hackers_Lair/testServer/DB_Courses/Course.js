//TODO: uncomment the following after testing done
const { uploadImageToCloudinary } = require("../utils/imageUploader")
// const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")
const { finduserID, findInstructor } = require("./origins/User")
const {addCourse, getCourses, getPubCourses} = require("./origins/CourseDB")
const {showAllCat} = require("./origins/Cat.js")
// Function to create a new course
exports.createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id
    console.log(req.user.id)
    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body;
    console.log(
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      _tag,
      category,
      status,
      _instructions)
    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage

    // Convert the tag and instructions from stringified Array to Array
    // const tag = typeof _tag === 'string' ? JSON.parse(_tag) : { _tag: 'misc' };
    // const instructions = typeof _instructions === 'string' ? JSON.parse(_instructions) : { _instructions: 'no instructions' };
    
    const sanitizedTag = _tag.trim();
    // console.log('Sanitized Tag:', sanitizedTag);
    const tag = (sanitizedTag);

    const sanitizedInstructions = _instructions.trim();
    const instructions = JSON.parse(sanitizedInstructions);
    // console.log("tag", tag)
    // console.log("instructions", instructions)

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
    //FIXME: always getting all courses mendatory
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    //get user only if accountType is equal to 'Instructor', if yes take the id
    const instructorDetails = await findInstructor(userId);
    
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }

    // Check if the tag given is valid
    // get category by Id
    console.log("finding category: ", category)
    const categoryDetails = await showAllCat(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)
    // Create a new course with the given details
    //FIXME: 'query is not defined' error
    const newCourse = await addCourse({
      courseName,
      courseDescription,
      instructor: instructorDetails.user_id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails.course_id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}
// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    //TODO: find course by courseId
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    //TODO: using sql Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }
    //TODO: then commit
    await course.save()

    //TODO: JOIN multiple table elements to updateCourse
    /*
    Assuming we have a similar schema where:
    courses table references:
    instructors table (with an additional instructor_details table for additionalDetails)
    categories table
    ratings_and_reviews table
    course_contents table (with a nested sub_sections table for subSection)

    the sql:
    SELECT 
    c.course_id,
    c.course_name,
    i.instructor_id,
    i.instructor_name,
    id.additional_detail_id,
    id.detail_name,
    cat.category_id,
    cat.category_name,
    rr.rating_id,
    rr.rating_value,
    cc.content_id,
    cc.content_name,
    ss.sub_section_id,
    ss.sub_section_name
FROM 
    courses c
LEFT JOIN 
    instructors i ON c.instructor_id = i.instructor_id
LEFT JOIN 
    instructor_details id ON i.instructor_id = id.instructor_id
LEFT JOIN 
    categories cat ON c.category_id = cat.category_id
LEFT JOIN 
    ratings_and_reviews rr ON c.course_id = rr.course_id
LEFT JOIN 
    course_contents cc ON c.course_id = cc.course_id
LEFT JOIN 
    sub_sections ss ON cc.content_id = ss.content_id
WHERE 
    c.course_id = :courseId;

    */
    //TODO: take proper reference from which tables & what data we'll take and then conduct the JOIN operations
    //FIXME: populate is used to perform JOIN operations, so take appropriate measures
    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
// Get Course List
exports.getAllCourses = async (req, res) => {
  try {
    //SELECT courseName, price, thumbnail, instru... from Courses 
    const allCourses = await getPubCourses();

    return res.status(200).json({
      success: true,
      data: allCourses,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    })
  }
}
// Get One Single Course Details
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()
//     // console.log(
//     //   "###################################### course details : ",
//     //   courseDetails,
//     //   courseId
//     // );
//     if (!courseDetails || !courseDetails.length) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${courseId}`,
//       })
//     }

//     if (courseDetails.status === "Draft") {
//       return res.status(403).json({
//         success: false,
//         message: `Accessing a draft course is forbidden`,
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       data: courseDetails,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    //TODO: find & join
    /*FIXME: find course by courseId & JOIN instructor(and it's additionalDetails column), 
    category, ratingAndReviews, courseContent(which has subSection, videoUrl) and use it
    */
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id

    //TODO: find & join
    /*FIXME: find course by courseId & JOIN instructor(and it's additionalDetails column), 
    category, ratingAndReviews, courseContent(which has subSection, videoUrl) and use it
    */
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
    
      //TODO: find progress from CourseProgress table using courseID and userId
    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    //TODO: find courses by instructorId and sort by createdAt/Date column
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    //TODO: Find the course by courseId 
    //(to later loop through all the studentsEnrolled, courseContent to delete them from their specific tables)
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
     const studentsEnrolled = course.studentsEnroled
    for (const studentId of studentsEnrolled) {
      //TODO: find the students enrolled in a course and Delete this courseId from the Student entity's enrolledCourses column 
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      //TODO: from the Section table, find sectionId 
      const section = await Section.findById(sectionId)
      
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          //TODO: and Delete this SubSections from the table using subSectionId from the column 
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      //TODO: Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    //TODO: Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}