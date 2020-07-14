import React from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/home/Home";
import Article from "../pages/article/Article";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserProfile from "../pages/user-profile/UserProfile";
import UserSettings from "../pages/user-settings/UserSettings";
import NewArticle from "../pages/new-article/NewArticle";
import EditArticle from "../pages/edit-article/EditArticle";

const AppRoutes = ({ context }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/article/:slug">
        <Article />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/user/:username">
        <UserProfile />
      </Route>
      <Route exact path="/settings">
        <UserSettings />
      </Route>
      <ProtectedRoute
        path="/editor/:slug"
        isLoggedIn={context.isLoggedIn}
        component={EditArticle}
      />
      <ProtectedRoute
        path="/editor"
        isLoggedIn={context.isLoggedIn}
        component={NewArticle}
      />
    </Switch>
  );
};

export default AppRoutes;
