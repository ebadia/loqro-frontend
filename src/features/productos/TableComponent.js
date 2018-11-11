import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { Icon, Table, Button } from 'semantic-ui-react';

const TableComponent = ({ productos, onEdit, onAdd, onDelete }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Oferta</Table.HeaderCell>
          <Table.HeaderCell>Desde</Table.HeaderCell>
          <Table.HeaderCell>Hasta</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell>
            <Button onClick={() => onAdd()}>
              <Icon name="add" />
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {productos &&
          productos.map(row => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell component="th" scope="row">
                  {row.id}
                </Table.Cell>
                <Table.Cell>{row.nombre}</Table.Cell>
                <Table.Cell textAlign="right">{row.precio}</Table.Cell>
                <Table.Cell textAlign="right">{row.oferta}</Table.Cell>
                <Table.Cell>{row.desde ? moment(row.desde).format('DD MMMM') : '--'}</Table.Cell>
                <Table.Cell>{row.hasta ? moment(row.hasta).format('DD MMMM') : '--'}</Table.Cell>
                <Table.Cell>
                  {row.activo ? <Icon name="check" /> : <Icon name="times" />}
                </Table.Cell>
                <Table.Cell>
                  <Button aria-label="Edit" onClick={() => onEdit(row.id)}>
                    <Icon name="pencil" />
                  </Button>
                  <Button aria-label="Delete" onClick={() => onDelete(row.id)}>
                    <Icon name="trash" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

TableComponent.propTypes = {
  productos: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TableComponent;
