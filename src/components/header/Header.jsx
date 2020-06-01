import React from 'react';

import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Medium Clone</Link>

        <div>
        <ul className="nav navbar-nav pull-right" style={{ display: 'inherit'}}>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/login">Sign in</Link>
          </li>
          <li className="nav-item d-inline-block items">
            <Link className="nav-link" to="/register">Sign up</Link>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header;