import React, { useState } from 'react';

import { Link } from 'react-router-dom';

// Constants
import { EMAIL_VALIDATOR } from '../../Constants';

import './Register.css';

const Register = () => {

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
  
  const handleSubmit = () => {
  
  }

  const isSubmitDisabled = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      return true;
    }
  }

  return (
    <div className="container fluid login-form">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-center">Register</h1>
        <div className="text-center"><Link to="/login">Already have an account?</Link></div>
        <form>
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
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Register);