import React from 'react';
import PropTypes from 'prop-types';

import './Profile.scss';

import AdultProfile from '../AdultProfile/AdultProfile';
import ChildProfile from '../ChildProfile/ChildProfile';
import usersData from '../../../helpers/usersData';

class Profile extends React.Component {
  state = {
    user: {},
    isParent: false,
    isChild: false,
  }

  static props = {
    uid: PropTypes.string,
  }

  componentDidMount() {
    this.setCurrentUser();
  }

  setCurrentUser = () => {
    usersData.getSingleUserData(this.props.uid)
      .then((result) => {
        this.setState({ user: result });
        this.checkUserLevel(result);
      })
      .catch((err) => console.error('err from set currentUser', err));
  }

  checkUserLevel = (user) => {
    if (user.isChild) this.setState({ isChild: true });
    if (user.isParent) this.setState({ isParent: true });
  }

  // if isChild is true, render Child Profile otherwise renderAdult Profile

  render() {
    const { isChild, isParent, user } = this.state;
    return (
      <>
        {
          (isChild) ? <ChildProfile uid={this.props.uid} /> : <AdultProfile uid={this.props.uid} user={user} isParent={isParent} />
        }
      </>
    );
  }
}

export default Profile;
