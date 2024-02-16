// Modules
import { useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
// Context
import UserContext from "../context/UserContext";

const UserSignIn = () => {
  // React Hooks
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);
  // React Refs
  const emailAddress = useRef(null);
  const password = useRef(null);

  // Create new user and sign in
  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value
    };
    try {
      const user = await actions.signIn(credentials);
      navigate('/');
      if (user) {
      }
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  // For Cancel button
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
      <p>Don't have a user account? Click here to
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
}

export default UserSignIn;
