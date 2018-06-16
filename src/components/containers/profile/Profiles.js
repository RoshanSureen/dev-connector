import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spinner } from "../../commons";
import { getProfiles } from "../../../actions/Profile";
import { ProfileItem } from "../../view";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles(null);
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (loading) {
      profileItems = <Spinner />;
    } else if (profiles === null) {
      profileItems = <h4> There are no Developer Profiles </h4>;
    } else {
      if (profiles.result.length > 0) {
        profileItems = profiles.result.map(profile => {
          return <ProfileItem key={profile._id} profile={profile} />;
        });
      } else {
        profileItems = <h4> No Profiles Found! </h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center"> Developer Profiles </h1>{" "}
              <p className="lead text-center"> Browse and connect with developers </p>{" "}
              {profileItems}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const stateToProps = state => {
  return {
    profile: state.profile
  };
};

const dispatchToProps = dispatch => {
  return {
    getProfiles: params => dispatch(getProfiles(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Profiles);
