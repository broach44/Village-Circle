import React, { Component } from 'react';
import {
  Menu,
  Button,
  Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainNavbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

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
            <Menu.Item>
              <Button>Login</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default MainNavbar;
