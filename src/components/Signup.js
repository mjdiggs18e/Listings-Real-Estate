import React, { useState, useRef } from "react";
import { useAuth } from "../firebase/Firebase";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Checks to see if passwords match and inputs have value.
  // If everything works, a new user is created and automatically logged in on submission.

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  // Signup form

  return (
    <section className="signup-section">
      <h1>Sign Up</h1>
      {error && <p className="signup-error">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="text" ref={emailRef} required />
        </label>
        <label>
          Password
          <input type="password" ref={passwordRef} minLength="6" required />
        </label>
        <label>
          Password Confirmation
          <input type="password" ref={passwordConfirmationRef} required />
        </label>
        <button disabled={loading} className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
