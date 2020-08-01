import React from 'react';
import { Grid, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import SingleAnnouncementCard from '../SingleAnnouncementCard/SingleAnnouncementCard';
import NewAnnouncementModal from '../NewAnnouncementModal/NewAnnouncementModal';
import announcementsData from '../../../helpers/guildAnnouncementsData';
import './GuildAnnouncementContainer.scss';

class GuildAnnouncementContainer extends React.Component {
  static props = {
    announcements: PropTypes.array,
    leaderView: PropTypes.bool,
    guildId: PropTypes.int,
    getAnnouncementData: PropTypes.func,
  }

  renderLeaderView = () => {
    if (this.props.leaderView) return <NewAnnouncementModal saveNewAnnouncement={this.saveNewAnnouncement} />;
    return <></>;
  }

  saveNewAnnouncement = (announcementTextInput) => {
    const newAnnouncementObject = {
      guildId: this.props.guildId,
      announcementText: announcementTextInput,
    };
    announcementsData.createNewAnnouncement(newAnnouncementObject)
      .then(() => this.props.getAnnouncementData(this.props.guildId))
      .catch((err) => console.error('err from save new announcement', err));
  }

  deleteAnnouncement = (announcementId) => {
    announcementsData.deleteAnnouncement(announcementId)
      .then(() => this.props.getAnnouncementData(this.props.guildId))
      .catch((err) => console.error('err from delete announcement', err));
  }

  renderAnnouncementsView = () => {
    const { announcements, leaderView } = this.props;
    if (announcements.length > 0) {
      return announcements.map((announcement) => <SingleAnnouncementCard
        key={announcement.announcementId}
        announcement={announcement}
        deleteAnnouncement={this.deleteAnnouncement}
        leaderView={leaderView} />);
    } return <Grid.Row><Message>Your leader hasn't posted any messages yet...they will.</Message></Grid.Row>;
  }

  render() {
    return (
      <div className='GuildAnnouncementContainer'>
        <h2>Announcements:</h2>
          {this.renderLeaderView()}
        <Grid>
          {this.renderAnnouncementsView() }
        </Grid>
      </div>
    );
  }
}

export default GuildAnnouncementContainer;
