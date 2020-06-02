import React, { useState, useContext } from 'react';

// import { Link } from 'react-router-dom';
import { SINGLE_USER_API } from '../../Constants';

import { AuthContext } from '../../contexts/AuthContext';

import './UserSettings.css';

const UserSettings = () => {

  const { user, token, setAuth, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    image: user.image,
    username: user.username,
    bio: user.bio,
    email: user.email,
    password: '',
  });

  const [apiError, setApiError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(SINGLE_USER_API, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'authorization': `Token ${token}`,        
      },
      body: JSON.stringify({...formData}),
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


  return (
    <div className="container fluid user-settings">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-center">User Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="profilePic"
              placeholder="URL of profile picture"
              value={formData.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="username"
              placeholder="Short bio about you"
              rows="10"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary float-right"
          >
            Update Settings
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

export default UserSettings;