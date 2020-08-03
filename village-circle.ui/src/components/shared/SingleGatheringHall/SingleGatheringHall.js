import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';

import MessageContainer from '../MessageContainer/MessageContainer';

import gatheringHallsData from '../../../helpers/gatheringHallsData';
import messagesData from '../../../helpers/messagesData';
import userData from '../../../helpers/usersData';

import './SingleGatheringHall.scss';

class SingleGatheringHall extends React.Component {
  state = {
    gatheringHall: {},
    gatheringHallMember: false,
    gatheringHallMessages: [],
    currentUser: {},
  }

  static props = {
    authed: PropTypes.Boolean,
    uid: PropTypes.string,
  }

  componentDidMount() {
    this.getGatheringHallData();
  }

  getGatheringHallData = () => {
    const { gatheringHallId } = this.props.match.params;
    const { authed, uid } = this.props;
    gatheringHallsData.getGatheringHallById(gatheringHallId)
      .then((result) => {
        this.setState({ gatheringHall: result });
        if (authed) {
          this.getMessageData(result.boardId);
          this.getUser(uid, gatheringHallId, result.userId);
        }
      })
      .catch((err) => console.error('err from get single gathering Hall', err));
  }

  getUser = (uid, gatheringHallId, gatheringHallUserId) => {
    userData.getSingleUserData(uid)
      .then((user) => {
        this.setState({ currentUser: user });
        this.verifyGatheringHallMembership(user.userId, gatheringHallId);
      })
      .catch((err) => console.error('err from get user', err));
  }

  getMessageData = (boardId) => {
    messagesData.getAllMessages(boardId)
      .then((messageArr) => this.setState({ gatheringHallMessages: messageArr }))
      .catch((err) => console.error('err from get all messages', err));
  }

  // The function below will return true or false to check for membership
  verifyGatheringHallMembership = (userId, gatheringHallId) => {
    gatheringHallsData.verifyMembership(userId, gatheringHallId)
      .then((isMemberResult) => this.setState({ gatheringHallMember: isMemberResult }))
      .catch((err) => console.error('error from verify gathering Hall membership', err));
  }

  postMessageToBoard = (messageObject) => {
    messagesData.postNewMessage(messageObject)
      .then(() => {
        this.getMessageData(messageObject.boardId);
      })
      .catch((err) => console.error('err from post message To Board', err));
  }

  deleteMessageFromBoard = (messageId) => {
    const { gatheringHall } = this.state;
    messagesData.deleteMessage(messageId)
      .then(() => {
        this.getMessageData(gatheringHall.boardId);
      })
      .catch((err) => console.error('err from delete message', err));
  }

  updateUserMessage = (updatedMessage) => {
    const { gatheringHall } = this.state;
    messagesData.updateMessage(updatedMessage)
      .then(() => {
        this.getMessageData(gatheringHall.boardId);
      })
      .catch((err) => console.error('err from update message', err));
  }

  joinThisGatheringHall = (e) => {
    e.preventDefault();
    const { currentUser, gatheringHall } = this.state;
    const memberInfo = {
      userId: currentUser.userId,
      gatheringHallId: gatheringHall.gatheringHallId,
    };
    gatheringHallsData.joinGatheringHall(memberInfo)
      .then(() => {
        this.setState({ gatheringHallMember: true });
        this.getGatheringHallData();
      })
      .catch((err) => console.error('err from join gathering Hall', err));
  }

  renderBoard = () => {
    const { authed } = this.props;
    const {
      gatheringHall,
      gatheringHallMember,
      gatheringHallMessages,
      currentUser,
    } = this.state;
    if (authed) {
      if (gatheringHallMember && gatheringHall.boardId !== 0) {
        return (
          <Grid>
            <Grid.Column>
            <MessageContainer
                  currentUser={currentUser}
                  currentUserId={currentUser.userId}
                  postMessage={this.postMessageToBoard}
                  messages={gatheringHallMessages}
                  currentBoardId={gatheringHall.boardId}
                  deleteMessageFromBoard={this.deleteMessageFromBoard}
                  updateUserMessage={this.updateUserMessage} />
            </Grid.Column>
          </Grid>
        );
      } return (
        <Button color='brown' onClick={this.joinThisGatheringHall}>Click to Join Gathering Hall</Button>
      );
    } return (<p>You should login if you want to join this board</p>);
  }

  render() {
    const {
      gatheringHall,
    } = this.state;
    return (
      <div className="SingleGatheringHall">
        <div className="GatheringHallInfoDiv">
          <h2>Gathering Hall: {gatheringHall.gatheringHallName}</h2>
          <h3>Leader: {gatheringHall.gatheringHallLeader}</h3>
          <p className="GatheringHallDescription">{gatheringHall.gatheringHallDescription}</p>
        </div>
        { this.renderBoard() }
      </div>
    );
  }
}

export default SingleGatheringHall;
