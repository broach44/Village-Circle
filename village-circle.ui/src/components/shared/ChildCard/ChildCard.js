import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';

import './CircleCard.scss';

class CircleCard extends React.Component {
  static props = {
    child: PropTypes.object,
    authed: PropTypes.Boolean,
  }

  render() {
    const { child } = this.props;
    return (
      <Card className="ChildCard">
        <Card.Content header='Name of child' />
        <Card.Content description='anything here?' />
        <Card.Content extra>
          <Button as={ Link } to={`/circle/${circle.circleId}`} floated='right' color='orange'>Review Activity/Profile</Button>
        </Card.Content>
      </Card>
    );
  }
}

export default CircleCard;
