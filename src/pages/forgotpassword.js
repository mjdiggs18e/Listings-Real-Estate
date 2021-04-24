import React from "react";
import ForgottenPassword from "../components/ForgottenPassword";
import styled from "styled-components";

import "@fontsource/open-sans";
import Sidebar from "../components/Sidebar";

const ForgotContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

function ForgotPassword() {
  return (
    <>
      <Sidebar />
      <ForgotContainer>
        <ForgottenPassword />
      </ForgotContainer>
    </>
  );
}

export default ForgotPassword;
