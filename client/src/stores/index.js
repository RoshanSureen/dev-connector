import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer, errorReducer } from "../reducers";

var store;
export default {
  configureStore: () => {
    const reducers = combineReducers({
      auth: authReducer,
      errors: errorReducer
    });
    store = createStore(reducers, applyMiddleware(thunk));
    return store;
  },

  currentStore: () => {
    return store;
  }
};
