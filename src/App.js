import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
