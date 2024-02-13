import { Route, Routes } from 'react-router-dom';

// Components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
// import Home from './components/Home';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />
        <Route element={<PrivateRoute />}>
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/:id/update" element={<UpdateCourse />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
