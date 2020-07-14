// eslint-disable-next-line
export const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const BASE_URL = "https://conduit.productionready.io/api";

export const API_TYPE = {
  USERS: "users",
  ARTICLES: "articles"
};

export const API_ENDPOINTS = {
  REGISTER: `${BASE_URL}/${API_TYPE.USERS}`,
  LOGIN: `${BASE_URL}/${API_TYPE.USERS}/login`,
  USER: `${BASE_URL}/user`,
  PROFILE: `${BASE_URL}/profiles`,
  TAGS: `${BASE_URL}/tags`,
  ARTICLES_FEED: `${BASE_URL}/${API_TYPE.ARTICLES}/feed?limit=10&offset=0`,
  ARTICLES: `${BASE_URL}/${API_TYPE.ARTICLES}`
};
