import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { useAuth } from "../firebase/Firebase";
import Loading from "./Loading";

const ListingContainer = styled.div`
  margin-top: 2rem;

  @media (max-width: 1024px) {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 1025px) and (max-width: 1360px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  @media (min-width: 1400px) and (max-width: 1850px) {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  @media (max-width: 1024px) {
    width: clamp(250px, 50vw, 700px);
    margin: 1rem 0;
  }
  @media (min-width: 1025px) and (max-width: 1360px) {
    width: 400px;
    margin: 1rem 2rem;
  }

  @media (min-width: 1361px) and (max-width: 1850px) {
    width: 500px;
  }
`;
const PostImage = styled.img`
  border-radius: 4px;
  width: auto;
  height: 150px;

  @media (max-width: 1024px) {
    width: clamp(250px, 50vw, 700px);
    object-fit: cover;
  }
  @media (min-width: 1025px) and (max-width: 1845px) {
    width: clamp(250px, 50vw, 700px);
    object-fit: cover;
  }
`;

const PostBody = styled.div`
  margin: 0 1rem;

  @media (max-width: 650px) {
    font-size: 20px;
  }
`;
const PostCost = styled.h1`
  font-weight: 500;
  margin: 0.5rem;
  font-size: 22px;
  @media (max-width: 425px) {
    font-size: 16px;
  }
  @media (max-width: 699px) {
    font-size: 20px;
  }
`;
const PostText = styled.p`
  margin: 0.5rem;
  @media (max-width: 425px) {
    font-size: 10px;
  }
  @media (max-width: 699px) {
    font-size: 12px;
  }
`;
const PostDiv = styled.div`
  display: flex;
`;

const PostForm = styled.form`
  display: flex;
  align-items: center;
`;

const PostInput = styled.input`
  width: 200px;
  padding: 0.3rem;
  outline: none;
  border: 1px solid #a8b4c1;
  border-radius: 4px;
  font-family: "Open Sans";
  margin-left: 10px;
`;

const RetrieveListings = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { database } = useAuth();

  const searchTerm = useRef();
  const [search, setSearch] = useState(" ");

  const searchLookup = (e) => {
    e.preventDefault();
    setSearch(searchTerm.current.value.toLowerCase());
  };

  useEffect(() => {
    const listings = database
      .collection("listings")
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
    <Loading />
  ) : (
    <ListingContainer>
      <PostForm>
        <BiSearchAlt size="22px" />
        <PostInput
          type="text"
          ref={searchTerm}
          onChange={searchLookup}
          placeholder="Search for an Address"
        />
      </PostForm>
      {posts
        .map((post) => {
          return (
            <Link to={`/listing/${post[0].address}`}>
              <PostContainer key={post[0].imageUrl[0]}>
                <PostImage src={post[0].imageUrl[0]} alt="" />
                <PostBody>
                  <PostCost>{post[0].monthlyRent}</PostCost>
                  <PostDiv>
                    <PostText>{post[0].bedrooms} Bedrooms</PostText>
                    <PostText>{post[0].bathrooms} Bathrooms</PostText>
                    <PostText>{post[0].squarefeet} SqFt</PostText>
                  </PostDiv>
                  <PostText>{post[0].address}</PostText>
                </PostBody>
              </PostContainer>
            </Link>
          );
        })
        .filter((lookup) => lookup.props.to.toLowerCase().includes(search))}
    </ListingContainer>
  );
};

export default RetrieveListings;
