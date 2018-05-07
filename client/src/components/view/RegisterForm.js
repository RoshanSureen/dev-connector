import React, { Component } from "react";
import classnames from "classnames";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      registration: {
        name: "",
        email: "",
        password: "",
        password2: ""
      }
    };
  }
  updateItem(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.registration);
    updated[event.target.id] = event.target.value;
    this.setState({ registration: updated });
  }
  submitItem(event) {
    event.preventDefault();
    this.props.submit(this.state.registration);
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate action="create-profile.html">
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    id="name"
                    value={this.state.registration.name}
                    onChange={this.updateItem.bind(this)}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    id="email"
                    value={this.state.registration.email}
                    onChange={this.updateItem.bind(this)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    id="password"
                    value={this.state.registration.password}
                    onChange={this.updateItem.bind(this)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    id="password2"
                    value={this.state.registration.password2}
                    onChange={this.updateItem.bind(this)}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
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

export default RegisterForm;
