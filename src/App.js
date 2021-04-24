import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import MapBar from "./components/MapBar";
import ListingBar from "./components/ListingBar";
import Sidebar from "./components/Sidebar";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;  
  }
`;

const AppContainer = styled.div`
  display: flex;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Sidebar />
      <ListingBar />
      <MapBar />
    </AppContainer>
  );
}

export default App;
