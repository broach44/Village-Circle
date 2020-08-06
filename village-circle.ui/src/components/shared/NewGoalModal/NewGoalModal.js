import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';

class NewGoalModal extends Component {
  state = {
    open: false,
    pointGoalInput: 0,
  }

  static props = {
    userId: PropTypes.int,
    saveNewGoal: PropTypes.func,
    currentPointTotal: PropTypes.int,
  }

  show = (size) => () => this.setState({ size, open: true })

  close = () => {
    this.setState({ open: false });
    this.setState({ pointGoalInput: 0 });
  }

  saveGoalInput = (e) => {
    this.setState({ pointGoalInput: parseInt(e.target.value, 10) });
  }

  saveNewGoalEvent = (e) => {
    e.preventDefault();
    const newGoal = {
      userId: this.props.userId,
      pointTarget: this.state.pointGoalInput,
    };
    this.props.saveNewGoal(newGoal);
    this.close();
  }

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button onClick={this.show('mini')} color='blue' className='newGoalButton' floated='right' size='mini'><Icon name='add circle'/>Add New Goal</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Create New Goal</Modal.Header>
          <Modal.Content>
          <Form>
            <Form.Field required>
              <label pointing='below'>Target must be at least 10 more points than current total.</label>
              <Input placeholder='Enter a new Point Target' onChange={this.saveGoalInput} />
            </Form.Field>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>Cancel</Button>
            <Button
              positive
              icon='save'
              labelPosition='right'
              content='Save New Goal'
              disabled={this.state.pointGoalInput < this.props.currentPointTotal + 10}
              onClick={this.saveNewGoalEvent}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default NewGoalModal;
