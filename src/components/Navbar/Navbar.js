import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button } from "@material-ui/core";
import img from "../Images/download.png";
import useStyles from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { LOGOUT } from "../../contants/actionTypes";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const Logout = () => {
    dispatch({ type: LOGOUT });

    history.push("/login");
    setUser(null);
  };

  const token = user?.results?.token;

  if (token) {
    const decodedToken = decode(token);
    const date = new Date().getTime();

    if (decodedToken.exp * 1000 < date) {
      Logout();
    }
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"
      ></link>
      <Link to="/" className={classes.brandContainer}>
        <img className={classes.image} src={img} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.results.name}
              src={user.results.icon}
            >
              {user.results.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userFan} variant="h6">
              {user.results.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={Logout}
              target="_blank"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login" target="_blank" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Sign in
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
