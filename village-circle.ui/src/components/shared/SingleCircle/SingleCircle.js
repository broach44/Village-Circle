import React from 'react';

import circleData from '../../../helpers/circlesData';

import './SingleCircle.scss';

class SingleCircle extends React.Component {
  state = {
    circle: {},
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

  render() {
    const { circle } = this.state;
    return (
      <div className="SingleCircle">
        <h2>Single Circle: {circle.circleName}</h2>
      </div>
    );
  }
}

export default SingleCircle;
