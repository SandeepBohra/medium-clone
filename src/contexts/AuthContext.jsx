import React, { createContext, useState, useEffect } from "react";

import jwt from "jwt-decode";

import History from "../utils/History";

export const AuthContext = createContext({
  isLoggedIn: false,
  logOut: () => {}
});

export const AuthState = props => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [username, setUsername] = useState("");

  const logout = () => {
    setLoggedIn(false);
    setToken(null);
    setUsername("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    History.push("/home");
  };

  const setAuth = newToken => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setLoggedIn(true);
      setToken(newToken);
      const { username } = jwt(newToken);
      setUsername(username);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(localStorage.getItem("token"));
    }
  }, [token]);

  const authContext = {
    isLoggedIn: isLoggedIn,
    logout: logout,
    setAuth: setAuth,
    user: user,
    setUser: setUser,
    username: username,
    setUsername: setUsername,
    token: token
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
