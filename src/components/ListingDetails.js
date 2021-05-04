import React, { useState, useEffect } from "react";
import { useAuth } from "../firebase/Firebase";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import styled from "styled-components";
import { BiCaretLeft, BiCaretRight, BiArrowBack } from "react-icons/bi";
const provider = new OpenStreetMapProvider();

// Start of styled components

const ListingContainer = styled.div`
  width: 43vw;
  padding: 1rem;
  margin-left: 80px;

  @media (max-width: 1374px) {
    width: 100vw;
    padding: 0;
    text-align: center;
    margin-left: 0;
  }
`;

const ListingTitle = styled.h1`
  font-weight: 500;
  text-align: center;
  font-size: 22px;
  margin-top: 1.5rem;
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

  & p {
    padding: 0.2rem;
    background-color: #0f7173;
    width: 25%;
    margin: 10px auto;
    color: #fff;
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
  margin: 1rem auto;
  text-align: center;
  width: 80%;
`;

const ListingFeatures = styled.p`
  margin: 1rem;
`;

const ListingTitles = styled.h2`
  margin: 1.5rem 0;
  text-align: center;
  font-weight: 500;
  text-decoration: underline;
  @media (max-width: 768px) {
    margin: 1rem;
  }
`;

const ListingReturn = styled.div`
  position: absolute;
  margin: 1.7rem 1rem;

  @media (max-width: 1374px) {
    display: none;
  }
`;

const MobileMap = styled.div`
  display: none;
  @media (min-width: 1375px) {
    position: fixed;
    display: flex;
    right: 0;
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

  const [currentImage, setCurrentImage] = useState(0);

  return loading ? (
    <Loading />
  ) : (
    <>
      <ListingContainer>
        <Link to="/">
          <ListingReturn>
            <BiArrowBack size="22px" />
          </ListingReturn>
        </Link>
        <ListingTitle>{id}</ListingTitle>
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
                  <ListingPictures>
                    <img src={post.imageUrl[currentImage]} alt="" />
                    <p>
                      {currentImage + 1} of {post.imageUrl.length}
                    </p>
                    <BiCaretLeft
                      style={{ cursor: "pointer" }}
                      size="26px"
                      onClick={previousImage}
                    />
                    <BiCaretRight
                      style={{ cursor: "pointer" }}
                      size="26px"
                      onClick={nextImage}
                    />
                  </ListingPictures>
                  <ListingCost>{post.monthlyRent}</ListingCost>
                  <ListingFlex>
                    <ListingRooms>{post.bedrooms} Bedrooms</ListingRooms>
                    <ListingRooms>{post.bathrooms} Bathrooms</ListingRooms>
                    <ListingRooms>{post.squarefeet} Square Feet</ListingRooms>
                  </ListingFlex>
                </ListingInformation>
                <ListingTitles>Description</ListingTitles>
                <ListingText>{post.description}</ListingText>
                <ListingTitles>Features</ListingTitles>
                <ListingFlex>
                  {post.ac ? <ListingFeatures>A/C</ListingFeatures> : null}
                  {post.balcony ? (
                    <ListingFeatures>Balcony</ListingFeatures>
                  ) : null}
                  {post.furnished ? (
                    <ListingFeatures>Furnished</ListingFeatures>
                  ) : null}
                  {post.garageParking ? (
                    <ListingFeatures>Garage Parking</ListingFeatures>
                  ) : null}
                  {post.hardwoodFloor ? (
                    <ListingFeatures>Hardwood Floors</ListingFeatures>
                  ) : null}
                  {post.laundry ? (
                    <ListingFeatures>Laundry</ListingFeatures>
                  ) : null}
                  {post.offstreetParking ? (
                    <ListingFeatures>Off-Street Parking</ListingFeatures>
                  ) : null}
                  {post.wheelchairAccess ? (
                    <ListingFeatures>Wheelchair Access</ListingFeatures>
                  ) : null}
                </ListingFlex>
                <ListingTitles>Housing and Contact Information</ListingTitles>
                <ListingText>Name: {post.name}</ListingText>
                <ListingText>Email: {post.email}</ListingText>
                <ListingText>Phone: {post.phone}</ListingText>
                <ListingText>Date Available: {post.dateAvailable}</ListingText>
                <ListingTitles>Touring Days</ListingTitles>
                <ListingFlex>
                  {post.tourMonday ? (
                    <ListingFeatures>Monday</ListingFeatures>
                  ) : null}
                  {post.tourTuesday ? (
                    <ListingFeatures>Tuesday</ListingFeatures>
                  ) : null}
                  {post.tourWednesday ? (
                    <ListingFeatures>Wednesday</ListingFeatures>
                  ) : null}
                  {post.tourThursday ? (
                    <ListingFeatures>Thursday</ListingFeatures>
                  ) : null}
                  {post.tourFriday ? (
                    <ListingFeatures>Friday</ListingFeatures>
                  ) : null}
                  {post.tourSaturday ? (
                    <ListingFeatures>Saturday</ListingFeatures>
                  ) : null}
                  {post.tourSunday ? (
                    <ListingFeatures>Sunday</ListingFeatures>
                  ) : null}
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
