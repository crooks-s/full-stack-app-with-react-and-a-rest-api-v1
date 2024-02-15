import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

/*
Renders the "Course Detail" screen -- 
  1. get course details from API's "/api/courses/:id" route and render the course
  2. render DELETE COURSE button -- send delete request to API's "/api/courses/:id"
  3. render UPDATE COURSE button -- navigate to "UPDATE COURSE" screen
*/

const CourseDetail = () => {
  const [course, setCourse] = useState([]);
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  // fetch course on id
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

  // delete course
  const handleDelete = async () => {
    const encodedCredentials = btoa(`${authUser.user.emailAddress}:${authUser.user.password}`);

    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    }

    try {
      console.log(encodedCredentials);
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, fetchOptions);
      if (response.status === 204) {
        console.log('course was deleted');
        navigate('/');
      } else if (response.status === 401) {
        console.log('not authorized at course id: ', id);
      } else {
        console.log('failed to delete: ', response.statusText);
      }
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }

  return (
    <>
      {/* Display Update and Delete buttons only if user is logged in */}
      {authUser ? (
        <div className="actions--bar">
          {/* will need to fix the update and delete Link to routes */}
          <Link to={`update`} className="button">Update Course</Link>
          <button className="button" onClick={handleDelete}>Delete Course</button>
          <Link to='/' className="button button-secondary">Return to List</Link>
        </div>
      ) : (
        null
      )}

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.User && `${course.User.firstName} ${course.User.lastName}`}</p>
              {course.description && course.description.split('\n\n').map((paragraph, index) =>
                <p key={index}>{paragraph}</p>)}
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {course.materialsNeeded && course.materialsNeeded.substring(1).split('*').map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CourseDetail;
