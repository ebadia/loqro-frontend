import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { Icon, Segment, Table, Button } from 'semantic-ui-react';

export default class TableComponent extends Component {
  static propTypes = {
    datos: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  };

  render() {
    const { datos, onEdit, onAdd, onDelete } = this.props;
    return (
      <div className="pedidos-table-component" data-test="pedidos-table">
        {/* <Segment> */}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>
                <Button
                  onClick={() => onAdd()}
                  className="add-pedido-button"
                  data-test="add-pedido-button"
                >
                  <Icon name="add" />
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {datos &&
              datos.map(row => {
                return (
                  <Table.Row key={row.id} data-test="table-row">
                    <Table.Cell component="th" scope="row">
                      {row.id}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        aria-label="Edit"
                        onClick={() => onEdit(row.id)}
                        data-test="edit-pedido-button"
                      >
                        <Icon name="pencil" />
                      </Button>
                      <Button
                        aria-label="Delete"
                        onClick={() => onDelete(row.id)}
                        data-test="delete-pedido-button"
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
        {/* </Segment> */}
      </div>
    );
  }
}
