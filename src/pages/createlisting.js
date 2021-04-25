import React from "react";
import CreateList from "../components/CreateList";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";

const CreateContainer = styled.div`
  margin: 0 auto;
  width: 75vw;
`;

const CreateListing = () => {
  return (
    <>
      <Sidebar />
      <CreateContainer>
        <CreateList />
      </CreateContainer>
    </>
  );
};

export default CreateListing;
