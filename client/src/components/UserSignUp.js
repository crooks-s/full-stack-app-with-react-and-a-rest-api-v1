import { useState, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext";


/*
Renders the "SIGN UP" screen -- 
  1. render a FORM that allows user to sign up for new acct
  2. render sign up button -- sends POST req to '/api/users'
  3. render cancel button that returns user to default route
*/

const UserSignUp = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const { actions } = useContext(UserContext);

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value
    }

    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/users',
        fetchOptions
      );
      if (response.status === 201) {
        await actions.signIn(newUser);
        navigate('/');
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
        console.log(errors);
        //will use errors to render validation to DOM
      }
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }


  // cancel 
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="form--center">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          ref={firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          ref={lastName}
        />
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          ref={emailAddress}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={password}
        />
        <button className="button" type="submit">Sign Up</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
      <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
    </div>
  );
}

export default UserSignUp;
