// Modules
import { useContext } from "react"
import { Outlet } from 'react-router-dom';
// Context
import UserContext from "../context/UserContext";
// Component
import Forbidden from "./Forbidden";

const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);

  if (authUser) {
    return <Outlet />
  } else {
    return <Forbidden />
  }
}

export default PrivateRoute;
