import {
  API_ENDPOINTS,
  DEFAULT_HEADER,
  stringifyMe,
  token
} from "../constants/Constants";

// Service for registering users
export const registerService = async userData => {
  const response = await fetch(API_ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      ...DEFAULT_HEADER
    },
    body: stringifyMe({
      user: {
        ...userData
      }
    })
  });

  const { errors, user } = await response.json();

  return { error: errors, user };
};

// Login service to help users login in the website
export const loginService = async credentails => {
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      ...DEFAULT_HEADER
    },
    body: stringifyMe({
      user: {
        ...credentails
      }
    })
  });

  const { errors, user } = await response.json();

  return { error: errors, user };
};

// Service to update user details
export const updateProfileService = async userData => {
  const response = await fetch(API_ENDPOINTS.USER, {
    method: "PUT",
    headers: {
      ...DEFAULT_HEADER,
      authorization: `Token ${token}`
    },
    body: stringifyMe({
      ...userData
    })
  });

  const { errors, user } = await response.json();

  return { error: errors, user };
};
