import constants from "../constants";
import isEmpty from "../validation/is-empty";

var initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case constants.SET_CURRENT_USER:
      updated["isAuthenticated"] = !isEmpty.isEmpty(action.data);
      updated["user"] = action.data;
      return updated;

    default:
      return updated;
  }
};
