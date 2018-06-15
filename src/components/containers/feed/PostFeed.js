import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PostItem } from "../../view";
import { deletePost, addLike, removeLike } from "../../../actions/Post";

class PostFeed extends Component {
  onDelete(postId) {
    this.props.deletePost(postId);
  }
  onLike(postId) {
    this.props.addLike(postId);
  }
  onUnlike(postId) {
    this.props.removeLike(postId);
  }
  render() {
    const { posts, auth } = this.props;
    return posts.map(post => (
      <PostItem
        key={post._id}
        post={post}
        auth={auth}
        delete={this.onDelete.bind(this)}
        like={this.onLike.bind(this)}
        unlike={this.onUnlike.bind(this)}
      />
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const stateToProps = state => {
  return {
    auth: state.auth
  };
};

const dispatchToProps = dispatch => {
  return {
    deletePost: params => dispatch(deletePost(params)),
    addLike: params => dispatch(addLike(params)),
    removeLike: params => dispatch(removeLike(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(PostFeed);
