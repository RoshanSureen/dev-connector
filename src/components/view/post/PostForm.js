import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextAreaFieldGroup } from "../../commons";

class PostForm extends Component {
  constructor() {
    super();

    this.state = {
      postData: {
        text: ""
      }
    };
  }
  updateItem(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.postData);
    updated[event.target.name] = event.target.value;
    this.setState({
      postData: updated
    });
  }
  submitItem(event) {
    event.preventDefault();
    this.props.submit(this.state.postData);
    let updated = Object.assign({}, this.state.postData);
    updated["text"] = "";
    this.setState({
      postData: updated
    });
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white"> Say Something... </div>{" "}
          <div className="card-body">
            <form onSubmit={this.submitItem.bind(this)}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a Post"
                  name="text"
                  value={this.state.postData.text}
                  error={errors.text}
                  onChange={this.updateItem.bind(this)}
                />{" "}
              </div>{" "}
              <button type="submit" className="btn btn-dark">
                Submit{" "}
              </button>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

PostForm.propTypes = {
  errors: PropTypes.object.isRequired
};

export default PostForm;
