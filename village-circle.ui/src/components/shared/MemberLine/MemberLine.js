import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './MemberLine.scss';
import pointsData from '../../../helpers/pointsData';

class MemberLine extends React.Component {
  state = {
    editMode: false,
    activityOptions: [],
    selectedActivity: 0,
  }

  static props = {
    member: PropTypes.object,
  }

  componentDidMount() {
    this.setActivityOptions();
  }

  setToEdit = (e) => {
    this.setState({ editMode: true });
  }

  // save function to create new point log for selected member
  savePoints = (e) => {
    e.preventDefault();
    const newPointLog = {
      userId: this.props.member.userId,
      activityPointId: this.state.selectedActivity,
    };
    pointsData.addPoints(newPointLog)
      .then(() => {
        this.setState({ editMode: false });
        this.setState({ selectedActivity: 0 });
      })
      .catch((err) => console.error('err from save Points', err));
  }

  saveActivityEntry = (e) => {
    e.preventDefault();
    this.setState({ selectedActivity: parseInt(e.target.value, 10) });
  }

  setActivityOptions = () => {
    pointsData.getActivityOptions()
      .then((data) => this.setState({ activityOptions: data }))
      .catch((err) => console.error('err from set activity options', err));
  }

  closeDropDown = (e) => {
    e.preventDefault();
    this.setState({ editMode: false });
  }

  renderDropDown = () => {
    const { selectedActivity, activityOptions } = this.state;
    if (this.state.editMode === true) {
      return (
        <>
          <select className="form-control" value={selectedActivity} onChange={this.saveActivityEntry}>
            <option defaultValue>Choose one...</option>
      { activityOptions.map((activity) => <option key={activity.activityPointId} value={activity.activityPointId}>{activity.activityName} {activity.numberOfPoints} Points</option>)}
          </select>
          <Icon name='save' disabled={this.state.selectedActivity <= 1} onClick={this.savePoints} />
          <Icon name='close' onClick={this.closeDropDown}/>
        </>
      );
    } return <></>;
  }

  render() {
    const { member } = this.props;
    return (
      <p>{member.firstName} {member.lastName}  <Icon name='add circle' onClick={this.setToEdit}/>
        {this.renderDropDown()}
      </p>
    );
  }
}

export default MemberLine;
