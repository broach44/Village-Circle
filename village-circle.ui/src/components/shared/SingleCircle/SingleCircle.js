import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

import circleData from '../../../helpers/circlesData';
import messageData from '../../../helpers/messagesData';

import './SingleCircle.scss';
import MessageContainer from '../MessageContainer/MessageContainer';
import circlesData from '../../../helpers/circlesData';

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
    circleData.getCircleById(circleId)
      .then((result) => {
        this.setState({ circle: result });
        this.getMessageData(result.boardId);
        this.verifyCircleMembership(currentUserId, circleId);
      })
      .catch((err) => console.error('err from get single circle', err));
  }

  getMessageData = (boardId) => {
    messageData.getAllMessages(boardId)
      .then((messageArr) => this.setState({ circleMessages: messageArr }))
      .catch((err) => console.error('err from get all messages', err));
  }

  // The function below will return true or false to check for membership
  verifyCircleMembership = (userId, circleId) => {
    circleData.verifyMembership(userId, circleId)
      .then((isMemberResult) => this.setState({ circleMember: isMemberResult }))
      .catch((err) => console.error('error from verify circle membership', err));
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
    const { circle, circleMember, circleMessages } = this.state;
    return (
      <div className="SingleCircle">
        <h2>Circle: {circle.circleName}</h2>
        <p className="CircleDescription">{circle.circleDescription}</p>
        {
          (circleMember) ? <MessageContainer messages={circleMessages} /> : <Button color='brown' onClick={this.joinThisCircle}>Click to Join Circle</Button>
        }
      </div>
    );
  }
}

export default SingleCircle;
