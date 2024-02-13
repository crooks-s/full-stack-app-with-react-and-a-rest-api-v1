import { useContext } from "react"
import { Navigate, Outlet, Route } from 'react-router-dom';
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);

  // Need to refactor to use Route.render method for project purposes
  if (authUser) {
    return <Outlet />
  } else {
    return <Navigate to='/signin' />
  }
}

export default PrivateRoute;