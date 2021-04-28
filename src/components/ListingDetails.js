import React, { useState, useEffect } from "react";
import { useAuth } from "../firebase/Firebase";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MapBar from "../components/MapBar";
import dayjs, { relativeTime } from "dayjs";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import styled from "styled-components";
const provider = new OpenStreetMapProvider();

const ListingContainer = styled.div`
  width: 47vw;
`;

const ListingDetails = ({ id }) => {
  const [postInformation, setPostInformation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { database } = useAuth();
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    database
      .collection("listings")
      .where("address", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      })
      .then(async () => {
        const results = await provider.search({
          query: id.split(" ").slice(0, 3).join(" "),
        });
        setCoordinates(results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function LocationMarker() {
    return coordinates === null ? null : (
      <Marker
        position={
          coordinates[0]?.x
            ? [coordinates[0].y, coordinates[0].x]
            : [38.6, 75.3]
        }
      >
        <Popup>{id}</Popup>
      </Marker>
    );
  }

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <ListingContainer>
        <h1>Listing Details for {id}</h1>
      </ListingContainer>
      {coordinates[0]?.x ? (
        <MapContainer
          style={{ height: "100vh", width: "50vw" }}
          center={[coordinates[0].y, coordinates[0].x]}
          zoom={19}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      ) : (
        <MapContainer
          style={{ height: "100vh", width: "50vw" }}
          center={[38.6, 75.3]}
          zoom={19}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      )}
    </>
  );
};

export default ListingDetails;
