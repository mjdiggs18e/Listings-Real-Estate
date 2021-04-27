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
`;

const ListingSearchBar = styled.div`
  display: flex;
  & svg {
    color: #757373;
    font-size: 22px;
  }
`;

const ListingSearchInput = styled.input`
  border: none;
  border-bottom: 1px solid #dddddd;
  outline: none;
  width: 30vw;
  background-color: #f8f9fa;
  font-size: 16px;
`;

function Home() {
  const [cords, setCords] = useState();
  const searchTerm = useRef();

  const handleAddress = async (e) => {
    e.preventDefault();

    const results = await provider.search({ query: searchTerm.current.value });
    setCords(results);
  };

  return (
    <>
      <Sidebar />
      <ListingBarContainer>
        <ListingSearchBar>
          <BiSearchAlt />
          <form onSubmit={handleAddress}>
            <ListingSearchInput ref={searchTerm} type="text" />
          </form>
        </ListingSearchBar>
        <RetrieveListings />
      </ListingBarContainer>
      <MapBar cords={cords} />
    </>
  );
}

export default Home;
