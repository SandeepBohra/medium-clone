import React, { useState, useContext } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

// Constants
import { EMAIL_VALIDATOR, LOGIN_API } from '../../Constants';

import './Login.css';

const Login = () => {

  const authContext = useContext(AuthContext);
  const { isLoggedIn, setAuth, setUser } = authContext;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const [apiError, setApiError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      if (!value) {
        setErrors({
          ...errors,
          [name]: 'Please enter your email',
        })
      } else {
        if (value) {
          if (!EMAIL_VALIDATOR.test(value)) {
            setErrors({
              ...errors,
              [name]: 'Please enter a valid email address',
            })
          } else {
            setErrors({
              ...errors,
              [name]: '',
            })
          }
        }
      }
      setEmail(value);
    }

    if (name === 'password') {
      if (!value) {
        setErrors({
          ...errors,
          [name]: 'Please enter the password',
        })
      } else {
        setErrors({
          ...errors,
          [name]: '',
        })
      }
      setPassword(value);
    }
  }

  const isSubmitDisabled = () => {
    if (!email || !password || !EMAIL_VALIDATOR.test(email)) {
      return true;
    }
    return false;
  }

  const handleSubmit = async (event) => {
    setApiError(null);
    event.preventDefault();
    const response = await fetch(LOGIN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        }
      })
    })

    if (!response.ok) {
      const { errors } = await response.json();
      setApiError(errors);
    } else {
      const { user } = await response.json();
      setAuth(user.token);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  if (isLoggedIn) {
    return (<Redirect to="/" />)
  }
  
  return (
    <div className="container fluid login-form">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-center">Sign in</h1>
        <div className="text-center"><Link to="/register">Need Account?</Link></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitDisabled()}
          >
            Sign In
          </button>
          {apiError && Object.keys(apiError).map(e => (
            <div className="error" key={e}>{`${e} ${apiError[e]}`}</div>
          ))}
        </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Login);