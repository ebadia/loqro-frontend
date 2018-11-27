import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Table, Button } from 'semantic-ui-react';

const UsersTable = ({ isAdmin, users, onEdit, onAdd, onDelete, onEditarCuenta }) => {
  return (
    <div className="clientes-clientes-table" data-test="users-table">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Cliente</Table.HeaderCell>
            {isAdmin && <Table.HeaderCell>Email</Table.HeaderCell>}
            <Table.HeaderCell>
              {isAdmin && <Button icon="add" onClick={() => onAdd()} />}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(row => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell component="th" scope="row">
                  {row.id}
                </Table.Cell>
                <Table.Cell>{row.firstName}</Table.Cell>
                <Table.Cell>{row.lastName}</Table.Cell>
                <Table.Cell>{row.role}</Table.Cell>
                <Table.Cell>{row.cliente ? row.cliente.nombre : '--'}</Table.Cell>
                {isAdmin && (
                  <Table.Cell>
                    {row.account ? (
                      <Button fluid compact onClick={() => onEditarCuenta(row)}>
                        {row.account.email}
                      </Button>
                    ) : (
                      <Button fluid compact onClick={() => onEditarCuenta(row)}>
                        Crear cuenta
                      </Button>
                    )}
                  </Table.Cell>
                )}
                <Table.Cell>
                  <Button icon="pencil" onClick={() => onEdit(row.id)} />
                  <Button icon="trash" onClick={() => onDelete(row.id)} />
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
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UsersTable;
