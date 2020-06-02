import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import { ARTICLE_API, IMG_SRC } from '../../Constants';

import { AuthContext } from '../../contexts/AuthContext';

import './Article.css';


const Article = () => {
  const { slug } = useParams();
  const { isLoggedIn, token } = useContext(AuthContext);

  const fetchArticleURL = `${ARTICLE_API}/${slug}`;

  const [articleDetails, setArticleDetails] = useState(null);
  const [articleError, setArticleError] = useState(null);

  const [comments, setComments] = useState(null);
  const [commentsError, setCommentsError] = useState(null);

  const [commentText, setCommentText] = useState('');

  const postComment = async (event) => {
    event.preventDefault();
    if (commentText) {
      const response = await fetch(`${fetchArticleURL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'authorization': `Token ${token}`,        
        },
        body: JSON.stringify({
          comment: {
            body: commentText,
          }
        })
      })

      if (response.ok) {
        const { comment } = await response.json();
        if (comment) {
          setComments([comment, ...comments]);
        } 
      }
      setCommentText('');
    }
  }

  useEffect(() => {

    const fetchArticleDetail = async () => {
      const response = await fetch(fetchArticleURL);
      if (!response.ok) {
        const { errors } = await response.json();
        setArticleError(errors);
      } else {
        const { article } = await response.json();
        setArticleDetails(article);
      }
    }

    const fetchComments = async () => {
      const response = await fetch(`${fetchArticleURL}/comments`);
      if (!response.ok) {
        const { errors } = await response.json();
        setCommentsError(errors);
      } else {
        const { comments } = await response.json();
        setComments(comments);
      }
    }

    fetchArticleDetail();
    fetchComments();
    
  }, [fetchArticleURL])

  const renderArticleData = () => {
    return (
      <div className="article-info">
        <Link to={`/user/${articleDetails.author.username}`}>
          <img src={IMG_SRC} className="user-avatar" alt={articleDetails.author.username} />
        </Link>
        <div className="info">
          <Link to={`/user/${articleDetails.author.username}`} className="article-author">
            {articleDetails.author.username}
          </Link>
          <div className="posted-date">{moment(articleDetails.createdAt).format('MMMM D, YYYY')}</div>
        </div>
        <button>{`Favorite Article (${articleDetails.favoritesCount})`}</button>
      </div>
    )
  }

  return (
    <div className="article-page">
      <div className="article-banner">
        {articleDetails && (
          <div className="container">
            <h1>{articleDetails.title}</h1>
            {renderArticleData()}
          </div>
        )}
      </div>

      {articleDetails && (
        <div className="container article-detail">
          <div className="article-content">
            <p>{articleDetails.body}</p>
            <div className="article-content-tags">
              {articleDetails.tagList && articleDetails.tagList.map(t => (
                <div key={t} className="article-content-tag">{t}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      <hr className="hr-line" />
      
      {articleDetails && (<div className="article-actions">
        {renderArticleData()}
      </div>)}

      <div className="container">
        <div className="row comment-section">
          <div className="col-xs-12 col-md-8 offset-md-2">
            {!isLoggedIn ? (
              <div className="not-logged-in">
                <p>
                  <Link to="/login">
                    Sign In
                  </Link> or <Link to="/register">Sign up</Link> to add comments on this article.
                </p>
              </div>
            ) : (
              <div className="comment-form">
                <form onSubmit={postComment}>
                  <div className="content">
                    <textarea rows="3" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
                  </div>
                  <div className="footer">
                    <button className="btn btn-sm btn-primary float-right">Post Comment</button>
                  </div>

                </form>
              </div>
            )}
            {comments && comments.map(c => (
              <div key={c.id} className="comment">
                <div className="comment-content">
                  <p>{c.body}</p>
                </div>
                <div className="comment-footer">
                  <div className="comment-meta">
                    
                    <Link to={`/user/${c.author.username}`}>
                      <img src={c.author.image} alt={c.author.username} />
                      {c.author.username}
                    </Link>
                    <span>{moment(c.author.createdAt).format('MMMM D, YYYY')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      

    </div>
  )
}

export default Article;