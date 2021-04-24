import React from "react";

import MapBar from "../components/MapBar";
import ListingBar from "../components/ListingBar";
import Sidebar from "../components/Sidebar";

import "@fontsource/open-sans";

function Home() {
  return (
    <>
      <Sidebar />
      <ListingBar />
      <MapBar />
    </>
  );
}

export default Home;
