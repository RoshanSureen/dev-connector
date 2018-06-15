import React, { Component } from "react";
import { TextFieldGroup } from "../../commons";

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
    updated[event.target.name] = event.target.value;
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
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate action="create-profile.html">
                <TextFieldGroup
                  error={errors.name}
                  placeholder="Name"
                  name="name"
                  value={this.state.registration.name}
                  onChange={this.updateItem.bind(this)}
                />

                <TextFieldGroup
                  error={errors.email}
                  placeholder="Email"
                  name="email"
                  value={this.state.registration.email}
                  onChange={this.updateItem.bind(this)}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  error={errors.password}
                  placeholder="Password"
                  name="password"
                  value={this.state.registration.password}
                  onChange={this.updateItem.bind(this)}
                />
                <TextFieldGroup
                  type="password"
                  error={errors.password2}
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.registration.password2}
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

export default RegisterForm;
