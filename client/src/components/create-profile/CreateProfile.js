import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }
  render() {
    return <div />;
  }
}

export default connect(null)(CreateProfile);
