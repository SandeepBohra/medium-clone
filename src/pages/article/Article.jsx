import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import moment from "moment";

import { API_ENDPOINTS } from "../../constants/Constants";

import { AuthContext } from "../../contexts/AuthContext";
import Comment from "./comment/Comment";

import { deleteArticleService } from "../../services/ArticleService";

import ApiHeader from "../../utils/ApiHeader";

import "./Article.css";

const Article = () => {
  const history = useHistory();
  const { slug } = useParams();
  const { isLoggedIn, username } = useContext(AuthContext);

  const fetchArticleURL = `${API_ENDPOINTS.ARTICLES}/${slug}`;

  const [articleDetails, setArticleDetails] = useState(null);
  // const [articleError, setArticleError] = useState(null);

  const [comments, setComments] = useState(null);
  // const [commentsError, setCommentsError] = useState(null);

  const [commentText, setCommentText] = useState("");

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      history.push("/login?destination=" + window.location.pathname);
    } else {
      let response = null;
      if (articleDetails.favorited) {
        response = await fetch(`${fetchArticleURL}/favorite`, {
          headers: ApiHeader(),
          method: "DELETE"
        });
      } else {
        response = await fetch(`${fetchArticleURL}/favorite`, {
          headers: ApiHeader(),
          method: "POST"
        });
      }
      if (response.ok) {
        const { article } = await response.json();
        setArticleDetails({
          ...articleDetails,
          ...article
        });
      }
    }
  };

  const deleteArticle = async () => {
    const { errors } = await deleteArticleService(slug);

    if (errors) {
    } else {
      history.push("/");
    }
  };

  const postComment = async event => {
    event.preventDefault();
    if (commentText) {
      const response = await fetch(`${fetchArticleURL}/comments`, {
        method: "POST",
        headers: ApiHeader(),
        body: JSON.stringify({
          comment: {
            body: commentText
          }
        })
      });

      if (response.ok) {
        const { comment } = await response.json();
        if (comment) {
          setComments([comment, ...comments]);
        }
      }
      setCommentText("");
    }
  };

  const deleteAComment = async commentId => {
    const response = await fetch(`${fetchArticleURL}/comments/${commentId}`, {
      method: "DELETE",
      headers: ApiHeader()
    });
    if (response.ok) {
      const newComments = comments.filter(c => c.id !== commentId);
      setComments([...newComments]);
    }
  };

  useEffect(() => {
    const fetchArticleDetail = async () => {
      const response = await fetch(fetchArticleURL, {
        method: "GET",
        headers: ApiHeader()
      });
      if (!response.ok) {
        // const { errors } = await response.json();
        // setArticleError(errors);
      } else {
        const { article } = await response.json();
        setArticleDetails(article);
      }
    };

    const fetchComments = async () => {
      const response = await fetch(`${fetchArticleURL}/comments`, {
        method: "GET",
        headers: ApiHeader()
      });
      if (!response.ok) {
        // const { errors } = await response.json();
        // setCommentsError(errors);
      } else {
        const { comments } = await response.json();
        setComments(comments);
      }
    };

    fetchArticleDetail();
    fetchComments();
  }, [fetchArticleURL]);

  const renderArticleData = () => {
    return (
      <div className="article-info">
        <Link to={`/user/${articleDetails.author.username}`}>
          <img
            src={articleDetails.author.image}
            className="user-avatar"
            alt={articleDetails.author.username}
          />
        </Link>
        <div className="info">
          <Link
            to={`/user/${articleDetails.author.username}`}
            className="article-author"
          >
            {articleDetails.author.username}
          </Link>
          <div className="posted-date">
            {moment(articleDetails.createdAt).format("MMMM D, YYYY")}
          </div>
        </div>
        {username !== articleDetails.author.username && (
          <button
            className={`btn btn-sm ${
              !articleDetails.favorited ? "favorite-btn-style" : "btn-success"
            }`}
            onClick={toggleFavorite}
          >
            {!articleDetails.favorited
              ? `Favorite Article (${articleDetails.favoritesCount})`
              : `Unfavorite Article (${articleDetails.favoritesCount})`}
          </button>
        )}
        {isLoggedIn && username === articleDetails.author.username && (
          <span className="can-edit-delete">
            <Link to={`/editor/${slug}`}>
              <button className="btn btn-sm edit-btn">
                <i className="material-icons m-icon">edit</i>
                Edit Article
              </button>
            </Link>
            <button
              className="btn btn-sm delete-btn"
              onClick={() => deleteArticle()}
            >
              <i className="material-icons m-icon">delete</i>
              Delete Article
            </button>
          </span>
        )}
      </div>
    );
  };

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
              {articleDetails.tagList &&
                articleDetails.tagList.map(t => (
                  <div key={t} className="article-content-tag">
                    {t}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <hr className="hr-line" />

      {articleDetails && (
        <div className="article-actions">{renderArticleData()}</div>
      )}

      <div className="container">
        <div className="row comment-section">
          <div className="col-xs-12 col-md-8 offset-md-2">
            {!isLoggedIn ? (
              <div className="not-logged-in">
                <p>
                  <Link to="/login">Sign In</Link> or{" "}
                  <Link to="/register">Sign up</Link> to add comments on this
                  article.
                </p>
              </div>
            ) : (
              <div className="comment-form">
                <form onSubmit={postComment}>
                  <div className="content">
                    <textarea
                      rows="3"
                      value={commentText}
                      onChange={event => setCommentText(event.target.value)}
                    />
                  </div>
                  <div className="footer">
                    <button className="btn btn-sm btn-primary float-right">
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>
            )}
            {comments &&
              comments.map(comment => (
                <Comment
                  key={comment.id}
                  isLoggedIn={isLoggedIn}
                  username={username}
                  fetchArticleURL={fetchArticleURL}
                  comment={comment}
                  deleteAComment={deleteAComment}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
