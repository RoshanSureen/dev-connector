import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "../../actions/Auth";
import { clearCurrentProfile } from "../../actions/Profile";
import { AuthToken } from "../../utils";
import {
  Navbar,
  Register,
  Login,
  Dashboard,
  CreateProfile,
  EditProfile,
  Experience,
  Education,
  Profiles,
  Profile,
  Posts,
  Post
} from "../containers";
import { Footer, Landing, NotFound } from "../view";
import { PrivateRoute } from "../commons";

class Home extends Component {
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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-experience" component={Experience} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-education" component={Education} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />{" "}
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
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

export default connect(
  null,
  dispatchToProps
)(Home);
