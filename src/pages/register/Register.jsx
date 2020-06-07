import React, { useState, useContext } from 'react';

import { Link, Redirect } from 'react-router-dom';

// Context
import { AuthContext } from '../../contexts/AuthContext';

// Constants
import { EMAIL_VALIDATOR, REGISTER_USER_API } from '../../Constants';

import './Register.css';


const Register = () => {

  const authContext = useContext(AuthContext);
  const { setAuth, setUser, isLoggedIn } = authContext;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
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
    }

    if (name === 'username') {
      if (!value) {
        setErrors({
          ...errors,
          [name]: 'Please enter your username',
        })
      } else {
        setErrors({
          ...errors,
          [name]: '',
        })
      }
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
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }
  
  const handleSubmit = async (event) => {
    setApiError(null);
    event.preventDefault();
    const response = await fetch(REGISTER_USER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        user: {
          ...formData,
        }
      })
    })

    if (!response.ok) {
      const { errors } = await response.json();
      console.log(errors);
      setApiError(errors);
    } else {
      const { user } = await response.json();
      setAuth(user.token);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  const isSubmitDisabled = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      return true;
    }
  }

  if (isLoggedIn) {
    return (<Redirect to="/" />)
  }

  return (
    <div className="container fluid register-form">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-center">Register</h1>
        <div className="text-center"><Link to="/login">Already have an account?</Link></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitDisabled()}
          >
            Register
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

export default React.memo(Register);