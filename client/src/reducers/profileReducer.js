import constants from "../constants";

var initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case constants.PROFILE_LOADING:
      updated["loading"] = true;
      return updated;

    case constants.GET_PROFILE:
      updated["profile"] = action.data;
      updated["loading"] = false;
      return updated;

    case constants.GET_PROFILES:
      updated["profiles"] = action.data;
      updated["loading"] = false;
      return updated;

    case constants.CLEAR_CURRENT_PROFILE:
      updated["profile"] = null;
      return updated;

    default:
      return updated;
  }
};
