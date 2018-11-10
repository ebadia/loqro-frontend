import React from 'react';
import { shallow } from 'enzyme';
import { ClientesTable } from '../../../src/features/clientes';

// UsersTable.propTypes = {
//   clientes: PropTypes.array.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onAdd: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

const props = {
  clientes: [{ id: 1 }],
  onAdd: () => {},
  onEdit: () => {},
  onDelete: () => {},
};

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ClientesTable {...props} />);

  expect(renderedComponent.find('.clientes-clientes-table').length).toBe(1);
  expect(renderedComponent.find('.clientes-clientes-table-onadd').length).toBe(1);
  expect(renderedComponent.find('.clientes-clientes-table-onedit').length).toBe(1);
  expect(renderedComponent.find('.clientes-clientes-table-ondelete').length).toBe(1);
});
