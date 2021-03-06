import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import './Header.css';

const Header = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">Medium Clone</Link>

        <div>
        {!isLoggedIn ? (<ul className="nav navbar-nav pull-right" style={{ display: 'inherit'}}>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/login">Sign in</Link>
          </li>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/register">Sign up</Link>
          </li>
        </ul>) : (
          <ul className="nav navbar-nav pull-right" style={{ display: 'inherit'}}>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/editor">
              <i className="material-icons m-icon">create</i>
              New Article
            </Link>
          </li>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/settings">
              <i className="material-icons m-icon">settings</i>
              Settings
            </Link>
          </li>
          {user && user.username && (<li className="nav-item d-inline-block items">
            <Link className="nav-link" to={`/user/${user.username}`}>
              <i className="material-icons m-icon">person</i>
              {user.username}
            </Link>
          </li>)}
          <li className="nav-item d-inline-block items" onClick={logout}>
            <Link className="nav-link" to="/login">
              <i className="material-icons m-icon">logout</i>
              Log Out
            </Link>
          </li>
        </ul>
        )}
        </div>
      </div>
    </nav>
  )
}

export default Header;