import React from 'react';
import {
  Form,
  Button,
  Grid,
  Card,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './MessageContainer.scss';

class MessageContainer extends React.Component {
  state = {
    currentPostMessage: '',
    currentUser: null,
  }

  static props = {
    messages: PropTypes.Array,
  }

  resetInputBox = () => {
    this.setState({ currentPostMessage: '' });
  }

  setPostMessage = (e) => {
    this.setState({ currentPostMessage: e.target.value });
  }

  postEvent = (e) => {
    e.preventDefault();
    this.resetInputBox();
    // TODO: Add backend function to post message then reset input box.
  }

  deleteMessage = (e) => {
    e.preventDefault();
    // Call delete function from data file....reset message state
  }

  render() {
    const { messages } = this.props;
    const { currentPostMessage } = this.state;
    return (
      <div>
      <Form onSubmit={this.postEvent}>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={8}>
              <Form.TextArea placeholder='Write a message...' value={currentPostMessage} onChange={this.setPostMessage}/>
            </Grid.Column>
              <Button size='small'>Post Message</Button>
          </Grid.Row>
        </Grid>
      </Form>
      <Grid centered>
        <Grid.Column width={8}>
          <h3>Message Board:</h3>
          {
            (messages.length === 0) ? <h3>Currently no one has posted to this board!</h3>
              : <Card.Group>
                { messages.map((message) => <Card key={message.messageId} fluid raised className="singleMessage">
                  <Card.Content description={message.messageText} />
                  <Button.Group basic size='small'>
                    <Button icon='edit outline' />
                    <Button icon='delete' />
                  </Button.Group>
                  </Card>)}
                </Card.Group>
          }
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default MessageContainer;