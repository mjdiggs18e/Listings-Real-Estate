import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../firebase/Firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const LoginContainer = styled.div`
    padding: 2rem;
    @media (min-width: 320px) and (max-width: 768px) {
      padding: 0;
      text-align: center;
    }
  `;

  const LoginTitle = styled.h1`
    margin-bottom: 6rem;
    @media (min-width: 320px) and (max-width: 768px) {
      margin-bottom: 2rem;
    }
  `;
  const LoginError = styled.p``;
  const LoginForm = styled.form``;
  const LoginLabel = styled.label`
    display: block;
    margin: 2rem;
  `;
  const LoginInput = styled.input`
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
  const LoginButton = styled.button`
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
  const LoginText = styled.p``;

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

  return (
    <LoginContainer>
      <LoginTitle>Log In</LoginTitle>
      {error && <LoginError>{error}</LoginError>}
      <LoginForm onSubmit={handleSubmit}>
        <LoginLabel>
          Email
          <LoginInput type="text" ref={emailRef} placeholder="Email" required />
        </LoginLabel>
        <LoginLabel>
          Password
          <LoginInput
            type="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
        </LoginLabel>
        <LoginButton disabled={loading} type="submit">
          Log In
        </LoginButton>
      </LoginForm>
      <Link to="/forgot-password">
        <LoginText>Forgot Password</LoginText>
      </Link>
      <Link to="/signup">
        <LoginText>New user? Create an account</LoginText>
      </Link>
    </LoginContainer>
  );
};

export default Login;
