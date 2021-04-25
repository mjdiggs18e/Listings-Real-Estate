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

  & svg {
    color: #757373;
    font-size: 22px;
    margin: 3rem 0;
    cursor: pointer;
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
      <BiLogOut onClick={() => logout()} />
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
