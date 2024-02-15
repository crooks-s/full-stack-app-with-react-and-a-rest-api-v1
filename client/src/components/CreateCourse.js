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

  const navigate = useNavigate();

  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  // handle submit to create course using post method
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCourse = {
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
      userId: authUser.user.id
    }

    const encodedCredentials = btoa(`${authUser.user.emailAddress}:${authUser.user.password}`);

    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(newCourse),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${encodedCredentials}`
      }
    }

    try {
      if (authUser) {
        const response = await fetch(
          'http://localhost:5000/api/courses',
          fetchOptions
        );
        if (response.status === 201) {
          navigate('/');
        } else if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors);
          // will use errors state to render to DOM
          console.log(errors);
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      console.log(error);
    }
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
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="title">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              ref={title}
            />
            <p>By {authUser.user.firstName} {authUser.user.lastName}</p>
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              ref={description}
              style={{ resize: 'none' }}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              ref={estimatedTime}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              ref={materialsNeeded}
              style={{ resize: 'none' }}
            />
          </div>
        </div>
        <button className="button" type="submit">Create Course</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateCourse;
