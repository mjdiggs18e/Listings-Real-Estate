import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../firebase/Firebase";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const SignupContainer = styled.div`
    padding: 2rem;

    @media (min-width: 320px) and (max-width: 768px) {
      padding: 0;
      text-align: center;
    }
  `;
  const SignupTitle = styled.h1`
    margin-bottom: 6rem;
    @media (min-width: 320px) and (max-width: 768px) {
      margin-bottom: 2rem;
    }
  `;
  const SignupError = styled.p``;
  const SignupForm = styled.form``;
  const SignupLabel = styled.label`
    display: block;
    margin: 2rem;
  `;
  const SignupInput = styled.input`
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
  const SignupButton = styled.button`
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
  const SignupText = styled.p``;

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
    <SignupContainer>
      <SignupTitle>Sign Up</SignupTitle>
      {error && <SignupError>{error}</SignupError>}
      <SignupForm onSubmit={handleSubmit}>
        <SignupLabel>
          Email
          <SignupInput type="text" ref={emailRef} required />
        </SignupLabel>
        <SignupLabel>
          Password
          <SignupInput
            type="password"
            ref={passwordRef}
            minLength="6"
            required
          />
        </SignupLabel>
        <SignupLabel>
          Password Confirmation
          <SignupInput type="password" ref={passwordConfirmationRef} required />
        </SignupLabel>
        <SignupButton disabled={loading} type="submit">
          Sign Up
        </SignupButton>
      </SignupForm>
      <Link to="/login">
        <SignupText>Have an account? Click to login</SignupText>
      </Link>
    </SignupContainer>
  );
};

export default SignUp;
