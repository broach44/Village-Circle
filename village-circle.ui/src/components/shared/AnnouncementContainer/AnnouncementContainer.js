import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './AnnouncementContainer.scss';
import SingleAnnouncementCard from '../SingleAnnouncementCard/SingleAnnouncementCard';
import announcementsData from '../../../helpers/announcementsData';

class AnnouncementContainer extends React.Component {
  static props = {
    announcements: PropTypes.array,
  }

  render() {
    const { announcements } = this.props;
    return (
      <div className='AnnouncementContainer'>
        <h2>Announcements:</h2>
        <Grid>
          { announcements.map((announcement) => <SingleAnnouncementCard announcement={announcement} />)}
        </Grid>
      </div>
    );
  }
}

export default AnnouncementContainer;
