import constants from "../constants";
import jwt_decode from "jwt-decode";
import { APIManager, AuthToken } from "../utils";

export const registerUser = (params, history) => dispatch => {
  APIManager.post("/user/register", params)
    .then(result => {
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ERRORS,
        error: err.response.data.message
      });
    });
};

export const loginUser = params => dispatch => {
  APIManager.post("/user/login", params)
    .then(result => {
      const { token } = result.data;

      // save token to localStorage
      localStorage.setItem("jwtToken", token);
      // set Token to auth header
      AuthToken.setAuthToken(token);

      // Decode token to get user data
      var decoded = jwt_decode(token);
      // Set current user

      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ERRORS,
        error: err.response.data.message
      });
    });
};

export const setCurrentUser = params => {
  return {
    type: constants.SET_CURRENT_USER,
    data: params
  };
};

export const logoutUser = params => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  AuthToken.setAuthToken(false);

  // Set current user to null and isAuthenticated to false
  dispatch(setCurrentUser(params));
};
