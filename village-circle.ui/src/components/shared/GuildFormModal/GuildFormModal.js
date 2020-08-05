import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';

class GuildFormModal extends Component {
  state = {
    open: false,
    guildNameInput: '',
    guildDescriptionInput: '',
  }

  static props = {
    userId: PropTypes.int,
    saveNewGuild: PropTypes.func,
  }

  show = (size) => () => this.setState({ size, open: true })

  close = () => {
    this.setState({ open: false });
    this.setState({ guildNameInput: '' });
    this.setState({ guildDescriptionInput: '' });
  }

  saveNameInput = (e) => {
    this.setState({ guildNameInput: e.target.value });
  }

  saveDescriptionInput = (e) => {
    this.setState({ guildDescriptionInput: e.target.value });
  }

  saveNewGuildEvent = (e) => {
    e.preventDefault();
    const newGuild = {
      userId: this.props.userId,
      guildName: this.state.guildNameInput,
      guildDescription: this.state.guildDescriptionInput,
    };
    this.props.saveNewGuild(newGuild);
    this.close();
  }

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button className='GuildFormModalButton' onClick={this.show('large')} color='brown'><Icon name='add circle'/>Create New Guild</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Create New Guild</Modal.Header>
          <Modal.Content>
          <Form>
            <Form.Field required>
              <label>Guild Name</label>
              <Input placeholder='Include title for topic' onChange={this.saveNameInput} />
            </Form.Field>
            <Form.TextArea required label='Guild Description' placeholder='Include description for topic...' onChange={this.saveDescriptionInput}>
            </Form.TextArea>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>Cancel</Button>
            <Button
              positive
              icon='save'
              labelPosition='right'
              content='Save New Guild'
              onClick={this.saveNewGuildEvent}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default GuildFormModal;
