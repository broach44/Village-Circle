import React from 'react';
import {
  Image,
  Button,
  Header,
  Container,
  Divider,
  Grid,
  Table,
  Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import usersData from '../../../helpers/usersData';
import pointsData from '../../../helpers/pointsData';
import goalsData from '../../../helpers/goalsData';
import GoalTableRow from '../../shared/GoalTableRow/GoalTableRow';
import NewGoalModal from '../../shared/NewGoalModal/NewGoalModal';

import './ChildProfile.scss';

class ChildProfile extends React.Component {
  state = {
    childUser: {},
    userPosts: [],
    userPointTotal: 0,
    goals: [],
    userActivities: [],
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
        this.getUserActivities(userData.userId);
      })
      .catch((err) => console.error('err from getuser', err));
  }

  getPostInfo = (userId) => {
    usersData.getUserPosts(userId)
      .then((posts) => this.setState({ userPosts: posts }))
      .catch(() => this.setState({ userPosts: [] }));
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

  getUserActivities = (userId) => {
    pointsData.getUserActivityLog(userId)
      .then((info) => this.setState({ userActivities: info }))
      .catch((err) => console.error('err from get user activities', err));
  }

  saveNewGoal = (goalObj) => {
    const { childUser } = this.state;
    goalsData.createGoal(goalObj)
      .then(() => this.getUserGoals(childUser.userId))
      .catch((err) => console.error('err from save new goal', err));
  }

  // The Function below is currently not in use but ready for future releases.  This function will give a log of a user's message posts.
  renderUserPostLog = () => {
    const { userPosts } = this.state;
    if (userPosts !== 'This user has not posted any messages') {
      return (userPosts.map((post) => <p key={`${post.postLogId}${post.postDateTime}`}>Posted to {post.boardName} Board on {moment(post.postDateTime).format('LL')} : Earned 15 points!</p>));
    }
    return (<Message>Oops! Looks like you don't have any activity yet.  Join a group and start participating to earn points!</Message>);
  }

  renderAllActivity = () => {
    const { userActivities } = this.state;
    if (userActivities !== 'This user does not have any activities completed yet') {
      return (
        userActivities.map((activity) => <p key={`${activity.pointLogId}`}>
          Earned {activity.numberOfPoints} points on {moment(activity.earnedDate).format('LL')} from {activity.activityName}
        </p>));
    }
    return (<Message>Oops! Looks like you don't have any activity yet.  Join a group and start participating to earn points!</Message>);
  }

  render() {
    const {
      childUser,
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
            {/* <Button disabled>Edit Profile</Button> */}
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Grid columns={2}>
          <Grid.Column>
            <Header floated='left'>My Goals</Header><NewGoalModal saveNewGoal={this.saveNewGoal} userId={childUser.userId} />
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Points To Achieve</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
            { (goals.length === 0) ? <Table.Row><Table.Cell>You currently do not have any goals. Click the button above to add a new goal</Table.Cell></Table.Row>
              : goals.map((goal) => <GoalTableRow key={goal.goalId} goal={goal} />) }
            </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Header>Activity</Header>
            {this.renderAllActivity()}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default ChildProfile;
