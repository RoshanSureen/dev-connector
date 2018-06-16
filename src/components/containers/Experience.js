import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ExperienceForm } from "../view";
import { addExperience } from "../../actions/Profile";

class Experience extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.err.errors) {
      this.setState({
        errors: nextProps.err.errors
      });
    }
  }
  onSubmit(exp_data) {
    this.props.addExperience(exp_data, this.props.history);
  }
  render() {
    return (
      <ExperienceForm errors={this.state.errors} submit={this.onSubmit.bind(this)} />
    );
  }
}

Experience.propTypes = {
  addExperience: PropTypes.func.isRequired,
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
    addExperience: (params, history) => dispatch(addExperience(params, history))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(withRouter(Experience));
