import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import MessageContainer from '../MessageContainer/MessageContainer';
import circlesData from '../../../helpers/circlesData';
import messagesData from '../../../helpers/messagesData';

import './SingleCircle.scss';

class SingleCircle extends React.Component {
  state = {
    circle: {},
    circleMember: false,
    circleMessages: [],
    currentUserId: 1,
  }

  static props = {
    authed: PropTypes.bool,
  }

  componentDidMount() {
    this.getCircleData();
  }

  getCircleData = () => {
    const { currentUserId } = this.state;
    const { circleId } = this.props.match.params;
    circlesData.getCircleById(circleId)
      .then((result) => {
        this.setState({ circle: result });
        this.getMessageData(result.boardId);
        this.verifyCircleMembership(currentUserId, circleId);
      })
      .catch((err) => console.error('err from get single circle', err));
  }

  getMessageData = (boardId) => {
    messagesData.getAllMessages(boardId)
      .then((messageArr) => this.setState({ circleMessages: messageArr }))
      .catch((err) => console.error('err from get all messages', err));
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

  joinThisCircle = (e) => {
    e.preventDefault();
    const { currentUserId, circle } = this.state;
    const memberInfo = {
      userId: currentUserId,
      circleId: circle.circleId,
    };
    circlesData.joinCircle(memberInfo)
      .then(() => this.setState({ circleMember: true }))
      .catch((err) => console.error('err from join circle', err));
  }

  render() {
    const {
      circle,
      circleMember,
      circleMessages,
      currentUserId,
    } = this.state;
    return (
      <div className="SingleCircle">
        <h2>Circle: {circle.circleName}</h2>
        <p className="CircleDescription">{circle.circleDescription}</p>
        {
          (circleMember)
            ? <MessageContainer
                currentUserId={currentUserId}
                postMessage={this.postMessageToBoard}
                messages={circleMessages}
                currentBoardId={circle.boardId} />
            : <Button color='brown' onClick={this.joinThisCircle}>Click to Join Circle</Button>
        }
      </div>
    );
  }
}

export default SingleCircle;
