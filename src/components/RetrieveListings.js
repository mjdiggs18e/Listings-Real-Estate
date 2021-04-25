import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../firebase/Firebase";

const ListingContainer = styled.div``;

const RetrieveListings = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { database } = useAuth();

  useEffect(() => {
    const listings = database
      .collection("listings")
      .orderBy("createdAt", "desc")
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

  return (
    <ListingContainer>
      {posts.map((post) => {
        return <h1>{post[0].name}</h1>;
      })}
    </ListingContainer>
  );
};

export default RetrieveListings;
