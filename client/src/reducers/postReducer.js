import constants from "../constants";

var initialState = {
  posts: [],
  post: {},
  loading: false
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    default:
      return updated;
  }
};
