import React, { Component } from 'react';
import {
  Menu,
  Image,
  Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoImage from '../../../images/the-village-circle-logo2-transbg.png';
import LoginModal from '../LoginModal/LoginModal';



import './MainNavbar.scss';

class MainNavbar extends Component {
  state = {
    activeItem: 'home',
  }

  static props = {
    authed: PropTypes.bool,
    logoutUser: PropTypes.func,
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    const { authed } = this.props;
    return (
      <div>
        <Menu pointing className='MainNavbar'>
        <Image src={logoImage} size='tiny' />
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
              /><Menu.Item><Button onClick={this.props.logoutUser}>Logout</Button>
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
