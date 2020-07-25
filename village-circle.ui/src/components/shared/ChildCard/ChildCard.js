import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';

import './ChildCard.scss';

class CircleCard extends React.Component {
  static props = {
    child: PropTypes.object,
    authed: PropTypes.Boolean,
  }

  render() {
    const { childUser } = this.props;
    return (
      <Card className="ChildCard">
        <Card.Content header='childname' />
        <Card.Content description='anything here?' />
        <Card.Content extra>
          <Button floated='right' color='orange'>Review Activity/Profile</Button>
        </Card.Content>
      </Card>
    );
  }
}

export default CircleCard;
