import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PostFeedItem } from "../view";
import { deletePost } from "../../actions";

class PostFeed extends Component {
  onDelete(postId) {
    this.props.deletePost(postId);
  }
  render() {
    const { posts, auth } = this.props;
    return posts.map(post => (
      <PostFeedItem
        key={post._id}
        post={post}
        auth={auth}
        delete={this.onDelete.bind(this)}
      />
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  deletePost: PropTypes.func.isRequired
};

const stateToProps = state => {
  return {
    auth: state.auth
  };
};

const dispatchToProps = dispatch => {
  return {
    deletePost: params => dispatch(deletePost(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(PostFeed);
