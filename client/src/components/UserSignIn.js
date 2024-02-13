import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

/*
Renders the "Sign in" screen -- 
  1. render a FORM that allows user to sign IN using existing acct. info
  2. render sign IN button -- signs in user
  3. render cancel button that returns user to default route -- list of courses
*/

const UserSignIn = () => {
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);

  const emailAddress = useRef(null);
  const password = useRef(null);

  const handleSubmit = async(event) => {
    event.preventDefault();

    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value
    };

    try { 
      const user = await actions.signIn(credentials);
      if (user) {
        console.log("You're logged in.");
        navigate('/'); // will need to show user is logged in
      } else {
        console.log('sign in unsuccessful');
      }
    } catch(error) {
      console.log(error);
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input 
          id="emailAddress"
          name="emailAddress"
          type="email"
          ref={emailAddress}
          placeholder="email@example.com"
        />
        <label htmlFor="password">Password</label>
        <input 
        id="password"
        name="password"
        type="password"
        ref={password}
        placeholder="8-20 characters"
        />
        <button className='button' type="submit">Sign In</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default UserSignIn;
