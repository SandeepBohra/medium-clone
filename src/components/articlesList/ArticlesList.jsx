import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './ArticlesList.css';

const ArticlesList = ({ articles, toggleFavorite }) => {
  
  return (
    <div className="articles-list">
      {articles && articles.length ? articles.map(article => (
        <div key={article.slug} className="article text-left">
          <div className="article-info">
            <Link to={`/user/${article.author.username}`}>
              <img src={article.author.image} className="user-avatar" alt={article.author.username} />
            </Link>
            <div className="info">
              <Link to={`/user/${article.author.username}`} className="article-author">
                {article.author.username}
              </Link>
              <div className="posted-date">{moment(article.createdAt).format('MMMM D, YYYY')}</div>
            </div>
            <button
              className={`btn float-right ${!article.favorited ? 'favorite-btn-style' : 'btn-success'}`}
              onClick={() => toggleFavorite(article.slug)}
            >
              {`${article.favorited ? 'Unfavorite' : 'Favorite'} (${article.favoritesCount})`}
            </button>
          </div>

          <Link to={`/article/${article.slug}`}>
            <h2>{article.title}</h2>
            <p>{article.body.substr(0, 100)}</p>
            <div>Read more....</div>
            <div className="article-tags text-right">
              {article.tagList && article.tagList.map(t => (
                <div key={t} className="article-tag">{t}</div>
              ))}
            </div>
          </Link>

        </div>

      )) : null}
      {articles && articles.length === 0 ? <div className="no-articles-yet">No Articles yet</div> : null}
    </div>
  )
}

export default ArticlesList;