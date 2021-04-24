import React, { useState, useRef } from "react";
import { useAuth } from "../firebase/Firebase";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");

  // Checks to see if values are empty. If values aren't empty, the success message appears and sends the user an email.

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  // Reset password form. Displays error messages and a success message if the process works.

  return (
    <section className="forgotpassword-section">
      <h1>Forgot Password</h1>
      {message && <p className="fogotpassword-sucess">{message}</p>}
      {error && <p className="forgotpassword-error">{error}</p>}
      <form className="forgotpassword-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="text" ref={emailRef} required />
        </label>
        <button disabled={loading} className="signup-button" type="submit">
          Forgot Password
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
