import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Spinner } from "../../commons";
import { getPostById } from "../../../actions/Post";
import { PostItem } from "../../view";
import Comment from "./Comment";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentWillMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === undefined || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post.result} auth={this.props.auth} showActions={false} />{" "}
          <Comment postId={post.result._id} auth={this.props.auth} />{" "}
          <CommentFeed postId={post.result._id} comments={post.result.comments} />{" "}
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed{" "}
              </Link>{" "}
              {postContent}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const stateToProps = state => {
  return {
    post: state.post,
    auth: state.auth
  };
};
const dispatchToProps = dispatch => {
  return {
    getPost: params => dispatch(getPostById(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Post);
