import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';

class NewLinkModal extends React.Component {
  state = {
    open: false,
    linkNameInput: '',
    linkDescriptionInput: '',
    linkUrlInput: '',
  }

  static props = {
    saveNewLink: PropTypes.func,
    circleId: PropTypes.int,
  }

  show = (size) => () => this.setState({ size, open: true })

  close = () => {
    this.setState({ open: false });
    this.setState({ linkNameInput: '' });
    this.setState({ linkDescriptionInput: '' });
    this.setState({ linkUrlInput: '' });
  }

  saveNameInput = (e) => {
    this.setState({ linkNameInput: e.target.value });
  }

  saveDescriptionInput = (e) => {
    this.setState({ linkDescriptionInput: e.target.value });
  }

  saveUrlInput = (e) => {
    this.setState({ linkUrlInput: e.target.value });
  }

  saveNewLinkEvent = (e) => {
    e.preventDefault();
    const { linkNameInput, linkDescriptionInput, linkUrlInput } = this.state;
    const newLink = {
      linkTitle: linkNameInput,
      linkDescription: linkDescriptionInput,
      linkUrl: linkUrlInput,
      circleId: this.props.circleId,
    };
    this.props.saveNewLink(newLink);
    this.close();
  }

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button className='LinkModalButton' onClick={this.show('large')} color='brown'><Icon name='add circle'/>Add Link</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Create New Link</Modal.Header>
          <Modal.Content>
          <Form>
            <Form.Field required>
              <label>Link Name</label>
              <Input placeholder='Include title for link' onChange={this.saveNameInput} />
            </Form.Field>
            <Form.TextArea required label='Link/Site Description' placeholder='Include description for website you are linking...' onChange={this.saveDescriptionInput}>
            </Form.TextArea>
            <Form.Field required>
              <label>Link Url</label>
              <Input placeholder='Include url for link' onChange={this.saveUrlInput} />
            </Form.Field>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>Cancel</Button>
            <Button
              positive
              icon='save'
              labelPosition='right'
              content='Save Link'
              onClick={this.saveNewLinkEvent}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default NewLinkModal;
