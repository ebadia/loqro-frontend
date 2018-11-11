import React from 'react';
import { shallow, mount } from 'enzyme';
import { TableComponent } from '../../../src/features/pedidos';

const testProps = () => ({
  datos: [],
  onAdd: () => {},
  onEdit: () => {},
  onDelete: () => {},
});

describe('rendering pedidos table', () => {
  let wrapper;
  beforeEach(() => {
    const props = testProps();
    wrapper = mount(<TableComponent {...props} />);
  });
  it('renders <ClienteForm />', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders pedidos table node with correct class name', () => {
    expect(wrapper.find('[data-test="pedidos-table"]').length).toBe(1);
  });
  it('should display a table', () => {
    expect(wrapper.find('table').length).toBe(1);
  });
  it('should display an add button in header', () => {
    expect(wrapper.find('button[class="add-pedido-button"]').length).toBe(1);
  });
  it('');
});
