import constants from "../constants";

var initialState = {
  errors: {}
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case constants.GET_ERRORS:
      updated["errors"] = action.error;
      return updated;

    case constants.CLEAR_ERRORS:
      updated["errors"] = {};
      return updated;

    default:
      return updated;
  }
};
