import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../firebase/Firebase";
import { Link } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // Makes sure the forms all have values in them. If the forms have value with no errors, send the user to the homepage.

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  // Logs in a current user and checks for errors on submit

  return (
    <div className="login-section">
      <h1>Log In</h1>
      {error && <p className="login-error">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="text" ref={emailRef} required />
        </label>
        <label>
          Password
          <input type="password" ref={passwordRef} required />
        </label>
        <button disabled={loading} className="login-button" type="submit">
          Log In
        </button>
      </form>
      <Link to="/signup">
        <p>Signup</p>
      </Link>
    </div>
  );
};

export default Login;
