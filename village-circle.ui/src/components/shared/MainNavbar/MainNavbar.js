import React, { Component } from 'react';
import {
  Menu,
  Image,
  Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginModal from '../LoginModal/LoginModal';

class MainNavbar extends Component {
  state = {
    activeItem: 'home',
  }

  static props = {
    authed: PropTypes.bool,
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logoutEvent = (e) => {
  }

  render() {
    const { activeItem } = this.state;
    const { authed } = this.props;
    return (
      <div>
        <Menu pointing>
        <Image src={'https://www.logolynx.com/images/logolynx/d2/d23c21b326b84a31bbffe0cf84626d69.jpeg'} size='tiny' />
          <Menu.Item as={ Link }
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            to="/"
          />
          <Menu.Item as={ Link }
            name='circles'
            active={activeItem === 'circles'}
            onClick={this.handleItemClick}
            to="/circles"
          />
          <Menu.Item as={ Link }
            name='guilds'
            active={activeItem === 'guilds'}
            onClick={this.handleItemClick}
            to="/guilds"
          />
          <Menu.Item as={ Link }
            name='gathering halls'
            active={activeItem === 'gathering halls'}
            onClick={this.handleItemClick}
            to="/gatheringhalls"
          />
          <Menu.Menu position='right'>
              {
                (authed) ? <><Menu.Item as={ Link }
                name='profile'
                active={activeItem === 'profile'}
                onClick={this.handleItemClick}
                to="/profile"
              /><Menu.Item><Button>Logout</Button>
                </Menu.Item></>
                  : <Menu.Item><LoginModal /></Menu.Item>
              }
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default MainNavbar;
