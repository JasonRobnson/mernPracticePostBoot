import React, { Component } from 'react';
import { Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileAbout from './ProfileAbout';
import Spinner from '../common/Spinner';

class Profile extends Component {
  render() {
    return <div />;
  }
}

mapStateToProps = state => ({
  profile: PropTypes.object.isRequired
});
export default Connect(mapStateToProps)(Profile);
