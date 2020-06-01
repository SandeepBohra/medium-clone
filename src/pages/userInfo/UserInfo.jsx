import React from 'react';

import { Link, useParams } from 'react-router-dom';

import './UserInfo.css';

const UserInfo = () => {

  const { username } = useParams();
  console.log(username)
  

  return (
    <div className="user-profile">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <h2 className="text-center">{username}</h2>
              <Link to="/user-settings">
                <button
                  className="btn btn-primary"
                >
                  Edit Profile Settings
                </button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      <div className="user-articles">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;