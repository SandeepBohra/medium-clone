import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import './Header.css';

const Header = () => {
  const { isLoggedIn, logout, userName } = useContext(AuthContext);
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
            <Link className="nav-link" to="/login">Account Settings</Link>
          </li>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/register">New Article</Link>
          </li>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to={`/user/${userName}`}>{userName}</Link>
          </li>
          <li className="nav-item d-inline-block items" onClick={logout}>
            <Link className="nav-link" to="/home">Log Out</Link>
          </li>
        </ul>
        )}
        </div>
      </div>
    </nav>
  )
}

export default Header;