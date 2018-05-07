import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./stores";
import { Home } from "./components/layout";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store.configureStore()}>
        <Home />
      </Provider>
    );
  }
}

export default App;
