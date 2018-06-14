import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PostFeedItem } from "../view";

class PostFeed extends Component {
  onDelete(postId) {
    console.log("post container: " + postId);
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
  posts: PropTypes.array.isRequired
};

const stateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(stateToProps)(PostFeed);
