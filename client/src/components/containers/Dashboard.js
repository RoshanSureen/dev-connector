import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions";
import { Spinner } from "../commons";
import { DashboardActions } from "../view";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(null);
  }
  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteAccount({});
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading === true) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile/${profile.result.handle}`}>{user.name}</Link>
            </p>
            <DashboardActions />
            {/* TODO: Experience and education */}
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // user is logged but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
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
    profile: state.profile,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
  };
};
const dispatchToProps = dispatch => {
  return {
    getCurrentProfile: params => dispatch(getCurrentProfile(params)),
    deleteAccount: params => dispatch(deleteAccount(params))
  };
};

export default connect(statetToProps, dispatchToProps)(Dashboard);
