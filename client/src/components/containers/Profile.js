import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions";
import {
  ProfileAbout,
  ProfileCreds,
  ProfileGithub,
  ProfileHeader
} from "../view";
import { Spinner } from "../commons";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const stateToProps = state => {
  return {
    profile: state.profile
  };
};

const dispatchToProps = dispatch => {
  return {
    getProfileByHandle: params => dispatch(getProfileByHandle(params))
  };
};

export default connect(stateToProps, dispatchToProps)(Profile);
