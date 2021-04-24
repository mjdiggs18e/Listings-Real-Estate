import React from "react";
import Sidebar from "../components/Sidebar";
import SignUp from "../components/Signup";
import styled from "styled-components";

const SignupContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const Signup = () => {
  return (
    <>
      <Sidebar />
      <SignupContainer>
        <SignUp />
      </SignupContainer>
    </>
  );
};

export default Signup;
