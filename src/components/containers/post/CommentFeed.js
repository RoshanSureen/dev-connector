import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../../actions/Post";
import { CommentItem } from "../../view";

class CommentFeed extends Component {
  onDelete(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const { comments, postId } = this.props;
    return comments.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
        postId={postId}
        auth={this.props.auth}
        delete={this.onDelete.bind(this)}
      />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const stateToProps = state => {
  return {
    auth: state.auth
  };
};
const dispatchToProps = dispatch => {
  return {
    deleteComment: (postId, commentId) => dispatch(deleteComment(postId, commentId))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(CommentFeed);
