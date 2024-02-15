import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";


/*
Renders the "SIGN UP" screen -- 
  1. render a FORM that allows user to sign up for new acct
  2. render sign up button -- sends POST req to '/api/users'
  3. render cancel button that returns user to default route
*/

const UserSignUp = () => {
  const navigate = useNavigate();
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  // handle submit

  // cancel 
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="form--center">
      <h2>Sign Up</h2>
      <form>
        <label for="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          ref={firstName}
        />
        <label for="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          ref={lastName}
        />
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" ref={password} />
        <button className="button" type="submit">Sign Up</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
      <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
    </div>
  );
}

export default UserSignUp;
