import React from "react";
import styled from "styled-components";
import {
  BiPlus,
  BiBuildings,
  BiBed,
  BiLogOut,
  BiLogIn,
  BiArchive,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/Firebase";

const SidebarContainer = styled.div`
  min-width: 80px;
  min-height: 100vh;
  border-right: 2px solid #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;

  @media (min-width: 320px) {
    flex-direction: row;
    height: 20px;
    min-height: unset;
    padding: 1rem 0;
    width: 100vw;
    min-width: unset;
    align-items: center;
    border-right: 0;
    justify-content: space-evenly;
  }

  & svg {
    color: #757373;
    font-size: 22px;
    margin: 3rem 0;
    cursor: pointer;
    @media (min-width: 320px) {
      margin: 0;
    }
  }
`;

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  return currentUser ? (
    <SidebarContainer>
      <Link to="/houses/create">
        <BiPlus />
      </Link>
      <Link to="/">
        <BiBed />
      </Link>
      <Link to="/houses/rent">
        <BiBuildings />
      </Link>
      <Link to="/houses/saved">
        <BiArchive />
      </Link>
      <Link to="/houses/saved">
        <BiLogOut onClick={() => logout()} />
      </Link>
    </SidebarContainer>
  ) : (
    <SidebarContainer>
      <Link to="/">
        <BiBed />
      </Link>
      <Link to="/houses/rent">
        <BiBuildings />
      </Link>
      <Link to="/login">
        <BiLogIn />
      </Link>
    </SidebarContainer>
  );
};

export default Sidebar;
