import React from 'react';
import PropTypes from 'prop-types';

import { Table, Popup, Icon } from 'semantic-ui-react';

import './LinkTableRow.scss';

class LinkTableRow extends React.Component {
  static props = {
    link: PropTypes.object,
  }

  render() {
    const { link } = this.props;
    return (
      <Table.Row>
      <Table.Cell>{link.linkTitle}</Table.Cell>
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
