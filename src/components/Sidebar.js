import React from "react";
import styled from "styled-components";
import {
  BiHome,
  BiBuildings,
  BiBed,
  BiUserCircle,
  BiLogOut,
  BiLogIn,
} from "react-icons/bi";

const SidebarContainer = styled.div`
  width: 3vw;
  height: 100vh;
  border-right: 2px solid #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;

  & svg {
    color: #919191;
    font-size: 22px;
    padding: 3rem 0;
  }

  & svg:last-of-type {
    margin-top: auto;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <BiBed />
      <BiHome />
      <BiBuildings />
      <BiLogIn />
    </SidebarContainer>
  );
};

export default Sidebar;
