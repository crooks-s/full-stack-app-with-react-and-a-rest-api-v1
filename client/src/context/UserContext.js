import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

  const signIn = async (credentials) => {

    const fetchOptions = {
      method: 'GET',
      headers: {}
    }

    const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
    fetchOptions.headers.Authorization = `Basic ${encodedCredentials}`;

    try {
      const response = await fetch('http://localhost:5000/api/users', fetchOptions);
      if (response.status === 200) {
        const user = await response.json();
        setAuthUser(user);
        return user;
      } else if (response.status === 401) {
        console.log('Unauthorized: Invalid credentials');
        return null;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log('Error: ', error.message);
    }

  }

  const signOut = () => {
    setAuthUser(null);
  }

  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
