import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/Firebase";

const ListingContainer = styled.div`
  margin-top: 2rem;
  @media (min-width: 320px) {
    margin-top: 1rem;
  }
`;
const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #fcfafa;
  -webkit-box-shadow: -2px 0px 20px 2px rgba(0, 0, 0, 0.1);
  box-shadow: -2px 0px 20px 2px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  width: 800px;
`;
const PostImage = styled.img`
  border-radius: 4px;
  width: auto;
  height: 150px;
`;

const PostBody = styled.div`
  margin: 0 1rem;
`;
const PostCost = styled.h1`
  font-weight: 500;
  margin: 0.5rem;
  font-size: 22px;
`;
const PostText = styled.p`
  margin: 0.5rem;
`;
const PostDiv = styled.div`
  display: flex;
`;

const RetrieveRentListings = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { database } = useAuth();

  useEffect(() => {
    const listings = database
      .collection("listings")
      .orderBy("leaseDuration", "desc")
      .where("leaseDuration", "!=", "rent_to_own")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push([doc.data(), doc.id]);
        });
        setPosts(items);
        setLoading(false);
      });

    return () => {
      listings();
    };
  }, []);

  return loading ? (
    <h1>Loading Listings</h1>
  ) : (
    <ListingContainer>
      {posts.map((post) => {
        return (
          <Link to={`/listing/${post[0].address}`}>
            <PostContainer key={post[0].imageUrl[0]}>
              <PostImage src={post[0].imageUrl[0]} alt="" />
              <PostBody>
                <PostCost>{post[0].monthlyRent}</PostCost>
                <PostDiv>
                  <PostText>{post[0].bedrooms} Bedrooms</PostText>
                  <PostText>{post[0].bathrooms} Bathrooms</PostText>
                  <PostText>{post[0].squarefeet} Square Feet</PostText>
                </PostDiv>
                <PostText>{post[0].address}</PostText>
              </PostBody>
            </PostContainer>
          </Link>
        );
      })}
    </ListingContainer>
  );
};

export default RetrieveRentListings;