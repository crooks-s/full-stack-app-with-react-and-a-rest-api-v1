import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

}

export default UserContext;
