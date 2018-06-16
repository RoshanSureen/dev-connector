import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextAreaFieldGroup } from "../../commons";

class CommentForm extends Component {
  constructor() {
    super();

    this.state = {
      commentData: {
        text: ""
      }
    };
  }
  updateItem(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.commentData);
    updated[event.target.name] = event.target.value;
    this.setState({
      commentData: updated
    });
  }
  submitItem(event) {
    event.preventDefault();
    this.props.submit(this.state.commentData);
    let updated = Object.assign({}, this.state.commentData);
    updated["text"] = "";
    this.setState({
      commentData: updated
    });
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white"> Make a comment... </div>{" "}
          <div className="card-body">
            <form onSubmit={this.submitItem.bind(this)}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to Post"
                  name="text"
                  value={this.state.commentData.text}
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

CommentForm.propTypes = {
  errors: PropTypes.object.isRequired
};

export default CommentForm;
