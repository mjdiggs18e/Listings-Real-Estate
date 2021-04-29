import React, { useState, useRef } from "react";
import MapBar from "../components/MapBar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import "@fontsource/open-sans";
import RetrieveListings from "../components/RetrieveListings";

const ListingBarContainer = styled.div`
  width: 47vw;
  padding: 1rem;
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

function Home() {
  return (
    <>
      <Sidebar />
      <ListingBarContainer>
        <RetrieveListings />
      </ListingBarContainer>
      <ListingBarFixed right>
        <MapBar />
      </ListingBarFixed>
    </>
  );
}

export default Home;
