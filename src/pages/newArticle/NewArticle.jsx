import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ARTICLE_API } from '../../Constants';

import ApiHeader from '../../utils/ApiHeader';

import './NewArticle.css';

const NewArticle = () => {

  const history = useHistory();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const publishNewArticle = async (event) => {
    event.preventDefault();
    setErrors(null);
    setLoading(true);
    const response = await fetch(ARTICLE_API, {
      method: 'POST',
      headers: ApiHeader(),
      body: JSON.stringify({
        ...formData,
        tagList: formData.tagList.split(","),
      })
    })

    if (!response.ok) {
      const { errors } = await response.json();
      setErrors(errors);
    } else {
      const { article } = await response.json();
      if (article.slug) {
        history.push(`/article/${article.slug}`);
      }
    }
    setLoading(false);
  }

  return (
    <div className="container new-article">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-xs-12">
          <ul>
            {errors && Object.keys(errors).map(e => (
              <li className="error" key={e}>
                {errors[e].map(er => (<div key={er} className="error">{`${e} ${er}`}</div>))}
              </li>
            ))}
            </ul>
          <form onSubmit={publishNewArticle}>
            <fieldset disabled={loading}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Article Title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="What's this article about?"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  className="form-control"
                  name="body"
                  placeholder="Write your article (in markdown)"
                  rows="10"
                  value={formData.body}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="tagList"
                  placeholder="Enter tags"
                  value={formData.tagList}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            

            <button
              type="submit"
              className="btn btn-lg btn-primary float-right"
              disabled={loading}
            >
              Publish Article
            </button>
            
            
          </form>
        </div>
      </div>

    </div>
  )
}

export default NewArticle;