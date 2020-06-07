import React, { useEffect, useState, useContext } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { USER_PROFILE_API, ARTICLES_API, ARTICLE_API } from '../../Constants';
import { AuthContext } from '../../contexts/AuthContext';

import ArticlesList from '../../components/articlesList/ArticlesList';
import Pagination from '../../components/pagination/Pagination';
import Loader from '../../components/loader/Loader';

import ApiHeader from '../../utils/ApiHeader';

import './UserProfile.css';

const ITEMS_PER_PAGE = 5;

const UserProfile = () => {

  const { username } = useParams();

  const history = useHistory();

  const { isLoggedIn, token } = useContext(AuthContext);

  const [fetchArticlesURL, setFetchArticlesURL] = useState(`${ARTICLES_API}?author=${username}&limit=${ITEMS_PER_PAGE}&offset=0`);
  const newURL = new URL(fetchArticlesURL);

  const [userProfile, setUserProfile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState(null);
  const [totalArticles, setTotalArticles] = useState(null);

  const [tab, setTab] = useState('my-articles');
  const [page, setPage] = useState(1);

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

  const handlePageClick = (pageClicked) => {
    newURL.searchParams.set('offset', (pageClicked - 1)*ITEMS_PER_PAGE);
    setFetchArticlesURL(newURL.href);
    setPage(pageClicked)
  }

  const toggleFavorite = async (slug) => {
    const favArticleURL = `${ARTICLE_API}/${slug}/favorite`;
    if (!isLoggedIn) {
      history.push('/login?destination='+window.location.pathname);
    } else {
      const selectedArticle = articles && articles.length && articles.filter(a => a.slug === slug)[0];
      const selectedArticleIndex = articles && articles.length && articles.findIndex(a => a.slug === slug);
      const response = await fetch(`${favArticleURL}`, {
        headers: ApiHeader(),
        method: selectedArticle.favorited ? 'DELETE' : 'POST',
      });
      const { article } = await response.json();
      const nArticles = [...articles];
      nArticles[selectedArticleIndex] = article;
      setArticles(nArticles);
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

    if (tab === 'my-articles') {
      setFetchArticlesURL(`${ARTICLES_API}?author=${username}&limit=10`);
    }
    if (tab === 'fav-articles') {
      setFetchArticlesURL(`${ARTICLES_API}?favorited=${username}&limit=10`);
    }

    fetchUserProfile();
  }, [username])

  useEffect(() => {
    const fetchArticles = async () => {
      setArticles(null);
      setLoading(true);
      const response = await fetch(fetchArticlesURL, {
        method: 'GET',
        headers: ApiHeader(),
      });
      if (response.ok) {
        const { articles, articlesCount } = await response.json();
        setArticles(articles);
        setTotalArticles(articlesCount);
      }
      setLoading(false);
    }

    fetchArticles();
  }, [fetchArticlesURL, isLoggedIn, token])
  

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

                <div className="articles-list text-center">
                  {loading && <Loader />}
                  <ArticlesList articles={articles} toggleFavorite={toggleFavorite} totalArticles={totalArticles} />
                  {!loading && <Pagination
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalPageCount={totalArticles}
                  activePage={page}
                  setActivePage={handlePageClick}
                  />}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;