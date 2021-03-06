import React from 'react';
import PropTypes from 'prop-types';

import { Table, Message, Grid } from 'semantic-ui-react';
import LinkTableRow from '../LinkTableRow/LinkTableRow';
import NewGuildLinkModal from '../NewGuildLinkModal/NewGuildLinkModal';

import linksData from '../../../helpers/guildLinksData';

import './GuildLinkContainer.scss';

class GuildLinkContainer extends React.Component {
  static props = {
    links: PropTypes.array,
    leaderView: PropTypes.bool,
    guildId: PropTypes.int,
    getLinkData: PropTypes.func,
  }

  saveNewLink = (newLinkObject) => {
    linksData.createNewLink(newLinkObject)
      .then(() => this.props.getLinkData(this.props.guildId))
      .catch((err) => console.error('err from save new link', err));
  }

  deleteLink = (linkId) => {
    linksData.deleteLink(linkId)
      .then(() => this.props.getLinkData(this.props.guildId))
      .catch((err) => console.error('err from delete link', err));
  }

  renderTableView = () => {
    const { links, leaderView } = this.props;
    if (links.length === 0) {
      return (<Message>
      Looks like there aren't any links yet. Don't worry, I'm sure your leader will add some soon.
    </Message>);
    } return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Link</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { links.map((link) => <LinkTableRow key={link.linkId} deleteLink={this.deleteLink} link={link} leaderView={leaderView} />)}
        </Table.Body>
      </Table>
    );
  }

  renderLeaderView = () => {
    if (this.props.leaderView) return <Grid.Row><NewGuildLinkModal saveNewLink={this.saveNewLink} guildId={this.props.guildId} /></Grid.Row>;
    return <></>;
  }

  render() {
    return (
      <div className='GuildLinkContainer'>
        <h2>Links:</h2>
        { this.renderLeaderView() }
        <Grid className='LinkGrid'>
          <Grid.Row>
            { this.renderTableView() }
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default GuildLinkContainer;
