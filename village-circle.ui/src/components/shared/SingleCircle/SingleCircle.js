import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';

import MessageContainer from '../MessageContainer/MessageContainer';

import announcementsData from '../../../helpers/announcementsData';
import circlesData from '../../../helpers/circlesData';
import messagesData from '../../../helpers/messagesData';
import userData from '../../../helpers/usersData';

import './SingleCircle.scss';
import AnnouncementContainer from '../AnnouncementContainer/AnnouncementContainer';

class SingleCircle extends React.Component {
  state = {
    circle: {},
    circleMember: false,
    circleMessages: [],
    currentUser: {},
    announcements: [],
  }

  static props = {
    authed: PropTypes.Boolean,
    uid: PropTypes.string,
  }

  componentDidMount() {
    this.getCircleData();
  }

  getUser = (uid, circleId) => {
    userData.getSingleUserData(uid)
      .then((user) => {
        this.setState({ currentUser: user });
        this.verifyCircleMembership(user.userId, circleId);
      })
      .catch((err) => console.error('err from get user', err));
  }

  getCircleData = () => {
    const { circleId } = this.props.match.params;
    const { authed, uid } = this.props;
    circlesData.getCircleById(circleId)
      .then((result) => {
        this.setState({ circle: result });
        if (authed) {
          this.getMessageData(result.boardId);
          this.getUser(uid, circleId);
          this.getAnnouncementData(result.circleId);
        }
      })
      .catch((err) => console.error('err from get single circle', err));
  }

  getMessageData = (boardId) => {
    messagesData.getAllMessages(boardId)
      .then((messageArr) => this.setState({ circleMessages: messageArr }))
      .catch((err) => console.error('err from get all messages', err));
  }

  getAnnouncementData = (circleId) => {
    announcementsData.getAllAnnouncements(circleId)
      .then((result) => this.setState({ announcements: result }))
      .catch((err) => console.error('err from get announcements', err));
  }

  // The function below will return true or false to check for membership
  verifyCircleMembership = (userId, circleId) => {
    circlesData.verifyMembership(userId, circleId)
      .then((isMemberResult) => this.setState({ circleMember: isMemberResult }))
      .catch((err) => console.error('error from verify circle membership', err));
  }

  postMessageToBoard = (messageObject) => {
    messagesData.postNewMessage(messageObject)
      .then(() => {
        this.getMessageData(messageObject.boardId);
      })
      .catch((err) => console.error('err from post message To Board', err));
  }

  deleteMessageFromBoard = (messageId) => {
    const { circle } = this.state;
    messagesData.deleteMessage(messageId)
      .then(() => {
        this.getMessageData(circle.boardId);
      })
      .catch((err) => console.error('err from delete message', err));
  }

  updateUserMessage = (updatedMessage) => {
    const { circle } = this.state;
    messagesData.updateMessage(updatedMessage)
      .then(() => {
        this.getMessageData(circle.boardId);
      })
      .catch((err) => console.error('err from update message', err));
  }

  joinThisCircle = (e) => {
    e.preventDefault();
    const { currentUser, circle } = this.state;
    const memberInfo = {
      userId: currentUser.userId,
      circleId: circle.circleId,
    };
    circlesData.joinCircle(memberInfo)
      .then(() => {
        this.setState({ circleMember: true })
        this.getCircleData();
      })
      .catch((err) => console.error('err from join circle', err));
  }

  renderBoard = () => {
    const { authed } = this.props;
    const {
      announcements,
      circle,
      circleMember,
      circleMessages,
      currentUser,
    } = this.state;
    if (authed) {
      if (circleMember && circle.boardId !== 0) {
        return (
          <Grid>
            <Grid.Column width={10}>
            <MessageContainer
                  currentUser={currentUser}
                  currentUserId={currentUser.userId}
                  postMessage={this.postMessageToBoard}
                  messages={circleMessages}
                  currentBoardId={circle.boardId}
                  deleteMessageFromBoard={this.deleteMessageFromBoard}
                  updateUserMessage={this.updateUserMessage} />
            </Grid.Column>
            <Grid.Column width={6}>
              <AnnouncementContainer announcements={announcements} />
            </Grid.Column>
          </Grid>
        );
      } return (
        <Button color='brown' onClick={this.joinThisCircle}>Click to Join Circle</Button>
      );
    } return (<p>You should login if you want to join this board</p>);
  }

  render() {
    const {
      circle,
    } = this.state;
    return (
      <div className="SingleCircle">
        <div className="CircleInfoDiv">
          <h2>Circle: {circle.circleName}</h2>
          <h3>Leader: {circle.circleLeader}</h3>
          <p className="CircleDescription">{circle.circleDescription}</p>
        </div>
        { this.renderBoard() }
      </div>
    );
  }
}

export default SingleCircle;
