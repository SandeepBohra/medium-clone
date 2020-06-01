import React, { useState } from 'react';

import { Link } from 'react-router-dom';

// Constants
import { EMAIL_VALIDATOR } from '../../Constants';

import './Login.css';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

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

  const handleSubmit = () => {

  }
  
  return (
    <div className="container fluid login-form">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-center">Sign in</h1>
        <div className="text-center"><Link to="/register">Need Account?</Link></div>
        <form>
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
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Login);