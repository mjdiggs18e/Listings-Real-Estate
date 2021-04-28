import React, { useState, useEffect } from "react";
import { useAuth } from "../firebase/Firebase";
import dayjs, { relativeTime } from "dayjs";

const ListingDetails = ({ id }) => {
  const [postInformation, setPostInformation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { database } = useAuth();

  // Gets all information for the route that matches the post id.

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
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    postInformation.map((post) => {
      dayjs.extend(relativeTime);
      const postCreatedAt = dayjs.unix(post.createdAt);
      const currentTime = dayjs();
      const timeSincePost = postCreatedAt.from(currentTime);
      return <h1>{post.address}</h1>;
    })
  );
};

export default ListingDetails;
