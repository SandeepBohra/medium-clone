import React, { useEffect, useState, useContext } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { USER_PROFILE_API, ARTICLES_API } from '../../Constants';
import { AuthContext } from '../../contexts/AuthContext';

import ArticlesList from '../../components/articlesList/ArticlesList';

import './UserInfo.css';

const UserInfo = () => {

  const { username } = useParams();

  const history = useHistory();

  const { isLoggedIn } = useContext(AuthContext);

  const [fetchArticlesURL, setFetchArticlesURL] = useState(`${ARTICLES_API}&author=${username}`);
  const newURL = new URL(fetchArticlesURL);

  const [userProfile, setUserProfile] = useState(null);
  const [articles, setArticles] = useState(null);

  const [tab, setTab] = useState('my-articles');

  const handleTabClick = (tabId) => {
    setTab(tabId);

    if (tabId === "my-articles") {
      newURL.searchParams.delete('favorited');
      newURL.searchParams.set('author', username);
    } else if (tabId === 'fav-articles') {
      newURL.searchParams.delete('author');
      newURL.searchParams.set('favorited', username);
    }
    setFetchArticlesURL(newURL.href);
  }

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      history.push('/login?destination='+window.location.pathname);
    } else {
      
    }
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      setArticles(null);
      const response = await fetch(`${USER_PROFILE_API}/${username}`);
      if (response.ok) {
        const { profile } = await response.json();
        setUserProfile(profile);
      }
    }

    fetchUserProfile();
  }, [username])

  useEffect(() => {
    const fetchArticles = async () => {
      setArticles(null);
      const response = await fetch(fetchArticlesURL);
      if (response.ok) {
        const { articles } = await response.json();
        setArticles(articles);
      }
    }

    fetchArticles();
  }, [fetchArticlesURL])
  

  return (
    <div className="user-profile">
      {userProfile && (
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={userProfile.image} alt={userProfile.image} />
              <h3 className="text-center mt-3">{username}</h3>
            </div>
          </div>
        </div>
      </div>
      )}

      <div className="user-articles">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="article-tabs">
                <ul className="nav nav-tabs">
                  <li className="nav-item all-articles" onClick={() => handleTabClick("my-articles")}>
                    <button
                      id="all"
                      className={`nav-link ${tab === 'my-articles' ? 'active' : ''}`}
                    >
                      My Articles
                    </button>
                  </li>
                  <li className="nav-item fav-articles" onClick={() => handleTabClick("fav-articles")}>
                    <button
                      id="all"
                      className={`nav-link ${tab === 'fav-articles' ? 'active' : ''}`}
                    >
                      Favorite Articles
                    </button>
                  </li>
                </ul>
                <ArticlesList articles={articles} toggleFavorite={toggleFavorite} />
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;