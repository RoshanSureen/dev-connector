import constants from "../constants";

var initialState = {
  posts: [],
  post: {},
  loading: false
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {

    case constants.POST_LOADING:
      updated["loading"] = true;
      return updated;

    case constants.GET_POSTS:
      updated["posts"] = action.data;
      updated["loading"] = false;
      return updated;

    case constants.ADD_POST:
      updated["posts"] = [action.data, ...updated["posts"]];
      return updated;

    default:
      return updated;
  }
};