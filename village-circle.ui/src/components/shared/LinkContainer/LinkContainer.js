import React from 'react';
import PropTypes from 'prop-types';

import { Table, Message, Button } from 'semantic-ui-react';
import LinkTableRow from '../LinkTableRow/LinkTableRow';
import './LinkContainer.scss';

class LinkContainer extends React.Component {
  static props = {
    links: PropTypes.array,
    leaderView: PropTypes.bool,
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
          { links.map((link) => <LinkTableRow link={link} leaderView={leaderView} />)}
        </Table.Body>
      </Table>
    );
  }

  renderLeaderView = () => {
    if (this.props.leaderView) return <Button>Add New Link</Button>;
    return <></>;
  }

  render() {
    return (
      <div className='LinkContainer'>
        <h2>Links:</h2>
        { this.renderLeaderView() }
        { this.renderTableView() }
      </div>
    );
  }
}

export default LinkContainer;
