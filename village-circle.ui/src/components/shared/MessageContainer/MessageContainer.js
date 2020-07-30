import React from 'react';
import {
  Form,
  Button,
  Grid,
  Comment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import MessageCard from '../MessageCard/MessageCard';

import './MessageContainer.scss';
import pointsData from '../../../helpers/pointsData';

class MessageContainer extends React.Component {
  state = {
    currentPostMessage: '',
  }

  static props = {
    messages: PropTypes.Array,
    postMessage: PropTypes.func,
    currentBoardId: PropTypes.int,
    currentUserId: PropTypes.int,
    deleteMessageFromBoard: PropTypes.func,
    updateUserMessage: PropTypes.func,
    currentUser: PropTypes.object,
  }

  resetInputBox = () => {
    this.setState({ currentPostMessage: '' });
  }

  setPostMessage = (e) => {
    this.setState({ currentPostMessage: e.target.value });
  }

  postEvent = (e) => {
    e.preventDefault();
    const { currentBoardId, postMessage, currentUserId } = this.props;
    const { currentPostMessage } = this.state;
    // TODO: Add backend function to post message then reset input box.
    const messageObject = {
      boardId: currentBoardId,
      userId: currentUserId,
      messageText: currentPostMessage,
    };
    postMessage(messageObject);
    this.resetInputBox();
    this.earnPointsForPost();
  }

  earnPointsForPost = () => {
    // this function will add points for current user posting...activity id = 1 for post points
    const { currentUserId } = this.props;
    const pointObjectToAdd = {
      userId: currentUserId,
      activityPointId: 1,
    };
    pointsData.addPoints(pointObjectToAdd)
      .then()
      .catch((err) => console.error('err from earn points', err));
  }

  render() {
    const { messages, currentUserId, updateUserMessage, deleteMessageFromBoard } = this.props;
    const { currentPostMessage } = this.state;
    return (
      <div className='CircleMessageContainer'>
      <Form onSubmit={this.postEvent}>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <Form.TextArea placeholder='Write a message...' value={currentPostMessage} onChange={this.setPostMessage}/>
              <Button floated='right' size='small'>Post Message</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <Grid centered>
        <Grid.Column className='gridMessageContainer' width={8}>
          <h3 className="messageBoardTitle">Message Board:</h3>
          {
            (messages.length === 0) ? <h3>Currently no one has posted to this board!</h3>
              : <Comment.Group>
                {
                  messages.map((message) => <MessageCard key={message.messageId} currentUserId={currentUserId} message={message} updateUserMessage={updateUserMessage} deleteMessageFromBoard={deleteMessageFromBoard} />)
                }
                </Comment.Group>
          }
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default MessageContainer;
