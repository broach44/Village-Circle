import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';
import GatheringHallCard from '../../shared/GatheringHallCard/GatheringHallCard';

import gatheringHallsData from '../../../helpers/gatheringHallsData';
import './GatheringHalls.scss';

class GatheringHalls extends React.Component {
  state = {
    gatheringHalls: [],
  }

  static props = {
    authed: PropTypes.bool,
  }

  getGatheringHallsData = () => {
    gatheringHallsData.getAllGatheringHalls()
      .then((result) => this.setState({ gatheringHalls: result }))
      .catch((err) => console.error('err from getting all gatheringHalls', err));
  }

  componentDidMount() {
    this.getGatheringHallsData();
  }

  render() {
    return (
      <div className="GatheringHalls">
      <Card.Group itemsPerRow={4} centered stackable>
        {
          this.state.gatheringHalls.map((gatheringHall) => <GatheringHallCard key={gatheringHall.gatheringHallId} gatheringHall={gatheringHall} authed={this.props.authed} />)
        }
      </Card.Group>
      </div>
    );
  }
}

export default GatheringHalls;
