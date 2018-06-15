import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spinner } from "../../commons";
import { getPostById } from "../../../actions/Post";

class Post extends Component {
  componentWillMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <h1>Post</h1>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const stateToProps = state => {
  return {
    post: state.post
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
