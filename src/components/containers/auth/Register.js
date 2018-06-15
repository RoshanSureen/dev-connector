import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/Auth";
import { RegisterForm } from "../../view";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.err.errors) {
      this.setState({
        errors: nextProps.err.errors
      });
    }
  }
  submitRegistration(credentials) {
    this.props.registerUser(credentials, this.props.history);
  }
  render() {
    return (
      <div>
        <RegisterForm
          errors={this.state.errors}
          submit={this.submitRegistration.bind(this)}
        />{" "}
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired
};

const stateToProps = state => {
  return {
    auth: state.auth,
    err: state.errors
  };
};
const dispatchToProps = dispatch => {
  return {
    registerUser: (params, history) => dispatch(registerUser(params, history))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(withRouter(Register));
