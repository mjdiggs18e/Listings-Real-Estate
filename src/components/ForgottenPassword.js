import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../firebase/Firebase";

const ForgottenPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");

  const ForgotContainer = styled.div`
    padding: 2rem;
    @media (min-width: 320px) and (max-width: 768px) {
      padding: 0;
      text-align: center;
    }
  `;
  const ForgotTitle = styled.h1`
    margin-bottom: 6rem;
    @media (min-width: 320px) and (max-width: 768px) {
      margin-bottom: 2rem;
    }
  `;
  const ForgotError = styled.p``;
  const ForgotForm = styled.form``;
  const ForgotLabel = styled.label`
    display: block;
    margin: 2rem;
  `;
  const ForgotInput = styled.input`
    display: block;
    width: 400px;
    padding: 0.7rem;
    outline: none;
    border: 1px solid #a8b4c1;
    border-radius: 4px;
    font-family: "Open Sans";
    margin-top: 0.5rem;

    @media (min-width: 320px) and (max-width: 768px) {
      width: 200px;
    }

    &::placeholder {
      color: #a8b4c1;
    }
  `;
  const ForgotButton = styled.button`
    font-family: "Open Sans";
    width: 400px;
    padding: 0.7rem;
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: #0f7173;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    @media (min-width: 320px) and (max-width: 768px) {
      width: 200px;
    }
  `;
  const ForgotText = styled.p``;

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
    <ForgotContainer>
      <ForgotTitle>Forgot Password</ForgotTitle>
      {message && <ForgotText>{message}</ForgotText>}
      {error && <ForgotError>{error}</ForgotError>}
      <ForgotForm onSubmit={handleSubmit}>
        <ForgotLabel>
          Email
          <ForgotInput type="text" ref={emailRef} required />
        </ForgotLabel>
        <ForgotButton
          disabled={loading}
          className="signup-button"
          type="submit"
        >
          Forgot Password
        </ForgotButton>
      </ForgotForm>
      <Link to="/login?">
        <ForgotText>Have an account? Click to login</ForgotText>
      </Link>
    </ForgotContainer>
  );
};

export default ForgottenPassword;
