import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { SaveProfile } from "../../view";
import { createProfile } from "../../../actions/Profile";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.err.errors) {
      this.setState({ errors: nextProps.err.errors });
    }
  }
  onSubmit(profile_data) {
    // console.log("create profile: " + JSON.stringify(profile_data));
    this.props.createProfile(profile_data, this.props.history);
  }
  render() {
    const title = "Create Your Profile";
    const subTitle = "Let's get some information to make your profile stand out";
    return (
      <SaveProfile
        title={title}
        subTitle={subTitle}
        submit={this.onSubmit.bind(this)}
        errors={this.state.errors}
      />
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired
};

const stateToProps = state => {
  return {
    profile: state.profile,
    err: state.errors
  };
};

const dispatchToProps = dispatch => {
  return {
    createProfile: (params, history) => dispatch(createProfile(params, history))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(withRouter(CreateProfile));
