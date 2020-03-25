import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import { Route, Switch, Redirect } from "react-router-dom";
const loginUrl = "http://localhost:3000/api/v1/login";
const profileUrl = "http://localhost:3000/api/v1/profile";

class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    if (localStorage.token) {
      fetch(profileUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(response => response.json())
        .then(result =>
          this.setState({
            user: result.user
          })
        );
    }
  }

  login = user => {
    return fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })
      .then(response => response.json())
      .then(result => {
        localStorage.setItem("token", result.jwt);
        this.setState({
          user: result.user
        });
      });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" user={this.state.user} />
          <Route
            path="/login"
            render={props => <Login {...props} login={this.login} />}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
