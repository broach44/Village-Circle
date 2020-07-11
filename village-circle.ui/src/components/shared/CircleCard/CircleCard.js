import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';

import './CircleCard.scss';

class CircleCard extends React.Component {
  static props = {
    circle: PropTypes.object,
  }

  render() {
    const { circle } = this.props;
    return (
      <Card className="CircleCard">
        <Card.Content header={circle.circleName} />
        <Card.Content description={circle.circleDescription} />
        <Card.Content extra>
          <Button as={ Link } to={`/circle/${circle.circleId}`} floated='right' color='orange'>Check It Out --&gt;</Button>
        </Card.Content>
      </Card>
    );
  }
}

export default CircleCard;
