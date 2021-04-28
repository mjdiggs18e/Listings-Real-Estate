import React from "react";
import { useParams } from "react-router-dom";
import ListingDetails from "../components/ListingDetails";

const SoloListings = () => {
  let { id } = useParams();

  return (
    <div>
      <ListingDetails id={id} />
    </div>
  );
};

export default SoloListings;
