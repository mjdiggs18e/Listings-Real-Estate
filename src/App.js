import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "@fontsource/open-sans";
import { UserProvider } from "./firebase/Firebase";
import Home from "./pages/index";
import LogIn from "./pages/login";
import CreateListing from "./pages/createlisting";
import Rent from "./pages/rent";
import Signup from "./pages/signup";
import SoloListing from "./pages/sololistings";
import ForgotPassword from "./pages/forgotpassword";
import PrivateRoute from "./components/PrivateRoute";

const GlobalStyle = createGlobalStyle`
  
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;  
    font-family: "Open Sans";
    color: #333333;
    background-color: #f8f9fa;
  }
  button {
    font-family: "Open Sans"; 
  }
  a {
    text-decoration: none;
    color: inherit
  }
`;

const AppContainer = styled.div`
  display: flex;

  @media (max-width: 1360px) {
    flex-direction: column;
  }
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
            <PrivateRoute path="/login" component={LogIn} />
            <PrivateRoute path="/signup" component={Signup} />
            <PrivateRoute path="/forgot-password" component={ForgotPassword} />
            <Route path="/houses/create">
              <CreateListing />
            </Route>
            <Route path="/houses/rent">
              <Rent />
            </Route>
            <Route path="/listing/:id">
              <SoloListing />
            </Route>
          </Switch>
        </Router>
      </AppContainer>
    </UserProvider>
  );
}

export default App;
