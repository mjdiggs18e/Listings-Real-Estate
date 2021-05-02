import React, { useState, useEffect } from "react";
import { useAuth } from "../firebase/Firebase";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import dayjs, { relativeTime } from "dayjs";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import styled from "styled-components";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
const provider = new OpenStreetMapProvider();

// Start of styled components

const ListingContainer = styled.div`
  width: 47vw;
  padding: 1rem;

  @media (max-width: 1374px) {
    width: 100vw;
    padding: 0;
    text-align: center;
  }
`;

const ListingTitle = styled.h1`
  font-weight: 500;
  text-align: center;
  font-size: 26px;
  margin-top: 1.5rem;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const ListingBody = styled.div``;

const ListingPictures = styled.div`
  text-align: center;
  margin-top: 1rem;

  & img {
    width: 400px;
    @media (max-width: 768px) {
      width: 200px;
    }
  }
`;

const ListingInformation = styled.div`
  margin: 2rem;

  @media (max-width: 768px) {
    margin: 1rem;
  }
`;

const ListingCost = styled.h1`
  font-weight: 700;
  text-align: center;
`;

const ListingRooms = styled.p`
  margin: 0 1.5rem;
`;

const ListingFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ListingText = styled.p`
  margin: 1rem;
`;

const ListingTitles = styled.h2`
  margin: 2rem 0;
  @media (max-width: 768px) {
    margin: 1rem;
  }
`;

const MobileMap = styled.div`
  display: none;
  @media (min-width: 1375px) {
    position: relative;
    display: flex;
  }
`;

// End of styled components

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
          const item = [];
          item.push(doc.data());
          setPostInformation(item);
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

  console.log(postInformation);
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

  const [currentImage, setCurrentImage] = useState(0);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <ListingContainer>
        <ListingTitle>Listing Details for {id}</ListingTitle>
        <ListingBody>
          {postInformation.map((post) => {
            const previousImage = () => {
              if (currentImage <= 0) {
                setCurrentImage(post.imageUrl.length - 1);
              } else {
                setCurrentImage(currentImage - 1);
              }
            };

            const nextImage = () => {
              if (currentImage >= post.imageUrl.length - 1) {
                setCurrentImage(0);
              } else {
                setCurrentImage(currentImage + 1);
              }
            };
            return (
              <>
                <ListingInformation>
                  <ListingCost>{post.monthlyRent}</ListingCost>
                  <ListingFlex>
                    <ListingRooms>{post.bedrooms} Bedrooms</ListingRooms>
                    <ListingRooms>{post.bathrooms} Bathrooms</ListingRooms>
                    <ListingRooms>{post.squarefeet} Square Feet</ListingRooms>
                  </ListingFlex>
                  <ListingPictures>
                    <img src={post.imageUrl[currentImage]} alt="" />
                    <p>
                      Image {currentImage + 1} of {post.imageUrl.length}
                    </p>
                    <BiCaretLeft
                      style={{ cursor: "pointer" }}
                      size="22px"
                      onClick={previousImage}
                    />
                    <BiCaretRight
                      style={{ cursor: "pointer" }}
                      size="22px"
                      onClick={nextImage}
                    />
                  </ListingPictures>
                </ListingInformation>
                <ListingTitles>Description</ListingTitles>
                <ListingText>{post.description}</ListingText>
                <ListingTitles>Features</ListingTitles>
                <ListingFlex>
                  <ListingText>{post.ac ? "A/C" : null}</ListingText>
                  <ListingText>{post.balcony ? "Balcony" : null}</ListingText>
                  <ListingText>
                    {post.furnished ? "Furnished" : null}
                  </ListingText>
                  <ListingText>
                    {post.garageParking ? "Garage parking" : null}
                  </ListingText>
                  <ListingText>
                    {post.hardwoodFloor ? "Hardwood floors" : null}
                  </ListingText>
                  <ListingText>
                    {post.laundry ? "Laundry unit" : null}
                  </ListingText>
                  <ListingText>
                    {post.wheelchairAccess ? "Wheelchair accessibility" : null}
                  </ListingText>
                  <ListingText>
                    {post.pets ? "Pets are allowed" : null}
                  </ListingText>
                </ListingFlex>
                <ListingTitles>Housing and Contact Information</ListingTitles>
                <ListingText>Name: {post.name}</ListingText>
                <ListingText>Email: {post.email}</ListingText>
                <ListingText>Phone: {post.phone}</ListingText>
                <ListingText>Date Available: {post.dateAvailable}</ListingText>
                <ListingTitles>Touring Days</ListingTitles>
                <ListingFlex>
                  <ListingText>{post.tourMonday}</ListingText>
                  <ListingText>{post.tourTuesday}</ListingText>
                  <ListingText>{post.tourWednesday}</ListingText>
                  <ListingText>{post.tourThursday}</ListingText>
                  <ListingText>{post.tourFriday}</ListingText>
                  <ListingText>{post.tourSaturday}</ListingText>
                  <ListingText>{post.tourSunday}</ListingText>
                </ListingFlex>
              </>
            );
          })}
        </ListingBody>
      </ListingContainer>
      {coordinates[0]?.x ? (
        <MobileMap>
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
        </MobileMap>
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
