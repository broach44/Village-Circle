import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';
import MemberLine from '../MemberLine/MemberLine';

class MemberListModal extends Component {
  state = {
    open: false,
  }

  static props = {
    members: PropTypes.array,
  }

  show = (size) => () => this.setState({ size, open: true })

  close = () => {
    this.setState({ open: false });
  }

  render() {
    const { open, size } = this.state;
    const { members } = this.props;

    return (
      <div>
        <Button onClick={this.show('small')} color='brown' floated='right' size='mini'>View Members</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Member List</Modal.Header>
          <Modal.Content>
            <p>Click the plus sign next to the student you would like to assign points to.  Once you are done assigning points click "Done"</p>
            { members.map((member) => <MemberLine member={member} />)}
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.close}>Done</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default MemberListModal;
