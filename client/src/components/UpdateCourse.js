// Modules
import { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";

/*
Renders the "UPDATE COURSE" screen -- 
  1. render a FORM that allows user to update one of their existing courses
  2. render update course button - sends POST req to /api/courses/:id onClick
  3. render cancel button that returns user to Course Detail screen
*/

const UpdateCourse = () => {
  // Hooks
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  // React Refs
  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);


  // will use param to redirect to its course detail page
  const { id } = useParams();
  
  // Retrieve course details to update for a single course at id
  useEffect(() => {
    const fetchOptions = {
      method: 'GET',
      headers: {}
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`, fetchOptions);
        if (response.status === 200) {
          const data = await response.json();
          setCourse(data);
        }
      } catch (error) {
        console.log('Error: ', error.message);
      }
    }
    fetchData();
  }, [id]);

    // Update Course
    const handleSubmit = async (event) => {
      event.preventDefault(); 
      const updatedCourse = {
        title: title.current.value,
        description: description.current.value,
        estimatedTime: estimatedTime.current.value,
        materialsNeeded: materialsNeeded.current.value,
        userId: authUser.user.id
      };
      const encodedCredentials = btoa(
        `${authUser.user.emailAddress}:${authUser.user.password}`
      );
      const fetchOptions = {
        method: 'PUT',
        body: JSON.stringify(updatedCourse),
        headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${encodedCredentials}`
        }
      };
      try {
        const response = await fetch(
          `http://localhost:5000/api/courses/${id}`,
          fetchOptions
        );
        if (response.status === 204) {
          navigate(`/courses/${id}`);
        } else if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors);
        } else if (response.status === 401) {
          const data = await response.json();
          setErrors([data.message]);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log('Error: ', error.message);
      }
    };
  
    // cancel button
    const handleCancel = (e) => {
      e.preventDefault();
      navigate('/');
    }

  return (
    <>
      <div className="wrap">
        <ErrorsDisplay errors={errors.map(error => error.msg || error)} />
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label for="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                ref={title}
                defaultValue={course.title}
              />
              <p>By {course.User && `${course.User.firstName} ${course.User.lastName}`}</p>
              <label for="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                ref={description}
                defaultValue={course.description}
                style={{ resize: 'none' }}
              />
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                ref={estimatedTime}
                defaultValue={course.estimatedTime}
              />
              <label for="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                ref={materialsNeeded}
                defaultValue={course.materialsNeeded}
                style={{ resize: 'none' }}
              />
            </div>
          </div>
          <button className="button" type="submit">Update Button</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </>
  );
}

export default UpdateCourse;
