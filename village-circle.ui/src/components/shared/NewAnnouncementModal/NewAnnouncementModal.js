import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Modal,
  Form,
  Icon,
} from 'semantic-ui-react';

class NewAnnouncementModal extends React.Component {
  state = {
    open: false,
    announcementTextInput: '',
  }

  static props = {
    saveNewAnnouncement: PropTypes.func,
  }

  show = (size) => () => this.setState({ size, open: true })

  close = () => {
    this.setState({ open: false });
    this.setState({ announcementTextInput: '' });
  }

  saveTextInput = (e) => {
    this.setState({ announcementTextInput: e.target.value });
  }

  saveNewAnnouncementEvent = (e) => {
    e.preventDefault();
    this.props.saveNewAnnouncement(this.state.announcementTextInput);
    this.close();
  }

  render() {
    const { open, size } = this.state;
    return (
      <div>
        <Button className='AddAnnouncementModalButton' onClick={this.show('small')} color='brown'><Icon name='add circle'/>Add New Announcement</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Create New Announcement</Modal.Header>
          <Modal.Content>
          <Form>
            <Form.TextArea required label='Announcement Text' placeholder='Enter your announcement here...' onChange={this.saveTextInput}>
            </Form.TextArea>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>Cancel</Button>
            <Button
              positive
              icon='save'
              labelPosition='right'
              content='Save Announcement'
              onClick={this.saveNewAnnouncementEvent}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default NewAnnouncementModal;
