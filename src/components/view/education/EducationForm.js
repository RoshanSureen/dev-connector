import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextFieldGroup, TextAreaFieldGroup } from "../../commons";

class EducationForm extends Component {
  constructor() {
    super();
    this.state = {
      school: "",
      degree: "",
      field: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false
    };
  }
  updateItem(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  onCheck(event) {
    event.preventDefault();
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const edu_data = {
      school: this.state.school,
      degree: this.state.degree,
      field: this.state.field,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.submit(edu_data);
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp etc. that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.updateItem.bind(this)}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.updateItem.bind(this)}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field Of Study"
                  name="field"
                  value={this.state.field}
                  onChange={this.updateItem.bind(this)}
                  error={errors.field}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.updateItem.bind(this)}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.updateItem.bind(this)}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck.bind(this)}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current School
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.updateItem.bind(this)}
                  error={errors.description}
                  info="Tell us about the program you were in"
                />
                <input
                  type="submit"
                  value="Submit"
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

export default EducationForm;
