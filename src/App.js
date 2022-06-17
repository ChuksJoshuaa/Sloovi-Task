import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Single from "./components/Single";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/task" />} />
          <Route exact path="/task">
            <Home />
          </Route>
          <Route exact path="/task/:id">
            <Single />
          </Route>
          <Route
            exact
            path="/login"
            component={() => (!user ? <Auth /> : <Redirect to="/task" />)}
          />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
