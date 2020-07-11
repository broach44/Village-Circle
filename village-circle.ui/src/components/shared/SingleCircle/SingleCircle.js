import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import circleData from '../../../helpers/circlesData';


import './SingleCircle.scss';

class SingleCircle extends React.Component {
  state = {
    circle: {},
    circleMember: false,
  }

  static props = {
    authed: PropTypes.bool,
  }

  componentDidMount() {
    this.getCircleData();
  }

  getCircleData = () => {
    const { circleId } = this.props.match.params;
    circleData.getCircleById(circleId)
      .then((result) => this.setState({ circle: result }))
      .catch((err) => console.error('err from get single circle', err));
  }

  joinCircle = (e) => {
    e.preventDefault();
    this.setState({ circleMember: true });
    // TODO: Data call to create new member of the circle
  }

  render() {
    const { circle, circleMember } = this.state;
    return (
      <div className="SingleCircle">
        <h2>Circle: {circle.circleName}</h2>
        <p className="CircleDescription">{circle.circleDescription}</p>
        {
          (circleMember) ? <div>Message Container</div> : <Button color='brown' onClick={this.joinCircle}>Click to Join Circle</Button>
        }
      </div>
    );
  }
}

export default SingleCircle;
