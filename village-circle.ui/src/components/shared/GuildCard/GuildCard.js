import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';

import './GuildCard.scss';

class GuildCard extends React.Component {
  static props = {
    guild: PropTypes.object,
    authed: PropTypes.Boolean,
  }

  render() {
    const { guild } = this.props;
    return (
      <Card className="GuildCard">
        <Card.Content header={guild.guildName} />
        <Card.Content description={guild.guildDescription} />
        <Card.Content extra>
          <Button as={ Link } to={`/guild/${guild.guildId}`} floated='right' color='orange'>Check It Out --&gt;</Button>
        </Card.Content>
      </Card>
    );
  }
}

export default GuildCard;
