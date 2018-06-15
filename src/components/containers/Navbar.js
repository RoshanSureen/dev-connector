import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/Auth";
import { clearCurrentProfile } from "../../actions/Profile";
import { Nav } from "../view";

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile(null);
    this.props.logoutUser({});
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Nav
        isAuthenticated={isAuthenticated}
        user={user}
        logout={this.onLogoutClick.bind(this)}
      />
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const stateToProps = state => {
  return {
    auth: state.auth
  };
};
const dispatchToProps = dispatch => {
  return {
    logoutUser: params => dispatch(logoutUser(params)),
    clearCurrentProfile: params => dispatch(clearCurrentProfile(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Navbar);
