import React, { Component } from "react";
import classnames from "classnames";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      login: {
        email: "",
        password: ""
      },
      errors: {}
    };
  }
  updateItem(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.login);
    updated[event.target.id] = event.target.value;
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
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form action="dashboard.html">
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    id="email"
                    value={this.state.login.email}
                    onChange={this.updateItem.bind(this)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    id="password"
                    value={this.state.login.password}
                    onChange={this.updateItem.bind(this)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
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
