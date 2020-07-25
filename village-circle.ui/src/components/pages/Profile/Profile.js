import React from 'react';
import PropTypes from 'prop-types';

import './Profile.scss';

import AdultProfile from '../AdultProfile/AdultProfile';
import ChildProfile from '../ChildProfile/ChildProfile';
import usersData from '../../../helpers/usersData';
import circlesData from '../../../helpers/circlesData';

class Profile extends React.Component {
  state = {
    user: {},
    isParent: false,
    isChild: false,
    children: [],
    myCircles: [],
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
        if (result.isParent) {
          this.getAllChildren(result.userId);
        }
        if (result.isChild === false) {
          this.getMyCircles(result.userId);
        }
      })
      .catch((err) => console.error('err from set currentUser', err));
  }

  checkUserLevel = (user) => {
    if (user.isChild) this.setState({ isChild: true });
    if (user.isParent) this.setState({ isParent: true });
  }

  getAllChildren = (userId) => {
    usersData.getChildren(userId)
      .then((data) => this.setState({ children: data }))
      .catch((err) => console.error('err from get children', err));
  }

  getMyCircles = (userId) => {
    circlesData.getCirclesByUser(userId)
      .then((data) => this.setState({ myCircles: data }))
      .catch((err) => console.error('err from getCircles', err));
  }

  // if isChild is true, render Child Profile otherwise renderAdult Profile

  render() {
    const {
      isChild,
      isParent,
      user,
      children,
      myCircles,
    } = this.state;
    return (
      <>
        {
          (isChild) ? <ChildProfile uid={this.props.uid} /> : <AdultProfile uid={this.props.uid} circles={myCircles} user={user} isParent={isParent} children={children} />
        }
      </>
    );
  }
}

export default Profile;
