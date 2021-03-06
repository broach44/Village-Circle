import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  Popup,
  Icon,
  Button,
} from 'semantic-ui-react';

import './LinkTableRow.scss';

class LinkTableRow extends React.Component {
  static props = {
    link: PropTypes.object,
    leaderView: PropTypes.bool,
    deleteLink: PropTypes.func,
  }

  renderLeaderView = () => {
    if (this.props.leaderView === true) return (<Popup trigger={<Icon name='delete' onClick={this.deleteLinkEvent} />} position='top right' content='Delete Link' size='small'/>);
    return <></>;
  }

  deleteLinkEvent = (e) => {
    e.preventDefault();
    this.props.deleteLink(this.props.link.linkId);
  }

  render() {
    const { link } = this.props;
    return (
      <Table.Row>
      <Table.Cell>{this.renderLeaderView()}{link.linkTitle}</Table.Cell>
      <Table.Cell><a href={link.linkUrl}>{link.linkUrl}</a></Table.Cell>
      <Table.Cell>
        <Popup trigger={<Icon name='info circle' />} basic wide='very'>
          {link.linkDescription}
        </Popup>
      </Table.Cell>
    </Table.Row>
    );
  }
}

export default LinkTableRow;
