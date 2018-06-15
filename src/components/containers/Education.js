import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { EducationForm } from "../view";
import { addEducation } from "../../actions/Profile";

class Education extends Component {
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
  onSubmit(edu_data) {
    // console.log("Education Contianer: " + JSON.stringify(edu_data));
    this.props.addEducation(edu_data, this.props.history);
  }
  render() {
    return <EducationForm errors={this.state.errors} submit={this.onSubmit.bind(this)} />;
  }
}

Education.propTypes = {
  addEducation: PropTypes.func.isRequired,
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
    addEducation: (params, history) => dispatch(addEducation(params, history))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(withRouter(Education));
