import React, { Component } from "react";
import { TextFieldGroup } from "../../commons";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      login: {
        email: "",
        password: ""
      }
    };
  }
  updateItem(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.login);
    updated[event.target.name] = event.target.value;
    this.setState({ login: updated });
  }
  submitItem(event) {
    event.preventDefault();
    this.props.submit(this.state.login);
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form action="dashboard.html">
                <TextFieldGroup
                  type="email"
                  error={errors.email}
                  placeholder="Email Address"
                  name="email"
                  value={this.state.login.email}
                  onChange={this.updateItem.bind(this)}
                />
                <TextFieldGroup
                  type="password"
                  error={errors.password}
                  placeholder="Password"
                  name="password"
                  value={this.state.login.password}
                  onChange={this.updateItem.bind(this)}
                />
                <input
                  onClick={this.submitItem.bind(this)}
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
