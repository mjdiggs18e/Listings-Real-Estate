import React from "react";
import MapBar from "../components/MapBar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import "@fontsource/open-sans";

import RetrieveRentListings from "../components/RetrieveRentListings";

const ListingBarContainer = styled.div`
  width: 47vw;
  padding: 2rem;
  background-color: #f8f9fa;
`;

const ListingBarFixed = styled.div`
  position: fixed;
  right: 0;
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
