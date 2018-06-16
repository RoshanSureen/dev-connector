import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CommentForm } from "../../view";
import { addComment } from "../../../actions/Post";

class Comment extends Component {
  constructor() {
    super();

    this.state = {
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.err.errors) {
      this.setState({
        errors: nextProps.err.errors
      });
    }
  }
  onSubmit(commentData) {
    const { user } = this.props.auth;
    const { postId } = this.props;
    commentData["name"] = user.name;
    commentData["avatar"] = user.avatar;

    this.props.addComment(postId, commentData);
  }
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CommentForm submit={this.onSubmit.bind(this)} errors={this.state.errors} />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

Comment.propTypes = {
  err: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

const stateToProps = state => {
  return {
    err: state.errors
  };
};

const dispatchToProps = dispatch => {
  return {
    addComment: (id, params) => dispatch(addComment(id, params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Comment);
