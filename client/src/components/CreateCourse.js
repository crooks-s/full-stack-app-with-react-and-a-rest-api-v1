import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/*
Renders the "CREATE COURSE" screen -- 
  1. render a FORM that allows user to create a new course
  2. render create course button - sends POST req to /api/courses onClick
  3. render cancel button that returns user to default route
*/

const CreateCourse = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const estimatedTime = useRef(null);
  const courseTitle = useRef(null);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      {/* <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          <li>Render the errors here. will need to use error STATE which is an array of errors. Map the errors to the li elements</li>
        </ul>
      </div> */}
      <form>
        <div className="main--flex">
          <div>
            <label for="courseTitle">Course Title</label>
            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />
            <p>By 'CURRENT USER NAME'</p>
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
        <button class="button" type="submit">Create Course</button>
        <button class="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateCourse;
