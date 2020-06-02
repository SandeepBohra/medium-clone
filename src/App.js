import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { AuthState, AuthContext } from './contexts/AuthContext';

import ProtectedRoute from './routes/ProtectedRoute';

import Header from './components/header/Header';
import Home from './pages/home/Home';
import Article from './pages/article/Article';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UserInfo from './pages/userInfo/UserInfo';
import UserSettings from './pages/userSettings/UserSettings';
import NewArticle from './pages/newArticle/NewArticle';
import Dashboard from './pages/dashboard/Dashboard';

import './App.css';

function App() {
  return (
    <AuthState>
      <AuthContext.Consumer>
        {context => (
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/">
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
                <UserInfo />
              </Route>
              <Route exact path="/settings">
                <UserSettings />
              </Route>
              <ProtectedRoute isLoggedIn={context.isLoggedIn} component={NewArticle} />
              <ProtectedRoute isLoggedIn={context.isLoggedIn} component={Dashboard}/>
            </Switch>
          </div>
        )}
    </AuthContext.Consumer>
    </AuthState>
    
    
  );
}

export default App;
