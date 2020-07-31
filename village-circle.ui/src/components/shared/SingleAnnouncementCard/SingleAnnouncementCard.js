import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './SingleAnnouncementCard.scss';

class SingleAnnouncementCard extends React.Component {
  static props = {
    announcement: PropTypes.object,
  }

  render() {
    const { announcement } = this.props;
    return (
      <Grid.Row>
        <Grid.Column width={3}>
          <p>{moment(`${announcement.announcementDateTime}`).format('LL')}</p>
        </Grid.Column>
        <Grid.Column textAlign='left' width={12}>
          <p>{announcement.announcementText}</p>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default SingleAnnouncementCard;
