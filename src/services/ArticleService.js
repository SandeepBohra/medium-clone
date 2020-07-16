import { API_ENDPOINTS, DEFAULT_HEADER, token } from "../constants/Constants";

// Service to create/publish new article
export const publishNewArticleService = async newArticle => {
  const response = await fetch(API_ENDPOINTS.ARTICLES, {
    method: "POST",
    headers: {
      ...DEFAULT_HEADER,
      authorization: `Token ${token}`
    },
    body: JSON.stringify({
      ...newArticle
    })
  });

  const { errors, article } = await response.json();

  return { errors, article };
};

// Service to update an article
export const updateArticleService = async (updatedArticle, slug) => {
  const response = await fetch(`${API_ENDPOINTS.ARTICLES}/${slug}`, {
    method: "PUT",
    headers: {
      ...DEFAULT_HEADER,
      authorization: `Token ${token}`
    },
    body: JSON.stringify({
      ...updatedArticle
    })
  });

  const { errors, article } = await response.json();

  return { errors, article };
};

// Service to delete an article
export const deleteArticleService = async slug => {
  const response = await fetch(`${API_ENDPOINTS.ARTICLES}/${slug}`, {
    headers: {
      ...DEFAULT_HEADER,
      authorization: `Token ${token}`
    },
    method: "DELETE"
  });

  const { errors } = await response.json();

  return { errors };
};
