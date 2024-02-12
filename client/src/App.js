import { Route, Routes } from 'react-router-dom';

// Components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} /> {/* will be able to CREATE and READ at this route */}
        <Route path="/courses/:id" element={<CourseDetail />} /> {/* will be able to POST and DELETE at this route */}
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
