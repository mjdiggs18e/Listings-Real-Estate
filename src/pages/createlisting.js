import React from "react";
import CreateList from "../components/CreateList";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";

const CreateContainer = styled.div`
  margin: 0 auto;
  width: 75vw;
`;

const SidebarContainer = styled.div`
  position: fixed;

  @media (max-width: 1360px) {
    position: unset;
  }
`;

const CreateListing = () => {
  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <CreateContainer>
        <CreateList />
      </CreateContainer>
    </>
  );
};

export default CreateListing;
