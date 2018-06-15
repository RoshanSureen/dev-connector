import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../../actions/Profile";
import { ProfileAbout, ProfileCreds, ProfileGithub, ProfileHeader } from "../../view";
import { Spinner } from "../../commons";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading === true) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                {" "}
                Back To Profiles{" "}
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile.result} />
          <ProfileAbout profile={profile.result} />
          <ProfileCreds
            education={profile.result.education}
            experience={profile.result.experience}
          />
          {profile.result.githubusername ? (
            <ProfileGithub username={profile.result.githubusername} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
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

export default connect(
  stateToProps,
  dispatchToProps
)(Profile);
