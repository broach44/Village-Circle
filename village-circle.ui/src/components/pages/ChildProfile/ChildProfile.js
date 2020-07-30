import React from 'react';
import {
  Image,
  Button,
  Header,
  Container,
  Divider,
  Grid,
  Table,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import usersData from '../../../helpers/usersData';
import pointsData from '../../../helpers/pointsData';
import goalsData from '../../../helpers/goalsData';
import GoalTableRow from '../../shared/GoalTableRow/GoalTableRow';

import './ChildProfile.scss';

class ChildProfile extends React.Component {
  state = {
    childUser: {},
    userPosts: [],
    userPointTotal: 0,
    goals: [],
  }

  static props = {
    uid: PropTypes.string,
  }

  componentDidMount() {
    this.checkForUid();
    // this.getUserData();
  }

  checkForUid = () => {
    if (this.props.uid === undefined) {
      const { uid } = this.props.match.params;
      this.getUserData(uid);
    } else this.getUserData(this.props.uid);
  }

  getUserData = (uid) => {
    usersData.getSingleUserData(uid)
      .then((userData) => {
        this.setState({ childUser: userData });
        this.getPostInfo(userData.userId);
        this.getUserTotal(userData.userId);
        this.getUserGoals(userData.userId);
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

  getUserGoals = (userId) => {
    goalsData.getGoals(userId)
      .then((goalArr) => {
        this.setState({ goals: goalArr });
      })
      .catch((err) => console.error('err from get user goals', err));
  }

  render() {
    const {
      childUser,
      userPosts,
      userPointTotal,
      goals,
    } = this.state;
    return (
      <Container fluid textAlign='left' className="ChildProfile">
      <Header>My Profile</Header>
        <Grid columns='equal'>
          <Grid.Column width={2}>
            <Image src={`https://api.adorable.io/avatars/285/${childUser.firstName}@adorable.io.png`} size='small' />
            {/* <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-20kR46wUnTXeI8wTX1CUN5PpX81PJDpiSg&usqp=CAU'} size='small' /> */}
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
            <Header>My Goals</Header>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Points To Achieve</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
            { goals.map((goal) => <GoalTableRow key={goal.goalId} goal={goal} />) }
            </Table.Body>
            </Table>
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
