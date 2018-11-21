import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/spinner';
import { Link } from 'react-router-dom';
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    const returnDasboardStatus = (profile, loading) => {
      return profile == null || loading
        ? (dashboardContent = <Spinner />)
        : Object.keys(profile).length > 0
        ? (dashboardContent = <h4>Display Profile: TODO</h4>)
        : (dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {user.name}</p>
              <p>You haven't set up a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          ));
    };
    returnDasboardStatus(profile, loading);
    //   if(profile == null || loading) {
    //     dashboardContent = <h4> Loading...<h4>
    // }  else { (dashboardContent = <h1>Hello</h1>)
    //   dashboardContent = <h1>Hello</h1>
    // }

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

Dashboard.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);