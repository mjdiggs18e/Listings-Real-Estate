import React from "react";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";

const ListingBarContainer = styled.div`
  width: 47vw;
  padding: 2rem;
`;

const ListingSearchBar = styled.div`
  display: flex;
  & svg {
    color: #757373;
    font-size: 22px;
  }
`;

const ListingSearchInput = styled.input`
  border: none;
  border-bottom: 1px solid #dddddd;
  outline: none;
  width: 30vw;
  font-size: 16px;
`;

const ListingBar = () => {
  return (
    <ListingBarContainer>
      <ListingSearchBar>
        <BiSearchAlt />
        <form>
          <ListingSearchInput type="text" />
        </form>
      </ListingSearchBar>
    </ListingBarContainer>
  );
};

export default ListingBar;
