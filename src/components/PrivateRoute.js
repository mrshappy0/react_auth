import React from "react";
import Home from "./Home";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute(props) {
    const { user } = props
  return (
    <Route
      render={(routerProps) => {
        return localStorage.token ? <Home {...routerProps} user={user}/> : <Redirect to="login" />;
      }}
    />
  );
}
