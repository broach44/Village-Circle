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
    const { child } = this.props;
    return (
      <Card className="ChildCard">
        <Card.Content header={`${child.firstName} ${child.lastName}`}/>
        <Card.Content>
          <Card.Description>
            <p>Age: {child.age}</p>
            <p>Email: {child.email}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button floated='right' color='orange'>Review Activity/Profile</Button>
        </Card.Content>
      </Card>
    );
  }
}

export default CircleCard;
