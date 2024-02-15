import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

/*
Renders the "UPDATE COURSE" screen -- 
  1. render a FORM that allows user to update one of their existing courses
  2. render update course button - sends POST req to /api/courses/:id onClick
  3. render cancel button that returns user to Course Detail screen
*/

const UpdateCourse = () => {
  // Hooks
  const [course, setCourse] = useState([]);
  const courseTitle = useRef();
  const estimatedTime = useRef(null);
  const courseDescription = useRef(null);
  const materialsNeeded = useRef(null);

  const navigate = useNavigate();

  // will use param to redirect to its course detail page
  const { id } = useParams();

  // handleSubmit

  // cancel button
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

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
  }, []);

  return (
    <>
      <div className="wrap">
        <h2>Update Course</h2>
        <form>
          <div className="main--flex">
            <div>
              <label for="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                ref={courseTitle}
                defaultValue={course.title}
              />
              <p>By {course.User && `${course.User.firstName} ${course.User.lastName}`}</p>
              <label for="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                ref={courseDescription}
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
                useRef={materialsNeeded}
                defaultValue={course.materialsNeeded}
                style={{ resize: 'none' }}
              />
            </div>
          </div>
          <button className="button" type="submit">Update Button</button>
          <button class="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </>
  );
}

export default UpdateCourse;
