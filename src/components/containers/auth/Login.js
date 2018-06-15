import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/Auth";
import { LoginForm } from "../../view";

class Login extends Component {
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.err.errors) {
      this.setState({
        errors: nextProps.err.errors
      });
    }
  }
  submitLogin(credentials) {
    this.props.loginUser(credentials);
  }
  render() {
    return (
      <div>
        <LoginForm errors={this.state.errors} submit={this.submitLogin.bind(this)} />{" "}
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
    loginUser: params => dispatch(loginUser(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Login);
