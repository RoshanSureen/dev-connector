import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  TextFieldGroup,
  InputGroup,
  SelectListGroup,
  TextAreaFieldGroup
} from "../../commons";
import isEmpty from "../../../validation/is-empty";

class SaveProfile extends Component {
  constructor() {
    super();
    this.state = {
      basic_profile: {
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
      },
      displaySocialInputs: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!isEmpty.isEmpty(nextProps.profile)) {
      const profile = nextProps.profile;

      // Check each field and if it does not exist, make empty string
      profile.handle = profile.result.handle;
      profile.company = !isEmpty.isEmpty(nextProps.profile.result.company)
        ? nextProps.profile.result.company
        : "";

      profile.website = !isEmpty.isEmpty(nextProps.profile.result.website)
        ? nextProps.profile.result.website
        : "";
      profile.location = !isEmpty.isEmpty(nextProps.profile.result.location)
        ? nextProps.profile.result.location
        : "";

      profile.status = profile.result.status;

      // Bring skills array back to comma spereated values
      profile.skills = profile.result.skills.join(",");

      profile.githubusername = !isEmpty.isEmpty(nextProps.profile.result.githubusername)
        ? nextProps.profile.result.githubusername
        : "";
      profile.bio = !isEmpty.isEmpty(nextProps.profile.result.bio)
        ? nextProps.profile.result.bio
        : "";
      profile.social = !isEmpty.isEmpty(nextProps.profile.result.social)
        ? nextProps.profile.result.social
        : {};

      // Check social field and if it does not exist make an empty string
      profile.twitter = !isEmpty.isEmpty(nextProps.profile.result.social.twitter)
        ? nextProps.profile.result.social.twitter
        : "";
      profile.facebook = !isEmpty.isEmpty(nextProps.profile.result.social.facebook)
        ? nextProps.profile.result.social.facebook
        : "";
      profile.youtube = !isEmpty.isEmpty(nextProps.profile.result.social.youtube)
        ? nextProps.profile.result.social.youtube
        : "";
      profile.linkedin = !isEmpty.isEmpty(nextProps.profile.result.social.linkedin)
        ? nextProps.profile.result.social.linkedin
        : "";
      profile.instagram = !isEmpty.isEmpty(nextProps.profile.result.social.instagram)
        ? nextProps.profile.result.social.instagram
        : "";

      this.setState({ basic_profile: profile });
    }
  }
  updateItem(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.basic_profile);
    updated[event.target.name] = event.target.value;
    this.setState({ basic_profile: updated });
  }
  submitItem(event) {
    event.preventDefault();
    this.props.submit(this.state.basic_profile);
  }
  render() {
    const { errors, title, subTitle } = this.props;
    const { displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.basic_profile.twitter}
            onChange={this.updateItem.bind(this)}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.basic_profile.facebook}
            onChange={this.updateItem.bind(this)}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.basic_profile.linkedin}
            onChange={this.updateItem.bind(this)}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.basic_profile.youtube}
            onChange={this.updateItem.bind(this)}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
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
      // { label: "* Select Professional Status", value: 0 },
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
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">{title}</h1>
              <p className="lead text-center">{subTitle}</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.submitItem.bind(this)}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.basic_profile.handle}
                  onChange={this.updateItem.bind(this)}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.basic_profile.status}
                  onChange={this.updateItem.bind(this)}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your carrer"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.basic_profile.company}
                  onChange={this.updateItem.bind(this)}
                  error={errors.company}
                  info="Could be your own compnay or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.basic_profile.website}
                  onChange={this.updateItem.bind(this)}
                  error={errors.website}
                  info="Could be your own webiste or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.basic_profile.location}
                  onChange={this.updateItem.bind(this)}
                  error={errors.location}
                  info="City or city &amp; state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.basic_profile.skills}
                  onChange={this.updateItem.bind(this)}
                  error={errors.skills}
                  info="Please use comma seperated values (eg. HTML, CSS, Javascript, PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.basic_profile.githubusername}
                  onChange={this.updateItem.bind(this)}
                  error={errors.githubusername}
                  info="If you want your lates repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
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

export default SaveProfile;
