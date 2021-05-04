import React from "react";
import { css } from "styled-components";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 100px auto;
`;

const Loading = () => {
  return <HashLoader color="#0f7173" size={60} css={override} />;
};

export default Loading;
