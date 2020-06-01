import React, { useState, useContext, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { POPULAR_TAGS_API, ARTICLES_API, IMG_SRC } from '../../Constants';

// Context
import { AuthContext } from '../../contexts/AuthContext';

import './Home.css';


const Home = () => {

  const { isLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  const [fetchURL, setFetchURL] = useState(ARTICLES_API);

  const newFetchURL = new URL(fetchURL);

  const [articles, setArticles] = useState(null);
  const [totalArticles, setTotalArticles] = useState(null);
  const [tags, setTags] = useState(null);

  const [activeTab, setActiveTab] = useState('all');

  const [tagSelected, setTagSelected] = useState(null);

  const [articlesError, setArticlesError] = useState(null);
  // const [tagsError, setTagsError] = useState(null);

  const onTagClick = (tag) => {
    setActiveTab('tag');
    setTagSelected(tag);
    setArticles(null);

    if (newFetchURL.searchParams.has('tag')) {
      newFetchURL.searchParams.set('tag', tag);
    } else {
      newFetchURL.searchParams.append('tag', tag);
    }
    setFetchURL(newFetchURL.href);
  }

  const allArticles = () => {
    setActiveTab('all');
    setTagSelected(null);
    setArticles(null);

    if (newFetchURL.searchParams.has('tag')) {
      newFetchURL.searchParams.delete('tag');
    }
    setFetchURL(newFetchURL.href);
  }

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      history.push('/login?destination='+window.location.pathname);
    }
  }

  useEffect(() => {

    const fetchArticles = async () => {
      const response = await fetch(ARTICLES_API);
      if (!response.ok) {
        const { errors } = await response.json();
        setArticlesError(errors);
      } else {
        const { articles, articlesCount } = await response.json();
        setArticles(articles);
        setTotalArticles(articlesCount);
      }
    }

    const fetchTags = async () => {
      const response = await fetch(POPULAR_TAGS_API);
      if (!response.ok) {
        const { errors } = await response.json();
        setArticlesError(errors);
      } else {
        const { tags } = await response.json();
        setTags(tags);
      }
    }

    fetchArticles();
    fetchTags();
  }, [])

  useEffect(() => {

    const fetchArticles = async () => {
      const response = await fetch(fetchURL);
      if (!response.ok) {
        const { errors } = await response.json();
        setArticlesError(errors);
      } else {
        const { articles, articlesCount } = await response.json();
        setArticles(articles);
        setTotalArticles(articlesCount);
      }
    }

    fetchArticles();

  }, [fetchURL])

  return (
    <div className="home text-center">
      <div className="banner">
        <div className="container">
          <h1 className="py-3">Medium Clone</h1>
          <p>Create and share awesome articles, like them, add them as favorite, comment on them...</p>
        </div>
      </div>

        <div className="container articles-and-tags">
          {/* All articles, tag selected articles, tabs */}
          <div className="row">
            <div className="col-md-9">
              <div className="article-tabs">
                <ul className="nav nav-tabs">
                  <li className="nav-item all-articles" onClick={allArticles}>
                    <button
                      id="all"
                      className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                      href="#"
                    >
                      All Articles
                    </button>
                  </li>
                  {tagSelected && (<li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'tag' ? 'active' : ''}`}
                      href="#"
                    >
                      {`#${tagSelected}`}
                    </button>
                  </li>)}
                </ul>
                <div className="articles-list">
                  {articles && articles.map(article => (
                    <div key={article.slug} className="article text-left">
                      <div className="article-info">
                        <Link to={`/user/${article.author.username}`}>
                          <img src={IMG_SRC} className="user-avatar" alt={article.author.username} />
                        </Link>
                        <div className="info">
                          <Link to={`/user/${article.author.username}`} className="article-author">
                            {article.author.username}
                          </Link>
                          <div className="posted-date">{moment(article.createdAt).format('MMMM D, YYYY')}</div>
                        </div>
                        <button className="float-right" onClick={toggleFavorite}>Favorite</button>
                      </div>

                      <Link to={`/article/${article.slug}`}>
                        <h2>{article.title}</h2>
                        <p>{article.body}</p>
                        <div>read more....</div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>

            <div className="col-md-3">
              <div className="popular-tags">
                <p>Popular Tags</p>
                <div className="tags">
                  {tags && tags.map(tag => (
                    <div
                      key={tag}
                      className="tag"
                      onClick={() => onTagClick(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Home;