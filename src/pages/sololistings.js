import React from "react";
import { useParams } from "react-router-dom";
import ListingDetails from "../components/ListingDetails";
import Sidebar from "../components/Sidebar";

const SoloListings = () => {
  let { id } = useParams();

  return (
    <>
      <Sidebar />
      <ListingDetails id={id} />
    </>
  );
};

export default SoloListings;
