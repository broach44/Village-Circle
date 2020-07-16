import React, { Component } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import authData from '../../../helpers/authData';

class LoginModal extends Component {
  state = {
    open: false,
    email: '',
    password: '',
  }

  static props = {
    toggleAuthState: PropTypes.func,
  }

  show = (size) => () => this.setState({ size, open: true })

  close = () => this.setState({ open: false })

  emailChangeEvent = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  passwordChangeEvent = (e) => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  loginEvent = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    const user = {
      email,
      password,
    };
    authData.loginUser(user);
    this.close();
    this.props.toggleAuthState();
  }

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button onClick={this.show('small')}>Login</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Login</Modal.Header>
          <Modal.Content>
          <Form>
            <Form.Field>
              <label>Email</label>
              <Input placeholder='Email' fluid onChange={this.emailChangeEvent} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input type='password' placeholder='Password' fluid onChange={this.passwordChangeEvent} />
            </Form.Field>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='brown' onClick={this.close} >Cancel</Button>
            <Button color='brown' onClick={this.loginEvent}>Login</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
