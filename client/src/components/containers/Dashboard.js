import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions";
import { Spinner } from "../view/commons";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(null);
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading === true) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = <h1>Hello</h1>;
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const statetToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};
const dispatchToProps = dispatch => {
  return {
    getCurrentProfile: params => dispatch(getCurrentProfile(params))
  };
};

export default connect(statetToProps, dispatchToProps)(Dashboard);
