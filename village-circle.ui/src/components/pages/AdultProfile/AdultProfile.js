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

import './AdultProfile.scss';

class AdultProfile extends React.Component {
  static props = {
    user: PropTypes.object,
    uid: PropTypes.string,
    isParent: PropTypes.bool,
  }

  // TODO: IF isParent is true, render child cards
  // 1) request to pull back children for parent
  // 2) generate set of cards based on children
  // 3) buttons for each child will navigate to their profile to see activity

  renderChildCards = () => {
    return (
      <>

        <ChildCard />
      </>
    );
  }

  renderSimpleAdultProfile = () => {
    return (
      <>
      <Header as='h2' textAlign='left'>My Boards</Header>
      <Grid centered columns='equal'>
        <Grid.Column textAlign='center'>
          <Button color='brown' disabled><Icon name='add circle'/>Create New Circle</Button>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Button color='brown' diabled><Icon name='add circle'/>Create New Guild</Button>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Button color='brown' diasabled><Icon name='add circle'/>Create New Gathering Hall</Button>
        </Grid.Column>
      </Grid>
      </>
    );
  }

  renderParentProfile = () => {
    return (
      <>
        <Header as='h2' textAlign='left'>My Children</Header>
        <Grid centered columns='4'>
          <Grid.Column><ChildCard /></Grid.Column>
          <Grid.Column><ChildCard /></Grid.Column>
          <Grid.Column><ChildCard /></Grid.Column>
          <Grid.Column><ChildCard /></Grid.Column>
          <Grid.Column><ChildCard /></Grid.Column>
          <Grid.Column><ChildCard /></Grid.Column>
          <Grid.Column><ChildCard /></Grid.Column>
          <Grid.Column><ChildCard /></Grid.Column>
        </Grid>
      { this.renderSimpleAdultProfile() }
      </>
    )
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
