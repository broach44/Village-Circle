import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class GoalTableRow extends React.Component {
  static props = {
    goal: PropTypes.object,
  }

  render() {
    const { goal } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{goal.pointTarget}</Table.Cell>
          {
            (goal.isComplete) ? <Table.Cell positive><Icon name='checkmark' />Completed</Table.Cell>
              : <Table.Cell>In Progress</Table.Cell>
          }
      </Table.Row>
    );
  }
}

export default GoalTableRow;
