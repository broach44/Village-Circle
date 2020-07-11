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
  static props = {
    messages: PropTypes.Array,
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
      <Form>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={8}>
              <Form.TextArea placeholder='Write a message...' />
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
                  <Card.Content description={message.messageText} /></Card>)}
                </Card.Group>
          }
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default MessageContainer;
