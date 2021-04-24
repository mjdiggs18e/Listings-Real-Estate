import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../firebase/Firebase";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  // If a user is logged in and tries to visit the signup or login page. They are redirected back to the home page.

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Redirect to="/" /> : <Component {...props} />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
