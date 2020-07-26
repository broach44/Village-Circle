import React from 'react';
import {
  Comment,
  Input,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './MessageCard.scss';

class MessageCard extends React.Component {
  state = {
    editMode: false,
    textToEdit: '',
  }

  static props = {
    message: PropTypes.Object,
    currentUserId: PropTypes.int,
    updateUserMessage: PropTypes.func,
    deleteMessageFromBoard: PropTypes.func,
  }

  renderEditingButtons = (userIdOnMessage, messageId) => {
    const { editMode } = this.setState;
    if (userIdOnMessage === this.props.currentUserId) {
      return (
        <Comment.Actions basic size='small'>
          {
            (!editMode) ? <Comment.Action><Icon name='edit outline' onClick={this.beginEditingMessage}/></Comment.Action>
              : <Comment.Action><Icon icon='save outline'/></Comment.Action>
          }
          <Comment.Action><Icon name='delete' id={messageId} onClick={this.deleteEvent}/></Comment.Action>
        </Comment.Actions>
      );
    } return (<></>);
  }

  beginEditingMessage = () => {
    const { message } = this.props;
    this.setState({ textToEdit: message.messageText });
    this.setState({ editMode: true });
    this.renderEditingButtons(message.userId, message.messageId);
  }

  updateText = (e) => {
    this.setState({ textToEdit: e.target.value });
  }

  saveEvent = (e) => {
    e.preventDefault();
    const { textToEdit } = this.state;
    const { message, updateUserMessage } = this.props;
    // Add link to save update and refresh messages.
    const updatedMessageObject = {
      messageId: message.messageId,
      messageText: textToEdit,
    };
    updateUserMessage(updatedMessageObject);
    this.setState({ editMode: false });
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { message, deleteMessageFromBoard } = this.props;
    deleteMessageFromBoard(message.messageId);
  }

  render() {
    const { message } = this.props;
    const { editMode, textToEdit } = this.state;
    return (
      <Comment key={message.messageId} fluid raised className="singleMessage">
        <Comment.Avatar src={`https://api.adorable.io/avatars/75/${message.userName}@adorable.io.png`}/>
        <Comment.Content>
          <Comment.Author>{message.userName}</Comment.Author>
          <Comment.Metadata>
            <div>Posted {moment(message.postDateTime).format('LLL')}</div>
          </Comment.Metadata>
          {
            (editMode) ? <Input icon={<Icon name='save outline' onClick={this.saveEvent} link />} fluid focus value={textToEdit} onChange={this.updateText} />
              : <Comment.Text>{message.messageText}</Comment.Text>
          }
          { this.renderEditingButtons(message.userId, message.messageId) }
        </Comment.Content>
      </Comment>
    );
  }
}

export default MessageCard;
