import React, { Component } from "react";
import {
  TextFieldGroup,
  InputGroup,
  SelectListGroup,
  TextAreaFieldGroup
} from "../commons";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      basic_profile: {
        displaySocialInputs: false,
        handle: "",
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        youtube: "",
        instagram: "",
        linkedin: ""
      }
    };
  }
  updateItem(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.basic_profile);
    updated[event.target.id] = event.target.value;
    this.setState({ basic_profile: updated });
  }
  submitItem(event) {
    event.preventDefault();
    this.props.submit(this.state.basic_profile);
  }
  render() {
    const { errors } = this.props;
    const { displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            id="twitter"
            icon="fab fa-twitter"
            value={this.state.basic_profile.twitter}
            onChange={this.updateItem.bind(this)}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            id="facebook"
            icon="fab fa-facebook"
            value={this.state.basic_profile.facebook}
            onChange={this.updateItem.bind(this)}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            id="linkedin"
            icon="fab fa-linkedin"
            value={this.state.basic_profile.linkedin}
            onChange={this.updateItem.bind(this)}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            id="youtube"
            icon="fab fa-youtube"
            value={this.state.basic_profile.youtube}
            onChange={this.updateItem.bind(this)}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            id="instagram"
            icon="fab fa-instagram"
            value={this.state.basic_profile.instagram}
            onChange={this.updateItem.bind(this)}
            error={errors.instagram}
          />
        </div>
      );
    }
    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make you profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.submitItem.bind(this)}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  id="handle"
                  value={this.state.basic_profile.handle}
                  onChange={this.updateItem.bind(this)}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="* Status"
                  id="status"
                  value={this.state.basic_profile.status}
                  onChange={this.updateItem.bind(this)}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your carrer"
                />
                <TextFieldGroup
                  placeholder="Company"
                  id="company"
                  value={this.state.basic_profile.company}
                  onChange={this.updateItem.bind(this)}
                  error={errors.company}
                  info="Could be your own compnay or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  id="website"
                  value={this.state.basic_profile.website}
                  onChange={this.updateItem.bind(this)}
                  error={errors.website}
                  info="Could be your own webiste or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  id="location"
                  value={this.state.basic_profile.location}
                  onChange={this.updateItem.bind(this)}
                  error={errors.location}
                  info="City or city &amp; state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  id="skills"
                  value={this.state.basic_profile.skills}
                  onChange={this.updateItem.bind(this)}
                  error={errors.skills}
                  info="Please use comma seperated values (eg. HTML, CSS, Javascript, PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  id="githubusername"
                  value={this.state.basic_profile.githubusername}
                  onChange={this.updateItem.bind(this)}
                  error={errors.githubusername}
                  info="If you want your lates repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  id="bio"
                  value={this.state.basic_profile.bio}
                  onChange={this.updateItem.bind(this)}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
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

export default Profile;
