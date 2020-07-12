import React from 'react';
import { Card, Input, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
  }

  renderEditingButtons = (userIdOnMessage, messageId) => {
    const { editMode } = this.setState;
    if (userIdOnMessage === this.props.currentUserId) {
      return (
        <Button.Group basic size='small'>
          {
            (!editMode) ? <Button icon='edit outline' onClick={this.beginEditingMessage} />
              : <Button icon='save outline' />
          }
          <Button icon='delete' id={messageId} onClick={this.deleteMessage} />
        </Button.Group>
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

  render() {
    const { message } = this.props;
    const { editMode, textToEdit } = this.state;
    return (
      <Card key={message.messageId} fluid raised className="singleMessage">
      {
        (editMode) ? <Input icon={<Icon name='save outline' onClick={this.saveEvent} link />} fluid focus value={textToEdit} onChange={this.updateText} />
          : <Card.Content description={message.messageText} />
      }
      { this.renderEditingButtons(message.userId, message.messageId) }
      </Card>
    );
  }
}

export default MessageCard;
