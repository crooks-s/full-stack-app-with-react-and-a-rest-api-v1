import { useState, useEffect } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchOptions = {
      method: 'GET',
      headers: {}
    }
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses', fetchOptions);
        if (response.status === 200) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (err) {
        console.log('Error: ', err.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="wrap main--grid">
      {courses.map(course => (
        <a className='course--module course--link' key={course.id} href={`/courses/${course.id}`}>
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </a>
      ))}
      <a className="course--module course--add--module" href="/courses/create">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6"></polygon>
          </svg>
          New Course
        </span>
      </a>
    </div>
  );
}

export default Courses;
