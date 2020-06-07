import React, { useState, useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { POPULAR_TAGS_API, ARTICLES_API, ARTICLE_API, FETCH_USER_ARTICLES_API } from '../../Constants';

import ArticlesList from '../../components/articlesList/ArticlesList';
import Pagination from '../../components/pagination/Pagination';
import Loader from '../../components/loader/Loader';
import ApiHeader from '../../utils/ApiHeader';

// Context
import { AuthContext } from '../../contexts/AuthContext';

import './Home.css';

const ITEMS_PER_PAGE = 10;

const Home = () => {

  const { isLoggedIn, token } = useContext(AuthContext);

  const history = useHistory();

  const [fetchURL, setFetchURL] = useState(isLoggedIn ? FETCH_USER_ARTICLES_API : `${ARTICLES_API}?limit=${ITEMS_PER_PAGE}&offset=0`);

  const newFetchURL = new URL(fetchURL);

  const [loading, setLoading] = useState(false);

  const [articles, setArticles] = useState(null);
  const [totalArticles, setTotalArticles] = useState(null);
  const [tags, setTags] = useState(null);

  const [page, setPage] = useState(1);

  const [activeTab, setActiveTab] = useState(isLoggedIn ? 'your-articles' : 'all-articles');

  const [tagSelected, setTagSelected] = useState(null);

  const [articlesError, setArticlesError] = useState(null);
  const [tagsError, setTagsError] = useState(null);

  const onTagClick = (tag) => {
    setActiveTab('tag-articles');
    setTagSelected(tag);
    setArticles(null);

    if (newFetchURL.searchParams.has('tag')) {
      newFetchURL.searchParams.set('tag', tag);
    } else {
      newFetchURL.searchParams.append('tag', tag);
    }
    setFetchURL(newFetchURL.href);
  }

  const yourArticles = () => {
    setActiveTab('your-articles');
    setTagSelected(null);
    setArticles(null);
    setFetchURL(FETCH_USER_ARTICLES_API);
  }

  const allArticles = () => {
    setActiveTab('all-articles');
    setTagSelected(null);
    setArticles(null);
    setFetchURL(`${ARTICLES_API}?limit=${ITEMS_PER_PAGE}&offset=0`);
  }

  const handlePageClick = (pageClicked) => {
    newFetchURL.searchParams.set('offset', (pageClicked - 1)*ITEMS_PER_PAGE);
    setFetchURL(newFetchURL.href);
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
    const fetchTags = async () => {
      const response = await fetch(POPULAR_TAGS_API);
      if (response.ok) {
        const { tags } = await response.json();
        setTags(tags);
      } else {
        const { errors } = await response.json();
        setTagsError(errors);
      }
    }

    fetchTags();
  }, [])

  useEffect(() => {

    const fetchArticles = async () => {
      setArticles(null);
      setLoading(true);
      setArticlesError(null);
      const response = await fetch(fetchURL, {
        headers: ApiHeader(),
      });
      if (response.ok) {
        const { articles, articlesCount } = await response.json();
        setArticles(articles);
        setTotalArticles(articlesCount);
      } else {
        const { errors } = await response.json();
        setArticlesError(errors);
      }
      setLoading(false);
    }

    fetchArticles();

  }, [fetchURL, token, isLoggedIn, page])

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
                  {isLoggedIn && (<li className="nav-item all-articles" onClick={yourArticles}>
                    <button
                      id="all"
                      className={`nav-link ${isLoggedIn && activeTab === 'your-articles' ? 'active' : ''}`}
                    >
                      Your Articles
                    </button>
                  </li>)}
                  <li className="nav-item all-articles" onClick={allArticles}>
                    <button
                      id="all"
                      className={`nav-link ${activeTab === 'all-articles' ? 'active' : ''}`}
                    >
                      All Articles
                    </button>
                  </li>
                  {tagSelected && (<li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'tag-articles' ? 'active' : ''}`}
                    >
                      {`#${tagSelected}`}
                    </button>
                  </li>)}
                </ul>
                <div className="articles-list">
                {!loading && articles && articles.length ? (
                  <ArticlesList
                    articles={articles}
                    toggleFavorite={toggleFavorite}
                    totalArticles={totalArticles} 
                  />
                ): null}
                {!loading && (
                  <Pagination
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalPageCount={totalArticles}
                  activePage={page}
                  setActivePage={handlePageClick}
                />
                )}
                
                {loading && <Loader />}
                {articlesError && Object.keys(articlesError).map(e => (
                    <div className="error" key={e}>{`${e} ${articlesError[e]}`}</div>
                ))}
                </div>
                
                {articles && articles.length === 0 ? (
                  <div className="no-articles-yet">No Articles yet.</div>
                ): null}
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
                  {tagsError && Object.keys(tagsError).map(e => (
                    <div className="error" key={e}>{`${e} ${tagsError[e]}`}</div>
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