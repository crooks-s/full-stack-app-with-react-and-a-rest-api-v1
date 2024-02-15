// Modules
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Markdown from 'react-markdown';

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

  // Retrieve course details for single course at id
  useEffect(() => {
    const fetchOptions = {
      method: 'GET',
      headers: {}
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/courses/${id}`,
          fetchOptions
        );
        if (response.status === 200) {
          const data = await response.json();
          setCourse(data);
        }
      } catch (error) {
        console.log('Error: ', error.message);
      }
    };
    fetchData();
  }, [id]);

  // DELETE Course
  const handleDeleteCourse = async () => {
    const encodedCredentials = btoa(
      `${authUser.user.emailAddress}:${authUser.user.password}`
    );
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${id}`,
        fetchOptions
      );
      if (response.status === 204) {
        navigate('/');
      } else if (response.status === 401) {
        const data = await response.json();
        setErrors(data.message);
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
        null
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
