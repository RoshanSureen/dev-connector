import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostFeed from "./PostFeed";
import { PostForm } from "../../view";
import { Spinner } from "../../commons";
import { addPost, getPosts } from "../../../actions/Post";

class Posts extends Component {
  constructor() {
    super();

    this.state = {
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getPosts(null);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.err.errors) {
      this.setState({
        errors: nextProps.err.errors
      });
    }
  }
  onSubmit(postData) {
    const { user } = this.props.auth;
    postData["name"] = user.name;
    postData["avatar"] = user.avatar;

    this.props.addPost(postData);
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostForm submit={this.onSubmit.bind(this)} errors={this.state.errors} />{" "}
          <PostFeed posts={posts} />
        </div>
      );
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{postContent}</div>
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

Posts.propTypes = {
  err: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired
};

const stateToProps = state => {
  return {
    post: state.post,
    auth: state.auth,
    err: state.errors
  };
};

const dispatchToProps = dispatch => {
  return {
    addPost: params => dispatch(addPost(params)),
    getPosts: params => dispatch(getPosts(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Posts);
