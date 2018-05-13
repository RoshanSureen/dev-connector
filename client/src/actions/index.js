import constants from "../constants";
import jwt_decode from "jwt-decode";
import { APIManager, AuthToken } from "../utils";

// ================================================================================================
// Auth Action Creators
// ================================================================================================

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

// ================================================================================================
// Profile Action Creators
// ================================================================================================

export const getCurrentProfile = params => dispatch => {
  dispatch(setProfileLoading(params));
  APIManager.get("/profile/current")
    .then(result => {
      dispatch({
        type: constants.GET_PROFILE,
        data: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: constants.GET_PROFILE,
        data: {}
      });
    });
};

export const setProfileLoading = params => {
  return {
    type: constants.PROFILE_LOADING
  };
};

export const clearCurrentProfile = params => {
  return {
    type: constants.CLEAR_CURRENT_PROFILE
  };
};

export const createProfile = (params, history) => dispatch => {
  APIManager.post("/profile/save", params)
    .then(result => {
      history.push("/dashboard");
      return;
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ERRORS,
        error: err.response.data.message
      });
    });
};

export const deleteAccount = params => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone!")) {
    APIManager.delete("/profile/delete")
      .then(result => {
        dispatch({
          type: constants.SET_CURRENT_USER,
          data: params
        });
      })
      .catch(err => {
        dispatch({
          type: constants.GET_ERRORS,
          error: err.response.data.message
        });
      });
  }
};

export const addExperience = (params, history) => dispatch => {
  APIManager.post("/profile/experience", params)
    .then(result => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ERRORS,
        error: err.response.data.message
      });
    });
};

export const addEducation = (params, history) => dispatch => {
  APIManager.post("/profile/education", params)
    .then(result => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ERRORS,
        error: err.response.data.message
      });
    });
};

export const deleteExp = params => dispatch => {
  APIManager.delete(`/profile/experience/${params}`)
    .then(result => {
      dispatch({
        type: constants.GET_PROFILE,
        data: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ERRORS,
        error: err.response.data.message
      });
    });
};

export const deleteEdu = params => dispatch => {
  APIManager.delete(`/profile/education/${params}`)
    .then(result => {
      dispatch({
        type: constants.GET_PROFILE,
        data: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ERRORS,
        error: err.response.data.message
      });
    });
};

export const getProfiles = params => dispatch => {
  dispatch(setProfileLoading(params));
  APIManager.get("/profile/all")
    .then(result => {
      dispatch({
        type: constants.GET_PROFILES,
        data: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: constants.GET_PROFILES,
        data: null
      });
    });
};

export const getProfileByHandle = params => dispatch => {
  dispatch(setProfileLoading(params));
  APIManager.get(`/profile/handle/${params}`)
    .then(result => {
      dispatch({
        type: constants.GET_PROFILE,
        data: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: constants.GET_PROFILE,
        data: null
      });
    });
};
