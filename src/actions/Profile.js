import constants from "../constants";
import { APIManager } from "../utils";

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
