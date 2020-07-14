import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";
import { API_ENDPOINTS } from "../../constants/Constants";

import { AuthContext } from "../../contexts/AuthContext";
import ApiHeader from "../../utils/ApiHeader";

import "./UserSettings.css";

const UserSettings = () => {
  const history = useHistory();

  const { user, setAuth, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    image: user.image,
    username: user.username,
    bio: user.bio,
    email: user.email,
    password: ""
  });

  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(API_ENDPOINTS.USER, {
      method: "PUT",
      headers: ApiHeader(),
      body: JSON.stringify({ ...formData })
    });

    if (!response.ok) {
      const { errors } = await response.json();
      setApiError(errors);
    } else {
      const { user } = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(user.token);
      setUser(user);
      history.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="container fluid user-settings">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-center">User Settings</h1>
          <form onSubmit={handleSubmit}>
            <fieldset disabled={loading}>
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
              <button type="submit" className="btn btn-primary float-right">
                {loading ? "updating..." : "Update Settings"}
              </button>
            </fieldset>

            {apiError &&
              Object.keys(apiError).map(e => (
                <div className="error" key={e}>{`${e} ${apiError[e]}`}</div>
              ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
