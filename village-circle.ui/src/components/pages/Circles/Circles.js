import React from 'react';

import { Card } from 'semantic-ui-react';
import CircleCard from '../../shared/CircleCard/CircleCard';

import circlesData from '../../../helpers/circlesData';
import './Circles.scss';

class Circles extends React.Component {
  state = {
    circles: [],
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
          this.state.circles.map((circle) => <CircleCard key={circle.circleId} circle={circle} />)
        }
      </Card.Group>
      </div>
    );
  }
}

export default Circles;
