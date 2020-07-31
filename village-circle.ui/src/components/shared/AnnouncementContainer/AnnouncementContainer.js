import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import SingleAnnouncementCard from '../SingleAnnouncementCard/SingleAnnouncementCard';
import NewAnnouncementModal from '../NewAnnouncementModal/NewAnnouncementModal';
import './AnnouncementContainer.scss';
import announcementsData from '../../../helpers/announcementsData';

class AnnouncementContainer extends React.Component {
  static props = {
    announcements: PropTypes.array,
    leaderView: PropTypes.bool,
    circleId: PropTypes.int,
    getAnnouncementData: PropTypes.func,
  }

  renderLeaderView = () => {
    if (this.props.leaderView) return <NewAnnouncementModal saveNewAnnouncement={this.saveNewAnnouncement} />;
    return <></>;
  }

  saveNewAnnouncement = (announcementTextInput) => {
    const newAnnouncementObject = {
      circleId: this.props.circleId,
      announcementText: announcementTextInput,
    };
    announcementsData.createNewAnnouncement(newAnnouncementObject)
      .then(() => this.props.getAnnouncementData(this.props.circleId))
      .catch((err) => console.error('err from save new announcement', err));
  }

  render() {
    const { announcements, leaderView } = this.props;
    return (
      <div className='AnnouncementContainer'>
        <h2>Announcements:</h2>
          {this.renderLeaderView()}
        <Grid>
          { announcements.map((announcement) => <SingleAnnouncementCard announcement={announcement} leaderView={leaderView} />)}
        </Grid>
      </div>
    );
  }
}

export default AnnouncementContainer;
