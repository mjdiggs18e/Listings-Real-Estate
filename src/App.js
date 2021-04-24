import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "@fontsource/open-sans";
import { UserProvider } from "./firebase/Firebase";
import Home from "./pages/index";
import LogIn from "./pages/login";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;  
    font-family: "Open Sans";
  }
  button {
    font-family: "Open Sans"; 
  }
`;

const AppContainer = styled.div`
  display: flex;
`;

function App() {
  return (
    <UserProvider>
      <AppContainer>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <LogIn />
            </Route>
          </Switch>
        </Router>
      </AppContainer>
    </UserProvider>
  );
}

export default App;
