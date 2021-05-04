import React from "react";
import MapBar from "../components/MapBar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import "@fontsource/open-sans";

import RetrieveRentListings from "../components/RetrieveRentListings";

const ListingBarContainer = styled.div`
  width: 47vw;
  padding: 1rem;
  margin-left: 80px;
  background-color: #f8f9fa;
  @media (max-width: 1360px) {
    width: 100vw;
    min-height: 100%;
    padding: 0;
    margin: 0;
  }
`;

const ListingBarFixed = styled.div`
  position: fixed;
  right: 0;

  @media (max-width: 1360px) {
    display: none;
  }
`;

function Rent() {
  return (
    <>
      <Sidebar />
      <ListingBarContainer>
        <RetrieveRentListings />
      </ListingBarContainer>
      <ListingBarFixed right>
        <MapBar />
      </ListingBarFixed>
    </>
  );
}

export default Rent;
