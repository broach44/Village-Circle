import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './AnnouncementContainer.scss';
import SingleAnnouncementCard from '../SingleAnnouncementCard/SingleAnnouncementCard';

class AnnouncementContainer extends React.Component {
  static props = {
    announcements: PropTypes.array,
    leaderView: PropTypes.bool,
  }

  renderLeaderView = () => {
    if (this.props.leaderView) return <Button>Add New Announcement</Button>;
    return <></>;
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
