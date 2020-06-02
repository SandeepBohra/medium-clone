import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ArticlesList = ({ articles, toggleFavorite }) => {
  
  return (
    <div className="articles-list">
      {articles && articles.map(article => (
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
              className="btn btn-success float-right"
              onClick={toggleFavorite}
            >
              {`${article.favorited ? 'Unfavorite' : 'Favorite'} (${article.favoritesCount})`}
            </button>
          </div>

          <Link to={`/article/${article.slug}`}>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <div>Read more....</div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ArticlesList;