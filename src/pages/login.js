import React from "react";
import styled from "styled-components";
import Login from "../components/Login";

import "@fontsource/open-sans";
import Sidebar from "../components/Sidebar";

const LoginContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

function LogIn() {
  return (
    <>
      <Sidebar />
      <LoginContainer>
        <Login />
      </LoginContainer>
    </>
  );
}

export default LogIn;
