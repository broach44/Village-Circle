import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';

class GatheringHallFormModal extends Component {
  state = {
    open: false,
    gatheringHallNameInput: '',
    gatheringHallDescriptionInput: '',
  }

  static props = {
    userId: PropTypes.int,
    saveNewGatheringHall: PropTypes.func,
  }

  show = (size) => () => this.setState({ size, open: true })

  close = () => {
    this.setState({ open: false });
    this.setState({ gatheringHallNameInput: '' });
    this.setState({ gatheringHallDescriptionInput: '' });
  }

  saveNameInput = (e) => {
    this.setState({ gatheringHallNameInput: e.target.value });
  }

  saveDescriptionInput = (e) => {
    this.setState({ gatheringHallDescriptionInput: e.target.value });
  }

  saveNewGatheringHallEvent = (e) => {
    e.preventDefault();
    const newGatheringHall = {
      userId: this.props.userId,
      gatheringHallName: this.state.gatheringHallNameInput,
      gatheringHallDescription: this.state.gatheringHallDescriptionInput,
    };
    this.props.saveNewGatheringHall(newGatheringHall);
    this.close();
  }

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button onClick={this.show('large')} color='brown'><Icon name='add circle'/>Create New Gathering Hall</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Create New Gathering Hall</Modal.Header>
          <Modal.Content>
          <Form>
            <Form.Field required>
              <label>Gathering Hall Name</label>
              <Input placeholder='Include title for topic' onChange={this.saveNameInput} />
            </Form.Field>
            <Form.TextArea required label='Gathering Hall Description' placeholder='Include description for topic...' onChange={this.saveDescriptionInput}>
            </Form.TextArea>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>Cancel</Button>
            <Button
              positive
              icon='save'
              labelPosition='right'
              content='Save New Gathering Hall'
              onClick={this.saveNewGatheringHallEvent}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default GatheringHallFormModal;
