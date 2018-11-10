import React from 'react';
import { shallow } from 'enzyme';
import { ClientesListPage } from '../../../src/features/clientes/ClientesListPage';

describe('clientes/ClientesListPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientes: { clientesList: [{ id: 1 }] },
      actions: {},
    };
    const wrapper = shallow(<ClientesListPage {...props} />);

    expect(wrapper.find('.clientes-clientes-list-page').length).toBe(1);
    expect(wrapper.find('.clientes-clientes-list-page-header').length).toBe(1);
    expect(wrapper.find('.clientes-clientes-list-page-table').length).toBe(1);
  });

  it('handles new client when button clicked', () => {
    // const props = {}
    // const wrapper = shallow(<ClientesListPage {...props} />);
    // const newClientButton = wrapper.find()
  });
});
