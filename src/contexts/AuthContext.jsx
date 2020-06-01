import React, { createContext, useState, useEffect } from 'react';

// import jwt from 'jwt-decode';

import History from '../utils/History';

export const AuthContext = createContext({
  isLoggedIn: false,
  logOut: () => {},
});

export const AuthState = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    History.push('/');
  };

  const setAuth = (newToken) => {
    if (newToken) {
      setLoggedIn(true);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      // const { username } = jwt(newToken);
      // setUserName(username);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(localStorage.getItem('token'));
    }
  }, [token]);

  const authContext = {
    isLoggedIn: isLoggedIn,
    logout: logout,
    setAuth: setAuth,
    user: user,
    setUser: setUser,
  };

  return (<AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>);
}