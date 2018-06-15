import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { SaveProfile } from "../../view";
import { createProfile, getCurrentProfile } from "../../../actions/Profile";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile(null);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.err.errors) {
      this.setState({
        errors: nextProps.err.errors
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        profile
      });
    }
  }
  onSubmit(profile_data) {
    this.props.createProfile(profile_data, this.props.history);
  }
  render() {
    const title = "Edit Your Profile";
    const subTitle = "Update or Add new information to make your profile stand out";
    return (
      <SaveProfile
        profile={this.state.profile}
        title={title}
        subTitle={subTitle}
        submit={this.onSubmit.bind(this)}
        errors={this.state.errors}
      />
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const stateToProps = state => {
  return {
    profile: state.profile,
    err: state.errors
  };
};

const dispatchToProps = dispatch => {
  return {
    createProfile: (params, history) => dispatch(createProfile(params, history)),
    getCurrentProfile: params => dispatch(getCurrentProfile(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(withRouter(EditProfile));
