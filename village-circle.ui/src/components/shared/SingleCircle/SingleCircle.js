import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

import circleData from '../../../helpers/circlesData';
import messageData from '../../../helpers/messagesData';

import './SingleCircle.scss';
import MessageContainer from '../MessageContainer/MessageContainer';

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

  joinCircle = (e) => {
    e.preventDefault();
    this.setState({ circleMember: true });
    // TODO: Data call to create new member of the circle
  }

  render() {
    const { circle, circleMember, circleMessages } = this.state;
    return (
      <div className="SingleCircle">
        <h2>Circle: {circle.circleName}</h2>
        <p className="CircleDescription">{circle.circleDescription}</p>
        {
          (circleMember) ? <MessageContainer messages={circleMessages} /> : <Button color='brown' onClick={this.joinCircle}>Click to Join Circle</Button>
        }
      </div>
    );
  }
}

export default SingleCircle;
