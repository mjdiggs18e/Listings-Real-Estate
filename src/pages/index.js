import React, { useState, useRef } from "react";
import MapBar from "../components/MapBar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import "@fontsource/open-sans";
import { BiSearchAlt } from "react-icons/bi";
import RetrieveListings from "../components/RetrieveListings";
import { OpenStreetMapProvider } from "leaflet-geosearch";
const provider = new OpenStreetMapProvider();

const ListingBarContainer = styled.div`
  width: 47vw;
  padding: 2rem;
  background-color: #f8f9fa;
  @media (min-width: 320px) {
    width: 100vw;
    padding: 0;
    background-color: red;
  }
`;

const ListingSearchBar = styled.div`
  display: flex;

  & svg {
    color: #757373;
    font-size: 22px;
  }

  @media (min-width: 320px) {
    display: none;
  }
`;

const ListingBarFixed = styled.div`
  position: fixed;
  right: 0;

  @media (min-width: 320px) {
    display: none;
  }
`;

const ListingSearchInput = styled.input`
  border: none;
  border-bottom: 1px solid #dddddd;
  outline: none;
  width: 30vw;
  background-color: #f8f9fa;
  font-size: 16px;

  @media (min-width: 320px) {
    background-color: #ffffff;
  }
`;

function Home() {
  return (
    <>
      <Sidebar />
      <ListingBarContainer>
        <ListingSearchBar>
          <BiSearchAlt />
          <form>
            <ListingSearchInput type="text" />
          </form>
        </ListingSearchBar>
        <RetrieveListings />
      </ListingBarContainer>
      <ListingBarFixed right>
        <MapBar />
      </ListingBarFixed>
    </>
  );
}

export default Home;
