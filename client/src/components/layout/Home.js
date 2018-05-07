import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser, clearCurrentProfile } from "../../actions";
import { AuthToken } from "../../utils";
import { Navbar, Register, Login, Dashboard } from "../containers";
import { Footer, Landing } from "../view";

class App extends Component {
  componentWillMount() {
    if (localStorage.jwtToken) {
      // Set auth token header auth
      AuthToken.setAuthToken(localStorage.jwtToken);

      // Decode the token and get user info
      var decoded = jwt_decode(localStorage.jwtToken);

      // Set currentuser and isAuthenticated
      this.props.setCurrentUser(decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout the user
        this.props.logoutUser({});

        // Clear the profile
        this.props.clearCurrentProfile(null);
        // Redirect to Login
        window.location.href = "/login";
      }
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: params => dispatch(setCurrentUser(params)),
    logoutUser: params => dispatch(logoutUser(params)),
    clearCurrentProfile: params => dispatch(clearCurrentProfile(params))
  };
};

export default connect(null, dispatchToProps)(App);
