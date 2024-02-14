import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";


/*
Renders the "UPDATE COURSE" screen -- 
  1. render a FORM that allows user to update one of their existing courses
  2. render update course button - sends POST req to /api/courses/:id onClick
  3. render cancel button that returns user to Course Detail screen
*/

const UpdateCourse = () => {
  const courseTitle = useRef(null);
  const estimatedTime = useRef(null);

  // will use param to redirect to its course detail page
  const { id } = useParams();



  return (
    <>
      <div className="actions--bar">
        {/* will need to fix the update and delete Link to routes */}
        <Link to={`update`} className="button">Update Course</Link>
        <Link to='delete' className="button">Delete Course</Link>
        <Link to='/' className="button button-secondary">Return to List</Link>
      </div>
      <div className="wrap">
        <h2>Update Course</h2>
        <form>
          <div className="main--flex">
            <div>
              <label for="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />
              <p>By USER NAME</p>
              <label for="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" />
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />
              <label for="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateCourse;
