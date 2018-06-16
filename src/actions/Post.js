import constants from "../constants";
import { APIManager } from "../utils";

export const setPostLoading = params => {
  return {
    type: constants.POST_LOADING
  };
};

export const clearErrors = params => {
  return {
    type: constants.CLEAR_ERRORS
  };
};

export const deletePost = params => dispatch => {
  APIManager.delete(`/api/post/${params}`)
    .then(result => {
      dispatch({
        type: constants.DELETE_POST,
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

export const addPost = params => dispatch => {
  dispatch(clearErrors(null));
  APIManager.post("/api/post", params)
    .then(result => {
      dispatch({
        type: constants.ADD_POST,
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

export const getPosts = params => dispatch => {
  dispatch(setPostLoading(params));
  APIManager.get("/api/post")
    .then(result => {
      dispatch({
        type: constants.GET_POSTS,
        data: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: constants.GET_POSTS,
        data: null
      });
    });
};

export const getPostById = params => dispatch => {
  dispatch(setPostLoading(params));
  APIManager.get(`/api/post/${params}`)
    .then(result => {
      dispatch({
        type: constants.GET_POST,
        data: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: constants.GET_POST,
        data: null
      });
    });
};

export const addLike = params => dispatch => {
  APIManager.post(`/api/post/like/${params}`, null)
    .then(result => dispatch(getPosts(null)))
    .catch(err => {
      dispatch({
        type: constants.GET_ERRORS,
        error: err.response.data.message
      });
    });
};

export const addComment = (id, params) => dispatch => {
  dispatch(clearErrors(null));
  APIManager.post(`/api/post/comment/${id}`, params)
    .then(result => {
      dispatch({
        type: constants.GET_POST,
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

export const deleteComment = (post_id, comment_id) => dispatch => {
  APIManager.delete(`/api/post/comment/${post_id}/${comment_id}`)
    .then(result => {
      dispatch({
        type: constants.GET_POST,
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

export const removeLike = params => dispatch => {
  APIManager.post(`/api/post/unlike/${params}`, null)
    .then(result => dispatch(getPosts(null)))
    .catch(err => {
      dispatch({
        type: constants.GET_ERRORS,
        error: err.response.data.message
      });
    });
};
