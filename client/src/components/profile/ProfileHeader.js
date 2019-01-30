import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render(props) {
    const { profile } = this.props;

    return (
      <div class="row">
        <h1>Header</h1>
      </div>
    );
  }
}

export default ProfileHeader;
