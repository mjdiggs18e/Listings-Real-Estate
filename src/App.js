import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "@fontsource/open-sans";
import { UserProvider } from "./firebase/Firebase";
import Home from "./pages/index";
import LogIn from "./pages/login";
import CreateListing from "./pages/createlisting";
import Sell from "./pages/sell";
import Rent from "./pages/rent";
import Saved from "./pages/saved";
import Signup from "./pages/signup";

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
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/houses/create">
              <CreateListing />
            </Route>
            <Route path="/houses/sell">
              <Sell />
            </Route>
            <Route path="/houses/rent">
              <Rent />
            </Route>
            <Route path="/houses/saved">
              <Saved />
            </Route>
          </Switch>
        </Router>
      </AppContainer>
    </UserProvider>
  );
}

export default App;
