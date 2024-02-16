// Modules
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Markdown from 'react-markdown';
import { api } from '../utils/apiHelper';
// Context
import UserContext from "../context/UserContext";
// Component
import ErrorsDisplay from "./ErrorsDisplay";

const CourseDetail = () => {
  // React hooks
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);
  const { authUser } = useContext(UserContext);
  const { id } = useParams(); // courseId
  const navigate = useNavigate();

  // Retrieve course details for a single course
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api(`/courses/${id}`, 'GET', null, null);
        if (response.status === 200) {
          const data = await response.json();
          setCourse(data);
        } else if (response.status === 404) {
          navigate('/notfound');
        }
      } catch (error) {
        console.log('Error: ', error.message);
      }
    };
    fetchData();
  }, [id, navigate]);

  // DELETE Course
  const handleDeleteCourse = async () => {
    const credentials = {
      username: authUser.user.emailAddress,
      password: authUser.user.password
    };
    try {
      const response = await api(`/courses/${id}`, "DELETE", null, credentials);
      if (response.status === 204) {
        navigate('/');
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

  return (
    <>
      {/* Validate if user is logged in to display UPDATE and DELETE course buttons */}
      {authUser ? (
        <div className="actions--bar">
          <Link to={`update`} className="button">
            Update Course
          </Link>
          <button className="button" onClick={handleDeleteCourse}>
            Delete Course
          </button>
          <Link to='/' className="button button-secondary">
            Return to List
          </Link>
        </div>
      ) : (
        <div className='actions--bar'>
          <Link to='/' className="button button-secondary">
            Return to List
          </Link>
        </div>
      )}
      <div className="wrap">
        <ErrorsDisplay errors={errors} />
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                By {course.User && `${course.User.firstName} ${course.User.lastName}`}
              </p>
              <Markdown>{course.description}</Markdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <Markdown>{course.materialsNeeded}</Markdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CourseDetail;
