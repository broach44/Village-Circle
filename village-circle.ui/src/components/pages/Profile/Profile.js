import React from 'react';
import PropTypes from 'prop-types';

import './Profile.scss';

import ChildProfile from '../ChildProfile/ChildProfile';

class Profile extends React.Component {
  static props = {
    uid: PropTypes.string,
  }

  render() {
    return (
      <>
        <ChildProfile uid={this.props.uid} />
      </>
    );
  }
}

export default Profile;
