import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';
import CircleCard from '../../shared/CircleCard/CircleCard';

import circlesData from '../../../helpers/circlesData';
import './Circles.scss';

class Circles extends React.Component {
  state = {
    circles: [],
    currentUserId: 1,
  }

  static props = {
    authed: PropTypes.bool,
  }

  getCirclesData = () => {
    circlesData.getAllCircles()
      .then((result) => this.setState({ circles: result }))
      .catch((err) => console.error('err from getting all circles', err));
  }

  componentDidMount() {
    this.getCirclesData();
  }

  render() {
    return (
      <div className="Circles">
      <Card.Group itemsPerRow={4} centered stackable>
        {
          this.state.circles.map((circle) => <CircleCard key={circle.circleId} circle={circle} authed={this.props.authed} />)
        }
      </Card.Group>
      </div>
    );
  }
}

export default Circles;
