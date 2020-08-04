import React from 'react';
import PropTypes from 'prop-types';

import AdultProfile from '../AdultProfile/AdultProfile';
import ChildProfile from '../ChildProfile/ChildProfile';
import usersData from '../../../helpers/usersData';
import circlesData from '../../../helpers/circlesData';
import guildsData from '../../../helpers/guildsData';
import gatheringHallsData from '../../../helpers/gatheringHallsData';

import './Profile.scss';

class Profile extends React.Component {
  state = {
    user: {},
    isParent: false,
    isChild: false,
    children: [],
    myCircles: [],
    myGuilds: [],
    myGatheringHalls: [],
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
          this.getMyGuilds(result.userId);
          this.getMyGatheringHalls(result.userId);
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

  saveNewCircle = (circleObject) => {
    circlesData.createNewCircle(circleObject)
      .then(() => this.getMyCircles(this.state.user.userId))
      .catch((err) => console.error('err from save new circle', err));
  }

  getMyGuilds = (userId) => {
    guildsData.getGuildsByUser(userId)
      .then((data) => this.setState({ myGuilds: data }))
      .catch((err) => console.error('err from getGuilds', err));
  }

  saveNewGuild = (guildObject) => {
    guildsData.createNewGuild(guildObject)
      .then(() => this.getMyGuilds(this.state.user.userId))
      .catch((err) => console.error('err from save new guild', err));
  }

  getMyGatheringHalls = (userId) => {
    gatheringHallsData.getGatheringHallsByUser(userId)
      .then((data) => this.setState({ myGatheringHalls: data }))
      .catch((err) => console.error('err from getGatheringHalls', err));
  }

  saveNewGatheringHall = (gatheringHallObject) => {
    gatheringHallsData.createNewGatheringHall(gatheringHallObject)
      .then(() => this.getMyGatheringHalls(this.state.user.userId))
      .catch((err) => console.error('err from save new guild', err));
  }

  // if isChild is true, render Child Profile otherwise renderAdult Profile

  render() {
    const {
      isChild,
      isParent,
      user,
      children,
      myCircles,
      myGuilds,
      myGatheringHalls,
    } = this.state;
    return (
      <React.Fragment className='Profile'>
        {
          (isChild) ? <ChildProfile uid={this.props.uid} />
            : <AdultProfile uid={this.props.uid}
            saveNewCircle={this.saveNewCircle}
            circles={myCircles}
            saveNewGuild={this.saveNewGuild}
            guilds={myGuilds}
            saveNewGatheringHall={this.saveNewGatheringHall}
            gatheringHalls={myGatheringHalls}
            user={user}
            isParent={isParent}
            children={children}
            />
        }
      </React.Fragment>
    );
  }
}

export default Profile;
