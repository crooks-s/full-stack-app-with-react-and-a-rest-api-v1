// Modules
import { useState, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
// Context
import UserContext from "../context/UserContext";
// Component
import ErrorsDisplay from './ErrorsDisplay';

const UserSignUp = () => {
  // React Hooks
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);
  // React Refs
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  // Create a new User
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value
    };
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    };
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
      }
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  // For Cancel button 
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="form--center">
      <ErrorsDisplay errors={errors.map(error => error.msg || error)} />
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
