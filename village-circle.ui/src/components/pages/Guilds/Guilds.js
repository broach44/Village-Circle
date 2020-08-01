import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';
import GuildCard from '../../shared/GuildCard/GuildCard';

import guildsData from '../../../helpers/guildsData';

import './Guilds.scss';

class Guilds extends React.Component {
  state = {
    guilds: [],
  }

  static props = {
    authed: PropTypes.bool,
  }

  getGuildsData = () => {
    guildsData.getAllGuilds()
      .then((result) => this.setState({ guilds: result }))
      .catch((err) => console.error('err from getting all guilds', err));
  }

  componentDidMount() {
    this.getGuildsData();
  }

  render() {
    return (
      <div className="Guilds">
        <Card.Group itemsPerRow={4} centered stackable>
          {
            this.state.guilds.map((guild) => <GuildCard key={guild.guidId} guild={guild} authed={this.props.authed} />)
          }
        </Card.Group>
      </div>
    );
  }
}

export default Guilds;
