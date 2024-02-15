import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

/*
Renders the "CREATE COURSE" screen -- 
  1. render a FORM that allows user to create a new course
  2. render create course button - sends POST req to /api/courses onClick
  3. render cancel button that returns user to default route
*/

const CreateCourse = () => {
  const { authUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    courseTitle: '',
    courseDescription: '',
    estimatedTime: '',
    materialsNeeded: ''
  });

  const navigate = useNavigate();
  const estimatedTime = useRef(null);
  const courseTitle = useRef(null);

  // handle submit to create course using post method

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updateFormData = {
      ...formData,
      [name]: value
    }

    setFormData(updateFormData);
  }

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
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              onChange={handleChange}
              ref={courseTitle}
            />
            <p>By {authUser.user.firstName} {authUser.user.lastName}</p>
            <label for="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              onChange={handleChange}
              style={{ resize: 'none' }}
            />
          </div>
          <div>
            <label for="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              onChange={handleChange}
              ref={estimatedTime}
            />

            <label for="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              onChange={handleChange}
              style={{ resize: 'none' }}
            />
          </div>
        </div>
        <button class="button" type="submit">Create Course</button>
        <button class="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateCourse;
