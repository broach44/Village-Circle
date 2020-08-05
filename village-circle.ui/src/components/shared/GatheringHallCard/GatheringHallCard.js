import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';

import './GatheringHallCard.scss';

class GatheringHallCard extends React.Component {
  static props = {
    gatheringHall: PropTypes.object,
    authed: PropTypes.Boolean,
  }

  render() {
    const { gatheringHall } = this.props;
    return (
      <Card className="GatheringHallCard">
        <Card.Content header={gatheringHall.gatheringHallName} />
        <Card.Content description={gatheringHall.gatheringHallDescription} />
        <Card.Content extra>
          <Button as={ Link } to={`/gatheringHall/${gatheringHall.gatheringHallId}`} floated='right' compact color='orange'>Check It Out <Icon name='arrow alternate circle right' /></Button>
        </Card.Content>
      </Card>
    );
  }
}

export default GatheringHallCard;
