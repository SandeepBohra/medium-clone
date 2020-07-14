import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { API_ENDPOINTS } from "../../constants/Constants";
import ApiHeader from "../../utils/ApiHeader";

const NewArticle = () => {
  const history = useHistory();
  const { slug } = useParams();

  const fetchArticleURL = `${API_ENDPOINTS.ARTICLES}/${slug}`;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
    tagList: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const publishNewArticle = async event => {
    event.preventDefault();
    setErrors(null);
    setLoading(true);
    const response = await fetch(fetchArticleURL, {
      method: "PUT",
      headers: ApiHeader(),
      body: JSON.stringify({
        ...formData
      })
    });

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
  };

  useEffect(() => {
    const fetchArticleDetails = async () => {
      const response = await fetch(fetchArticleURL, {
        method: "GET",
        headers: ApiHeader()
      });
      if (!response.ok) {
        // const { errors } = await response.json();
        // setArticleError(errors);
      } else {
        const { article } = await response.json();
        setFormData(f => ({
          ...f,
          title: article.title,
          body: article.body,
          description: article.description,
          tagList: article.tagList
        }));
      }
    };

    fetchArticleDetails();
  }, [fetchArticleURL]);

  return (
    <div className="container new-article">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-xs-12">
          <ul>
            {errors &&
              Object.keys(errors).map(e => (
                <li className="error" key={e}>
                  {errors[e].map(er => (
                    <div className="error">{`${e} ${er}`}</div>
                  ))}
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
  );
};

export default NewArticle;
