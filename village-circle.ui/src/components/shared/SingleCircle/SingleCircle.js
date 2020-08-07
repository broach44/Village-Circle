import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';

import AnnouncementContainer from '../AnnouncementContainer/AnnouncementContainer';
import LinkContainer from '../LinkContainer/LinkContainer';
import MemberListModal from '../MemberListModal/MemberListModal';
import MessageContainer from '../MessageContainer/MessageContainer';

import announcementsData from '../../../helpers/circleAnnouncementsData';
import circlesData from '../../../helpers/circlesData';
import linksData from '../../../helpers/circleLinksData';
import messagesData from '../../../helpers/messagesData';
import userData from '../../../helpers/usersData';

import './SingleCircle.scss';

class SingleCircle extends React.Component {
  state = {
    circle: {},
    circleMember: false,
    circleMessages: [],
    currentUser: {},
    announcements: [],
    leaderView: false,
    childCircleMembers: [],
    links: [],
  }

  static props = {
    authed: PropTypes.Boolean,
    uid: PropTypes.string,
  }

  componentDidMount() {
    this.getCircleData();
  }

  getCircleData = () => {
    const { circleId } = this.props.match.params;
    const { authed, uid } = this.props;
    circlesData.getCircleById(circleId)
      .then((result) => {
        this.setState({ circle: result });
        if (authed) {
          this.getMessageData(result.boardId);
          this.getUser(uid, circleId, result.userId);
          this.getAnnouncementData(result.circleId);
          this.getLinkData(result.circleId);
          this.getMembers(result.circleId);
        }
      })
      .catch((err) => console.error('err from get single circle', err));
  }

  getUser = (uid, circleId, circleUserId) => {
    userData.getSingleUserData(uid)
      .then((user) => {
        this.setState({ currentUser: user });
        this.verifyCircleMembership(user.userId, circleId);
        this.checkLeaderStatus(user.userId, circleUserId);
      })
      .catch((err) => console.error('err from get user', err));
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

  getLinkData = (circleId) => {
    linksData.getAllLinks(circleId)
      .then((result) => this.setState({ links: result }))
      .catch((err) => console.error('err from get links', err));
  }

  getMembers = (circleId) => {
    circlesData.getMemberListOfCircle(circleId)
      .then((memberData) => {
        const childUsers = memberData.filter((member) => member.isChild === true);
        this.setState({ childCircleMembers: childUsers });
      })
      .catch((err) => console.error('err from get circle members', err));
  }

  // The function below will return true or false to check for membership
  verifyCircleMembership = (userId, circleId) => {
    circlesData.verifyMembership(userId, circleId)
      .then((isMemberResult) => this.setState({ circleMember: isMemberResult }))
      .catch((err) => console.error('error from verify circle membership', err));
  }

  checkLeaderStatus = (userId, circleUserId) => {
    if (userId === circleUserId) this.setState({ leaderView: true });
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
        this.setState({ circleMember: true });
        this.getCircleData();
      })
      .catch((err) => console.error('err from join circle', err));
  }

  renderBoard = () => {
    const { authed } = this.props;
    const {
      circle,
      circleMember,
      circleMessages,
      currentUser,
    } = this.state;
    if (authed) {
      if (circleMember && circle.boardId !== 0) {
        return (
          <MessageContainer
                currentUser={currentUser}
                currentUserId={currentUser.userId}
                postMessage={this.postMessageToBoard}
                messages={circleMessages}
                currentBoardId={circle.boardId}
                deleteMessageFromBoard={this.deleteMessageFromBoard}
                updateUserMessage={this.updateUserMessage} />
        );
      } return (
        <Button color='brown' onClick={this.joinThisCircle}>Click to Join Circle</Button>
      );
    } return (<p>You should login if you want to join this board</p>);
  }

  renderLeaderView = () => {
    if (this.state.leaderView) return <MemberListModal members={this.state.childCircleMembers} />;
    return <></>;
  }

  render() {
    const {
      circle,
      links,
      announcements,
      leaderView,
    } = this.state;
    return (
      <div className="SingleCircle">
        <Grid className="CircleInfoDiv">
          <Grid.Column width={9}>
            <h2>Circle: {circle.circleName}</h2>
            <h3>Leader: {circle.circleLeader}</h3>
            <h3>Leader Email: {circle.circleLeaderEmail}</h3>
            <p className="CircleDescription">{circle.circleDescription}</p>
            {this.renderLeaderView()}
            { this.renderBoard() }
          </Grid.Column>
          <Grid.Column width={7}>
            <AnnouncementContainer getAnnouncementData={this.getAnnouncementData} circleId={circle.circleId} announcements={announcements} leaderView={leaderView} />
            <LinkContainer getLinkData={this.getLinkData} saveNewLink={this.saveNewLink} circleId={circle.circleId} links={links} leaderView={leaderView} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SingleCircle;
