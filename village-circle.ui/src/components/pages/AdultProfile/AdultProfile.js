import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Header,
  Button,
  Icon,
} from 'semantic-ui-react';

import ChildCard from '../../shared/ChildCard/ChildCard';
import CircleCard from '../../shared/CircleCard/CircleCard';
import CircleFormModal from '../../shared/CircleFormModal/CircleFormModal';
import GuildCard from '../../shared/GuildCard/GuildCard';
import GuildFormModal from '../../shared/GuildFormModal/GuildFormModal';

import './AdultProfile.scss';
import GatheringHallFormModal from '../../shared/GatheringHallFormModal/GatheringHallFormModal';
import GatheringHallCard from '../../shared/GatheringHallCard/GatheringHallCard';

class AdultProfile extends React.Component {
  static props = {
    user: PropTypes.object,
    uid: PropTypes.string,
    isParent: PropTypes.bool,
    children: PropTypes.array,
    circles: PropTypes.arrayOf,
    saveNewCircle: PropTypes.func,
    guilds: PropTypes.arrayOf,
    saveNewGuild: PropTypes.func,
    gatheringHalls: PropTypes.arrayOf,
    saveNewGatheringHall: PropTypes.func,
  }

  renderSimpleAdultProfile = () => {
    return (
      <>
      <Header as='h2' textAlign='left'>My Boards</Header>
      <Grid centered columns='equal'>
        <Grid.Column textAlign='center'>
          <CircleFormModal saveNewCircle={this.props.saveNewCircle} userId={this.props.user.userId} />
          <Grid columns={2}>
          {
            this.props.circles.map((circle) => <Grid.Column><CircleCard circle={circle} /></Grid.Column>)
          }
          </Grid>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <GuildFormModal saveNewGuild={this.props.saveNewGuild} userId={this.props.user.userId} />
          <Grid columns={2}>
          {
            this.props.guilds.map((guild) => <Grid.Column><GuildCard guild={guild} /></Grid.Column>)
          }
          </Grid>

        </Grid.Column>
        <Grid.Column textAlign='center'>
        <GatheringHallFormModal saveNewGatheringHall={this.props.saveNewGatheringHall} userId={this.props.user.userId} />
          <Grid columns={2}>
          {
            this.props.gatheringHalls.map((gatheringHall) => <Grid.Column><GatheringHallCard gatheringHall={gatheringHall} /></Grid.Column>)
          }
          </Grid>
        </Grid.Column>
      </Grid>
      </>
    );
  }

  // TODO: IF isParent is true, render child cards
  // 1) request to pull back children for parent
  // 2) generate set of cards based on children
  // 3) buttons for each child will navigate to their profile to see activity

  renderParentProfile = () => {
    const { children } = this.props;
    return (
      <>
        <Header as='h2' textAlign='left'>My Children</Header>
        <Grid columns='4'>
          {children.map((child) => <Grid.Column><ChildCard child={child}/></Grid.Column>)}
        </Grid>
      { this.renderSimpleAdultProfile() }
      </>
    );
  }

  // if isParent and isChild are both false, render Adult Profile without child cards
  render() {
    const { isParent } = this.props;
    return (
      <Container className='AdultProfile' fluid textAlign='left'>
      {
        (isParent === true) ? this.renderParentProfile() : this.renderSimpleAdultProfile()
      }
      </Container>
    );
  }
}

export default AdultProfile;
