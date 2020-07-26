import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';

class CircleFormModal extends Component {
  state = {
    open: false,
    circleNameInput: '',
    circleDescriptionInput: '',
  }

  static props = {
    userId: PropTypes.int,
    saveNewCircle: PropTypes.func,
  }

  show = (size) => () => this.setState({ size, open: true })

  close = () => {
    this.setState({ open: false });
    this.setState({ circleNameInput: '' });
    this.setState({ circleDescriptionInput: '' });
  }

  saveNameInput = (e) => {
    this.setState({ circleNameInput: e.target.value });
  }

  saveDescriptionInput = (e) => {
    this.setState({ circleDescriptionInput: e.target.value });
  }

  saveNewCircleEvent = (e) => {
    e.preventDefault();
    const newCircle = {
      userId: this.props.userId,
      circleName: this.state.circleNameInput,
      circleDescription: this.state.circleDescriptionInput,
    };
    this.props.saveNewCircle(newCircle);
    this.close();
  }

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button onClick={this.show('large')} color='brown'><Icon name='add circle'/>Create New Circle</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Create New Circle</Modal.Header>
          <Modal.Content>
          <Form>
            <Form.Field required>
              <label>Circle Name</label>
              <Input placeholder='Include title for topic' onChange={this.saveNameInput} />
            </Form.Field>
            <Form.TextArea required label='Circle Description' placeholder='Include description for topic...' onChange={this.saveDescriptionInput}>
            </Form.TextArea>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>Cancel</Button>
            <Button
              positive
              icon='save'
              labelPosition='right'
              content='Save New Circle'
              onClick={this.saveNewCircleEvent}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default CircleFormModal;
