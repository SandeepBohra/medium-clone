import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import ApiHeader from'../../../utils/ApiHeader';

const Comment = ({ isLoggedIn, username, comment, deleteAComment, fetchArticleURL }) => {

  const [isEditable, setIsEditable] = useState(false);
  const [editedText, setEditedText] = useState(comment.body);

  const [error, setError] = useState(null);

  const editComment = async (commentId) => {
    setError(null);
    try {
      const response = await fetch(`${fetchArticleURL}/comments/${commentId}`, {
        method: 'PUT',
        headers: ApiHeader(),
        body: JSON.stringify({
          comment: {
            body: editedText,
          }
        })
      });
      if (!response.ok) {
        throw new Error(`Bad response from server: ${response.status} ${response.statusText}`);
      } else {
        setIsEditable(false);
      }
    } catch (error) {
      setError(error.toString());
    }
    
    setIsEditable(false);
  }

  return (
    <div key={comment.id} className="comment">
      <div className="comment-content">
        {!isEditable ?
          <p>{comment.body}</p> :
          <textarea style={{width: '100%', padding: '15px', border: 0, }} rows="3" value={editedText} onChange={(event) => setEditedText(event.target.value)} />
        }
      </div>
      <div className="comment-footer">
        <div className="comment-meta">
          
          <Link to={`/user/${comment.author.username}`}>
            <img src={comment.author.image} alt={comment.author.username} />
            {comment.author.username}
          </Link>
          <span>{moment(comment.author.createdAt).format('MMMM D, YYYY')}</span>
          <i className="glyphicon glyphicon-remove"></i>
          {isLoggedIn && username === comment.author.username && !isEditable && (
            <span className="float-right">
              <i className="material-icons m-icon" onClick={() => setIsEditable(true)}>edit</i>
              <i className="material-icons m-icon" onClick={() => deleteAComment(comment.id)}>delete</i>
            </span>
          )}
          {isEditable ?
            (<button
              className="btn btn-sm btn-primary float-right"
              onClick={() => editComment(comment.id)}
            >
              Post Comment
            </button>) :
            null}
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default Comment;