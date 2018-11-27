import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Segment, Table, Button } from 'semantic-ui-react';

const UsersTable = ({ clientes, onEdit, onAdd, onDelete }) => {
  return (
    <div className="clientes-clientes-table" data-test="clientes-table">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>
              <Button className="clientes-clientes-table-onadd" onClick={() => onAdd()}>
                <Icon name="add" />
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clientes.map(row => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell component="th" scope="row">
                  {row.id}
                </Table.Cell>
                <Table.Cell>{row.nombre}</Table.Cell>
                <Table.Cell>
                  <Button
                    className="clientes-clientes-table-onedit"
                    icon="pencil"
                    aria-label="Create"
                    onClick={() => onEdit(row.id)}
                  />
                  <Button
                    className="clientes-clientes-table-ondelete"
                    icon="trash"
                    aria-label="Create"
                    onClick={() => onDelete(row.id)}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

UsersTable.propTypes = {
  clientes: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UsersTable;
