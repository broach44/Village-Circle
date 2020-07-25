import React from 'react';
import {
  Image,
  Button,
  Header,
  Container,
  Divider,
  Grid,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import usersData from '../../../helpers/usersData';
import pointsData from '../../../helpers/pointsData';

import './ChildProfile.scss';

class ChildProfile extends React.Component {
  state = {
    childUser: {},
    userPosts: [],
    userPointTotal: 0,
  }

  static props = {
    uid: PropTypes.string,
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    usersData.getSingleUserData(this.props.uid)
      .then((userData) => {
        this.setState({ childUser: userData });
        this.getPostInfo(userData.userId);
        this.getUserTotal(userData.userId);
      })
      .catch((err) => console.error('err from getuser', err));
  }

  getPostInfo = (userId) => {
    usersData.getUserPosts(userId)
      .then((posts) => this.setState({ userPosts: posts }))
      .catch((err) => console.error('err from get post info', err));
  }

  getUserTotal = (userId) => {
    pointsData.getPointTotal(userId)
      .then((result) => this.setState({ userPointTotal: result }))
      .catch((err) => console.error('err from get User point total', err));
  }

  render() {
    const { childUser, userPosts, userPointTotal } = this.state;
    return (
      <Container fluid textAlign='left' className="Profile">
      <Header>My Profile</Header>
        <Grid columns='equal'>
          <Grid.Column width={2}>
            <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-20kR46wUnTXeI8wTX1CUN5PpX81PJDpiSg&usqp=CAU'} size='small' />
          </Grid.Column>
          <Grid.Column>
            <p>Name: {childUser.firstName} {childUser.lastName}</p>
            <p>Age: {childUser.age}</p>
            {/* <p>Total Points Earned: 200</p> */}
            <p>Email: {childUser.email}</p>
            <p>Total Points: {userPointTotal}</p>
            <Button disabled>Edit Profile</Button>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Grid columns={2}>
          <Grid.Column>
            <Header>Goals</Header>
            <p>*** COMING SOON ***</p>
          </Grid.Column>
          <Grid.Column>
            <Header>Activity</Header>
            {
              userPosts.map((post) => <p key={`${post.postLogId}${post.postDateTime}`}>Posted to {post.boardName} Board on {moment(post.postDateTime).format('LL')} : Earned 15 points!</p>)
            }
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default ChildProfile;
